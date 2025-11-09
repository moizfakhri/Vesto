# Vesto - Financial Literacy Platform MVP

A Next.js 14 application that teaches financial analysis through interactive modules and an AI-powered stock simulator.

## 🎯 What's Been Built

### ✅ Completed Components

1. **Project Setup**
   - Next.js 14 with App Router
   - TypeScript configuration
   - Tailwind CSS + shadcn/ui components
   - Environment variables configured

2. **Data Layer**
   - Finnhub API data extraction (20 companies)
   - Supabase database schema (11 tables)
   - Mock 10-K narratives for all companies
   - TypeScript types for all data models

3. **Backend Services**
   - Supabase client (browser + server)
   - Database query functions
   - Gemini AI integration
   - AI grading system (5 criteria, 100-point scale)
   - AI Fund Manager for pitch reviews

4. **API Routes**
   - `/api/companies` - Get all companies
   - `/api/companies/[symbol]` - Get company details
   - `/api/simulator/pitch` - Submit stock pitch
   - `/api/modules/[moduleId]/grade` - Grade answers
   - `/api/portfolio` - Manage portfolio

5. **UI Components**
   - Company cards with metrics
   - Metrics display grids
   - Navigation layout (desktop + mobile)
   - shadcn/ui components integrated

6. **Main Pages**
   - `/` - Landing page with features
   - `/learn` - Learning modules overview
   - `/simulator` - Stock simulator with AI Fund Manager
   - `/account` - User profile and stats

## 📋 Next Steps to Complete MVP

### 1. Set Up Supabase Database

```bash
# 1. Go to https://supabase.com and create a project (already done)
# 2. Run the schema SQL in Supabase SQL Editor
cd vesto-app
cat supabase/schema.sql
# Copy and run in Supabase Dashboard > SQL Editor
```

### 2. Create Seed Script (High Priority)

Create `scripts/seed-database.ts` to:
- Load Finnhub JSON data into database
- Insert mock 10-K narratives
- Generate sample questions

### 3. Individual Learning Module Pages

Create dynamic route: `app/learn/[moduleId]/page.tsx`
- Display lesson content
- Show questions (MCQ + written)
- Submit answers for AI grading
- Display feedback with rubric breakdown

### 4. Connect Simulator to Real Data

Update `app/simulator/page.tsx`:
- Fetch companies from database
- Integrate with pitch submission API
- Show real portfolio data
- Update prices from database

### 5. Optional: Add Authentication

For MVP, you can:
- **Option A**: Use mock authentication (single demo user)
- **Option B**: Implement NextAuth with email provider

## 🚀 Running the Application

### Install Dependencies

```bash
cd vesto-app
npm install
```

### Set Up Environment Variables

Ensure `.env.local` exists with:

```bash
# Get these from https://supabase.com/dashboard (Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Get from https://makersuite.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Get from https://finnhub.io (optional - data already extracted)
FINNHUB_API_KEY=your_finnhub_api_key

# Generate a random secret (optional - auth not implemented yet)
NEXTAUTH_SECRET=generate_a_random_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
vesto-app/
├── app/
│   ├── api/                    # API routes
│   │   ├── companies/          # Company data endpoints
│   │   ├── modules/            # Module & grading endpoints
│   │   ├── simulator/          # Pitch submission
│   │   └── portfolio/          # Portfolio management
│   ├── learn/                  # Learning modules pages
│   ├── simulator/              # Stock simulator page
│   ├── account/                # User account page
│   ├── layout.tsx              # Root layout with navigation
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── company-card.tsx        # Company display
│   └── metrics-display.tsx     # Financial metrics
├── lib/
│   ├── ai/                     # Gemini AI integration
│   │   ├── gemini-client.ts    # AI client
│   │   ├── grade-answer.ts     # Answer grading
│   │   ├── review-pitch.ts     # Pitch review
│   │   └── prompts/            # AI prompts & rubrics
│   ├── supabase/               # Database layer
│   │   ├── client.ts           # Browser client
│   │   ├── server.ts           # Server client
│   │   └── queries.ts          # Database queries
│   ├── utils/                  # Utility functions
│   │   ├── format.ts           # Number/currency formatting
│   │   └── calculations.ts     # Financial calculations
│   └── mock-data/              # Mock 10-K narratives
├── types/
│   └── index.ts                # TypeScript type definitions
└── supabase/
    └── schema.sql              # Database schema

Parent Directory:
├── vesto_finnhub_extractor.py  # Data extraction script
└── vesto_finnhub_20_companies.json  # Extracted company data
```

## 🔑 Key Features

### Learning Modules

5 progressive modules teaching financial analysis:
1. **Basic Fundamentals** (Easy) - P/E, EBITDA, D/E ratios
2. **Business & Risk Factors** (Intermediate) - 10-K analysis
3. **Financial Statements** (Intermediate) - Balance sheets, income statements
4. **Competitive Analysis** (Advanced) - Moats, market positioning
5. **Comparative Analysis** (Expert) - Company comparisons

### AI Grading System

Strict rubric-based grading (100 points total):
- **Clarity** (20pts) - Writing quality and organization
- **Evidence** (20pts) - Use of specific data and citations
- **Completeness** (20pts) - Addressing all question parts
- **Critical Thinking** (20pts) - Analysis depth and insights
- **Risk Analysis** (20pts) - Risk identification and evaluation

### Stock Simulator

- Browse 20 major companies with real-time data
- Write investment theses
- Get feedback from AI Fund Manager
- Build paper trading portfolio ($10,000)
- Track performance and approval rate

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Data**: Finnhub API (stock data)
- **Auth**: NextAuth (planned)

## 📊 Database Tables

1. `users` - User profiles
2. `companies` - Company information
3. `company_fundamentals` - Financial metrics
4. `company_quotes` - Stock prices
5. `company_financials` - Financial statements
6. `mock_10k_data` - Mock 10-K text narratives
7. `ai_generated_questions` - Cached questions
8. `user_progress` - Module completion tracking
9. `user_answers` - Student submissions with grades
10. `user_portfolios` - Portfolio holdings
11. `pitch_submissions` - Stock pitches & AI reviews

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Navigation sidebar (desktop) / bottom nav (mobile)
- Progress tracking
- Real-time feedback
- Interactive components

## 🧪 Testing the MVP

1. **Home Page**: Navigate to `/` - should see landing page
2. **Learn Section**: Go to `/learn` - should see 5 modules
3. **Simulator**: Go to `/simulator` - should see stock list and pitch interface
4. **Account**: Go to `/account` - should see profile

**Note**: Without database seeding, pages won't show real data yet.

## 📝 Important Notes

- The current MVP uses mock data for demonstration
- Database seeding is required for full functionality
- Authentication is currently mocked (demo user)
- Some learning module pages need completion
- API routes are ready but need database data

## 🚧 Known Limitations

- No real authentication yet (use mock user ID)
- Learning module detail pages not implemented
- Seed script needs to be created
- No real-time price updates
- Limited error handling

## 🔐 Security Considerations

For production:
- Implement proper authentication
- Add Row Level Security (RLS) policies in Supabase
- Validate all API inputs
- Rate limit API endpoints
- Secure API keys
- Add CSRF protection

## 📖 Additional Documentation

- [Finnhub API Docs](https://finnhub.io/docs/api)
- [Supabase Docs](https://supabase.com/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)

## 🤝 Contributing

This is an MVP. Key areas for improvement:
1. Complete seed script
2. Individual learning module pages
3. Real authentication
4. Enhanced error handling
5. Loading states
6. Real-time features
7. Mobile optimization

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for financial education**
