-- Vesto Database Schema
-- 11 tables for full-stack financial literacy platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE (extends Supabase Auth)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- 2. COMPANIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  industry TEXT,
  sector TEXT,
  market_cap NUMERIC,
  shares_outstanding NUMERIC,
  exchange TEXT,
  country TEXT,
  currency TEXT,
  ipo DATE,
  website TEXT,
  logo TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_companies_symbol ON companies(symbol);

-- Public read access
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Companies are viewable by everyone" ON companies
  FOR SELECT USING (true);

-- ============================================================================
-- 3. COMPANY_FUNDAMENTALS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS company_fundamentals (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  
  -- Valuation metrics
  pe_ratio NUMERIC,
  pb_ratio NUMERIC,
  ps_ratio NUMERIC,
  peg_ratio NUMERIC,
  forward_pe NUMERIC,
  
  -- Profitability metrics
  roe NUMERIC,
  roa NUMERIC,
  gross_margin NUMERIC,
  operating_margin NUMERIC,
  net_profit_margin NUMERIC,
  ebitda NUMERIC,
  
  -- Leverage metrics
  debt_to_equity NUMERIC,
  current_ratio NUMERIC,
  quick_ratio NUMERIC,
  long_term_debt_to_equity NUMERIC,
  
  -- Growth metrics
  eps_growth_yoy NUMERIC,
  revenue_growth_yoy NUMERIC,
  eps_growth_5y NUMERIC,
  revenue_growth_5y NUMERIC,
  
  -- Market data
  beta NUMERIC,
  market_cap NUMERIC,
  week_52_high NUMERIC,
  week_52_low NUMERIC,
  
  extracted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fundamentals_symbol ON company_fundamentals(symbol);
CREATE INDEX idx_fundamentals_company_id ON company_fundamentals(company_id);

ALTER TABLE company_fundamentals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Fundamentals are viewable by everyone" ON company_fundamentals
  FOR SELECT USING (true);

-- ============================================================================
-- 4. COMPANY_QUOTES TABLE (cached stock prices)
-- ============================================================================
CREATE TABLE IF NOT EXISTS company_quotes (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  current_price NUMERIC NOT NULL,
  change NUMERIC,
  percent_change NUMERIC,
  high NUMERIC,
  low NUMERIC,
  open NUMERIC,
  previous_close NUMERIC,
  market_timestamp BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quotes_symbol ON company_quotes(symbol);
CREATE INDEX idx_quotes_created_at ON company_quotes(created_at DESC);

ALTER TABLE company_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quotes are viewable by everyone" ON company_quotes
  FOR SELECT USING (true);

-- ============================================================================
-- 5. COMPANY_FINANCIALS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS company_financials (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  year INTEGER,
  quarter INTEGER,
  form TEXT, -- '10-K' or '10-Q'
  filed_date DATE,
  start_date DATE,
  end_date DATE,
  access_number TEXT,
  
  -- Balance Sheet data (stored as JSONB for flexibility)
  balance_sheet JSONB DEFAULT '{}'::jsonb,
  
  -- Income Statement data
  income_statement JSONB DEFAULT '{}'::jsonb,
  
  -- Cash Flow data
  cash_flow JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_financials_symbol ON company_financials(symbol);
CREATE INDEX idx_financials_year ON company_financials(year DESC);

ALTER TABLE company_financials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Financials are viewable by everyone" ON company_financials
  FOR SELECT USING (true);

-- ============================================================================
-- 6. MOCK_10K_DATA TABLE (fake 10-K text for MVP modules 2-5)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mock_10k_data (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  
  -- Mock 10-K sections (2-3 paragraphs each)
  business_description TEXT NOT NULL,
  risk_factors TEXT NOT NULL,
  financial_discussion TEXT NOT NULL,
  
  -- Additional metadata
  fiscal_year INTEGER DEFAULT 2024,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mock_10k_symbol ON mock_10k_data(symbol);

ALTER TABLE mock_10k_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Mock 10K data is viewable by everyone" ON mock_10k_data
  FOR SELECT USING (true);

-- ============================================================================
-- 7. AI_GENERATED_QUESTIONS TABLE (cached questions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS ai_generated_questions (
  id SERIAL PRIMARY KEY,
  module_id TEXT NOT NULL, -- 'module-1', 'module-2', etc.
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  
  -- Question content
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'written')),
  question_text TEXT NOT NULL,
  question_context TEXT, -- Additional context/data for the question
  
  -- For MCQ questions
  options JSONB, -- Array of options: [{label: 'A', text: '...'}, ...]
  correct_answer TEXT, -- For MCQ: the correct option label
  
  -- For written questions
  grading_rubric JSONB, -- Rubric criteria for AI grading
  sample_answer TEXT, -- Example of a good answer
  
  -- Metadata
  difficulty TEXT CHECK (difficulty IN ('easy', 'intermediate', 'advanced', 'expert')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_module_symbol ON ai_generated_questions(module_id, symbol);
CREATE INDEX idx_questions_type ON ai_generated_questions(question_type);

ALTER TABLE ai_generated_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone" ON ai_generated_questions
  FOR SELECT USING (true);

-- ============================================================================
-- 8. USER_PROGRESS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL, -- 'module-1', 'module-2', etc.
  
  -- Progress tracking
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  
  -- Performance metrics
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  average_score NUMERIC DEFAULT 0, -- Average score on written questions (0-100)
  
  -- Timestamps
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_progress_user_module ON user_progress(user_id, module_id);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- 9. USER_ANSWERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_answers (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES ai_generated_questions(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  symbol TEXT NOT NULL,
  
  -- Answer content
  answer_text TEXT NOT NULL,
  
  -- Grading results (for written answers)
  ai_score INTEGER, -- 0-100 score from AI
  ai_feedback JSONB, -- Detailed rubric feedback from AI
  is_correct BOOLEAN, -- For MCQ: true/false
  
  -- Timestamps
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_answers_user_question ON user_answers(user_id, question_id);
CREATE INDEX idx_answers_module ON user_answers(module_id);

ALTER TABLE user_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own answers" ON user_answers
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own answers" ON user_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 10. USER_PORTFOLIOS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_portfolios (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Portfolio holdings
  symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  shares NUMERIC NOT NULL CHECK (shares > 0),
  buy_price NUMERIC NOT NULL CHECK (buy_price > 0),
  buy_date TIMESTAMPTZ DEFAULT NOW(),
  
  -- Calculated fields (can be computed on read)
  current_price NUMERIC,
  current_value NUMERIC,
  gain_loss NUMERIC,
  gain_loss_percent NUMERIC,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, symbol)
);

CREATE INDEX idx_portfolio_user ON user_portfolios(user_id);
CREATE INDEX idx_portfolio_symbol ON user_portfolios(symbol);

ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own portfolio" ON user_portfolios
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert into own portfolio" ON user_portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own portfolio" ON user_portfolios
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own portfolio" ON user_portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 11. PITCH_SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS pitch_submissions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  
  -- Pitch content
  pitch_text TEXT NOT NULL,
  
  -- AI Fund Manager review
  status TEXT NOT NULL CHECK (status IN ('approved', 'rejected', 'pending')),
  ai_feedback TEXT,
  ai_score INTEGER, -- Optional: score out of 100
  
  -- Investment details (if approved and invested)
  invested BOOLEAN DEFAULT FALSE,
  investment_amount NUMERIC,
  shares_purchased NUMERIC,
  purchase_price NUMERIC,
  invested_at TIMESTAMPTZ,
  
  -- Timestamps
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pitches_user ON pitch_submissions(user_id);
CREATE INDEX idx_pitches_symbol ON pitch_submissions(symbol);
CREATE INDEX idx_pitches_status ON pitch_submissions(status);

ALTER TABLE pitch_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own pitches" ON pitch_submissions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own pitches" ON pitch_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pitches" ON pitch_submissions
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_portfolios_updated_at BEFORE UPDATE ON user_portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL DATA / COMMENTS
-- ============================================================================

COMMENT ON TABLE companies IS 'Company profiles from Finnhub API';
COMMENT ON TABLE company_fundamentals IS 'Financial metrics (P/E, ROE, EBITDA, D/E ratios)';
COMMENT ON TABLE company_quotes IS 'Cached real-time stock prices';
COMMENT ON TABLE company_financials IS 'Financial statements from 10-K/10-Q filings';
COMMENT ON TABLE mock_10k_data IS 'Fake 10-K text narratives for MVP modules 2-5';
COMMENT ON TABLE ai_generated_questions IS 'Pre-generated questions cached to reduce AI API calls';
COMMENT ON TABLE user_progress IS 'Module completion tracking with scores';
COMMENT ON TABLE user_answers IS 'Student answer submissions with AI grades';
COMMENT ON TABLE user_portfolios IS 'User stock holdings in paper trading simulator';
COMMENT ON TABLE pitch_submissions IS 'Stock pitches reviewed by AI Fund Manager';

