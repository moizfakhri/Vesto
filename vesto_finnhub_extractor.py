"""
VESTO FINNHUB DATA EXTRACTOR
=============================
Complete data extraction module for Vesto: Financial Literacy 10-K Trainer + Stock Simulator

This module provides all necessary Finnhub API functions to support:
- Module 1: Basic Fundamentals (P/E, ROE, ROA, D/E, EBITDA)
- Module 2: Business & Risk Factors (10-K metadata for sec-api.io)
- Module 3: Financial Statements (Balance Sheet, Income Statement, Cash Flow)
- Module 4: Competitive Analysis (Multi-company comparisons)
- Module 5: Expert Comparative Analysis (Combined data)
- Stock Simulator: Real-time prices and portfolio tracking

TECH STACK INTEGRATION:
- Backend: Next.js API routes will call these functions
- Frontend: Next.js 14 (App Router) + TypeScript
- Database: Store results in Supabase
- AI: Pass data to Gemini API for grading

API KEY: Set your Finnhub API key below
"""

import requests
import json
import os
from typing import Dict, List, Optional, Any
from datetime import datetime
import time

# ============================================================================
# CONFIGURATION
# ============================================================================

import os

API_KEY = os.getenv("FINNHUB_API_KEY", "")  # Set via environment variable
if not API_KEY:
    raise ValueError("FINNHUB_API_KEY environment variable is required. Set it before running this script.")
BASE_URL = "https://finnhub.io/api/v1"

# Top 20 companies for Vesto platform
TOP_20_COMPANIES = [
    {"symbol": "AAPL", "name": "Apple Inc."},
    {"symbol": "MSFT", "name": "Microsoft Corporation"},
    {"symbol": "GOOGL", "name": "Alphabet Inc."},
    {"symbol": "AMZN", "name": "Amazon.com Inc."},
    {"symbol": "NVDA", "name": "NVIDIA Corporation"},
    {"symbol": "META", "name": "Meta Platforms Inc."},
    {"symbol": "TSLA", "name": "Tesla Inc."},
    {"symbol": "JPM", "name": "JPMorgan Chase & Co."},
    {"symbol": "V", "name": "Visa Inc."},
    {"symbol": "JNJ", "name": "Johnson & Johnson"},
    {"symbol": "WMT", "name": "Walmart Inc."},
    {"symbol": "PG", "name": "Procter & Gamble Co."},
    {"symbol": "UNH", "name": "UnitedHealth Group"},
    {"symbol": "HD", "name": "The Home Depot, Inc."},
    {"symbol": "KO", "name": "The Coca-Cola Company"},
    {"symbol": "NFLX", "name": "Netflix, Inc."},
    {"symbol": "DIS", "name": "The Walt Disney Company"},
    {"symbol": "ADBE", "name": "Adobe Inc."},
    {"symbol": "CRM", "name": "Salesforce, Inc."},
    {"symbol": "XOM", "name": "Exxon Mobil Corp."}
]


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def make_api_request(endpoint: str, params: Dict = None) -> Optional[Dict]:
    """
    Make a request to Finnhub API with error handling and rate limiting.
    
    Args:
        endpoint: API endpoint (e.g., '/quote', '/stock/metric')
        params: Query parameters as dictionary
    
    Returns:
        JSON response as dictionary, or None if error
    
    Usage in Next.js:
        const response = await fetch(`/api/finnhub/quote?symbol=AAPL`)
    """
    if params is None:
        params = {}
    params['token'] = API_KEY
    
    try:
        response = requests.get(f"{BASE_URL}{endpoint}", params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API Error for {endpoint}: {e}")
        return None


# ============================================================================
# MODULE 1: BASIC FUNDAMENTALS
# ============================================================================
# Gets: P/E ratio, EBITDA, D/E ratio, ROE, ROA, margins, growth metrics
# Use Case: "Easy" difficulty calculation questions and MCQs

def get_basic_fundamentals(symbol: str) -> Dict[str, Any]:
    """
    Fetch all basic financial metrics for Module 1 (Basic Fundamentals).
    
    This endpoint provides 40+ metrics including:
    - Valuation: P/E, P/B, PEG ratios
    - Profitability: ROE, ROA, profit margins
    - Leverage: Debt/Equity, current ratio
    - Growth: EPS growth, revenue growth
    - Efficiency: Asset turnover, inventory turnover
    
    Args:
        symbol: Stock ticker (e.g., 'AAPL')
    
    Returns:
        Dictionary with organized metrics for easy access
    
    Frontend Usage:
        Display metrics in cards/tables for student learning
        Generate MCQ questions comparing metrics
        Calculate ratios in real-time
    
    AI Integration:
        Pass to Gemini to generate questions like:
        "Calculate the P/E ratio for Apple"
        "Which company has better ROE - AAPL or MSFT?"
    """
    data = make_api_request("/stock/metric", {"symbol": symbol, "metric": "all"})
    
    if not data or "metric" not in data:
        return {"error": "Failed to fetch metrics", "symbol": symbol}
    
    metrics = data["metric"]
    
    # Organize metrics by category for easier frontend consumption
    return {
        "symbol": symbol,
        "timestamp": datetime.now().isoformat(),
        
        # VALUATION METRICS (for P/E ratio questions)
        "valuation": {
            "peRatio": metrics.get("peBasicExclExtraTTM"),
            "pbRatio": metrics.get("pbQuarterly"),
            "psRatio": metrics.get("psAnnual"),
            "pegRatio": metrics.get("pegBasic"),
            "forwardPE": metrics.get("forwardPE")
        },
        
        # PROFITABILITY METRICS (for ROE, ROA questions)
        "profitability": {
            "roe": metrics.get("roeTTM"),                    # Return on Equity
            "roa": metrics.get("roaTTM"),                    # Return on Assets
            "grossMargin": metrics.get("grossMarginTTM"),
            "operatingMargin": metrics.get("operatingMarginTTM"),
            "netProfitMargin": metrics.get("netProfitMarginTTM"),
            "ebitda": metrics.get("ebitdPerShareTTM")        # EBITDA per share
        },
        
        # LEVERAGE METRICS (for D/E ratio questions)
        "leverage": {
            "debtToEquity": metrics.get("totalDebt/totalEquityQuarterly"),
            "currentRatio": metrics.get("currentRatioQuarterly"),
            "quickRatio": metrics.get("quickRatioQuarterly"),
            "longTermDebtToEquity": metrics.get("longTermDebt/equityQuarterly")
        },
        
        # GROWTH METRICS (for growth analysis)
        "growth": {
            "epsGrowthYoY": metrics.get("epsGrowthQuarterlyYoy"),
            "revenueGrowthYoY": metrics.get("revenueGrowthQuarterlyYoy"),
            "epsGrowth5Y": metrics.get("epsGrowth5Y"),
            "revenueGrowth5Y": metrics.get("revenueGrowth5Y")
        },
        
        # MARKET DATA (for context)
        "market": {
            "beta": metrics.get("beta"),
            "marketCap": metrics.get("marketCapitalization"),
            "week52High": metrics.get("52WeekHigh"),
            "week52Low": metrics.get("52WeekLow")
        }
    }


# ============================================================================
# MODULE 2: BUSINESS & RISK FACTORS
# ============================================================================
# Gets: 10-K filing metadata (access numbers, URLs)
# Use Case: Get access numbers to pass to sec-api.io for text extraction

def get_10k_filing_metadata(symbol: str, years: int = 3) -> Dict[str, Any]:
    """
    Fetch 10-K filing metadata for Module 2 (Business & Risk Factors).
    
    This provides the "bridge" to sec-api.io:
    1. Get access number from Finnhub
    2. Pass access number to sec-api.io to extract text
    3. AI generates questions from extracted text
    
    Args:
        symbol: Stock ticker
        years: Number of years of filings to fetch (default 3)
    
    Returns:
        List of 10-K filings with access numbers and URLs
    
    Workflow:
        Finnhub (this function) → Get access number
        ↓
        sec-api.io → Use access number to get text sections
        ↓
        Gemini AI → Generate questions from text
        ↓
        Student → Answer questions about business/risks
    
    Example access number: "0000320193-25-000079"
    Use this with sec-api.io to extract:
    - Business description paragraphs
    - Risk factors section
    - Management discussion (MD&A)
    """
    from_date = f"{datetime.now().year - years}-01-01"
    to_date = datetime.now().strftime("%Y-%m-%d")
    
    data = make_api_request("/stock/filings", {
        "symbol": symbol,
        "from": from_date,
        "to": to_date
    })
    
    if not data:
        return {"error": "Failed to fetch filings", "symbol": symbol}
    
    # Handle response format (can be list or dict with 'result' key)
    all_filings = data if isinstance(data, list) else data.get("result", [])
    
    # Filter for 10-K reports only
    ten_k_filings = [f for f in all_filings if f.get("form") == "10-K"]
    
    # Format for easy frontend consumption
    filings = []
    for filing in ten_k_filings:
        filings.append({
            "accessNumber": filing.get("accessNumber"),      # KEY: Pass this to sec-api.io
            "filedDate": filing.get("filedDate"),
            "reportDate": filing.get("reportDate"),
            "acceptedDate": filing.get("acceptedDate"),
            "reportUrl": filing.get("reportUrl"),            # Direct link to SEC document
            "filingUrl": filing.get("filingUrl"),            # Index page with exhibits
            "cik": filing.get("cik"),                        # Company CIK number
            "form": filing.get("form")
        })
    
    return {
        "symbol": symbol,
        "total_10k_filings": len(filings),
        "filings": filings,
        "note": "Use accessNumber with sec-api.io to extract text sections"
    }


# ============================================================================
# MODULE 3: FINANCIAL STATEMENTS
# ============================================================================
# Gets: Actual line items from 10-K (Balance Sheet, Income Statement, Cash Flow)
# Use Case: Students analyze real financial statements and calculate ratios

def get_financial_statements(symbol: str, frequency: str = "annual") -> Dict[str, Any]:
    """
    Fetch actual financial statement data from 10-K/10-Q reports.
    
    This provides REAL line items as reported to SEC:
    - Balance Sheet: Assets, liabilities, equity
    - Income Statement: Revenue, expenses, net income
    - Cash Flow: Operating, investing, financing activities
    
    Args:
        symbol: Stock ticker
        frequency: 'annual' for 10-K, 'quarterly' for 10-Q
    
    Returns:
        Financial statements with actual reported values
    
    Use Cases:
        - "Calculate current ratio from the balance sheet"
        - "What is the gross profit margin?"
        - "Is operating cash flow positive?"
        - "Compare assets vs liabilities"
    
    AI Grading:
        Students calculate ratios → AI checks against these values
        Example: Current Ratio = Current Assets / Current Liabilities
    """
    data = make_api_request("/stock/financials-reported", {
        "symbol": symbol,
        "freq": frequency
    })
    
    if not data or "data" not in data:
        return {"error": "Failed to fetch financial statements", "symbol": symbol}
    
    reports = data.get("data", [])
    
    # Format financial statements for easy access
    formatted_reports = []
    for report in reports[:3]:  # Get last 3 reports
        
        # Extract key line items from each statement
        balance_sheet = {}
        income_statement = {}
        cash_flow = {}
        
        if "report" in report:
            raw_report = report["report"]
            
            # Balance Sheet (bs) - Assets, Liabilities, Equity
            if "bs" in raw_report:
                for item in raw_report["bs"]:
                    label = item.get("label", "")
                    concept = item.get("concept", "")
                    value = item.get("value")
                    
                    # Store important balance sheet items
                    if any(key in label.lower() for key in ["asset", "liability", "equity", "cash", "debt"]):
                        balance_sheet[concept] = {
                            "label": label,
                            "value": value,
                            "unit": item.get("unit", "USD")
                        }
            
            # Income Statement (ic) - Revenue, Expenses, Income
            if "ic" in raw_report:
                for item in raw_report["ic"]:
                    label = item.get("label", "")
                    concept = item.get("concept", "")
                    value = item.get("value")
                    
                    # Store important income statement items
                    if any(key in label.lower() for key in ["revenue", "sales", "income", "expense", "cost", "margin", "eps"]):
                        income_statement[concept] = {
                            "label": label,
                            "value": value,
                            "unit": item.get("unit", "USD")
                        }
            
            # Cash Flow (cf) - Operating, Investing, Financing
            if "cf" in raw_report:
                for item in raw_report["cf"]:
                    label = item.get("label", "")
                    concept = item.get("concept", "")
                    value = item.get("value")
                    
                    # Store important cash flow items
                    if any(key in label.lower() for key in ["cash", "operating", "investing", "financing"]):
                        cash_flow[concept] = {
                            "label": label,
                            "value": value,
                            "unit": item.get("unit", "USD")
                        }
        
        formatted_reports.append({
            "year": report.get("year"),
            "quarter": report.get("quarter"),
            "form": report.get("form"),
            "filedDate": report.get("filedDate"),
            "startDate": report.get("startDate"),
            "endDate": report.get("endDate"),
            "accessNumber": report.get("accessNumber"),
            "balanceSheet": balance_sheet,
            "incomeStatement": income_statement,
            "cashFlow": cash_flow
        })
    
    return {
        "symbol": symbol,
        "frequency": frequency,
        "total_reports": len(reports),
        "reports": formatted_reports
    }


# ============================================================================
# MODULE 4 & 5: COMPETITIVE ANALYSIS & COMPARATIVE ANALYSIS
# ============================================================================
# Gets: Company profile for industry classification and market cap comparison
# Use Case: Compare companies within same industry

def get_company_profile(symbol: str) -> Dict[str, Any]:
    """
    Fetch company profile for comparative analysis.
    
    This provides:
    - Industry classification (for grouping companies)
    - Market capitalization (for size comparison)
    - Basic company info (name, exchange, country)
    
    Args:
        symbol: Stock ticker
    
    Returns:
        Company profile data
    
    Use Cases:
        - "Compare Apple and Microsoft (both Technology industry)"
        - "Which company has larger market cap?"
        - "Analyze competitive advantages within same industry"
    
    Module 4: Single industry analysis
    Module 5: Multi-industry expert comparative analysis
    """
    data = make_api_request("/stock/profile2", {"symbol": symbol})
    
    if not data:
        return {"error": "Failed to fetch profile", "symbol": symbol}
    
    return {
        "symbol": symbol,
        "name": data.get("name"),
        "industry": data.get("finnhubIndustry"),
        "sector": data.get("finnhubIndustry"),  # Use for grouping
        "marketCap": data.get("marketCapitalization"),
        "sharesOutstanding": data.get("shareOutstanding"),
        "exchange": data.get("exchange"),
        "country": data.get("country"),
        "currency": data.get("currency"),
        "ipo": data.get("ipo"),
        "website": data.get("weburl"),
        "logo": data.get("logo"),
        "phone": data.get("phone")
    }


def compare_companies(symbols: List[str]) -> Dict[str, Any]:
    """
    Compare multiple companies for Module 4 (Competitive Analysis).
    
    Fetches metrics for multiple companies and organizes for comparison.
    
    Args:
        symbols: List of stock tickers to compare
    
    Returns:
        Dictionary with all companies' data for side-by-side comparison
    
    Use Cases:
        - "Compare P/E ratios: Apple vs Microsoft"
        - "Which tech company has best ROE?"
        - "Analyze debt levels across competitors"
    
    AI Integration:
        Gemini analyzes differences and generates questions
        Students must identify which company is stronger and why
    """
    comparison = {
        "symbols": symbols,
        "timestamp": datetime.now().isoformat(),
        "companies": {}
    }
    
    for symbol in symbols:
        print(f"Fetching data for {symbol}...")
        
        # Get all relevant data for comparison
        profile = get_company_profile(symbol)
        fundamentals = get_basic_fundamentals(symbol)
        
        comparison["companies"][symbol] = {
            "profile": profile,
            "fundamentals": fundamentals
        }
        
        time.sleep(0.5)  # Rate limiting
    
    return comparison


# ============================================================================
# STOCK SIMULATOR
# ============================================================================
# Gets: Real-time stock prices for paper trading platform
# Use Case: Track portfolio performance, AI Fund Manager approvals

def get_realtime_quote(symbol: str) -> Dict[str, Any]:
    """
    Fetch real-time stock price for Stock Simulator.
    
    This provides live market data for:
    - Paper trading platform
    - Portfolio valuation
    - Performance tracking
    - AI Fund Manager decisions
    
    Args:
        symbol: Stock ticker
    
    Returns:
        Real-time price data
    
    Simulator Flow:
        1. Student researches company (Modules 1-5)
        2. Student writes investment thesis
        3. AI Fund Manager reviews
        4. If approved → Get current price (this function)
        5. Add to portfolio
        6. Track performance with periodic price updates
    """
    data = make_api_request("/quote", {"symbol": symbol})
    
    if not data:
        return {"error": "Failed to fetch quote", "symbol": symbol}
    
    return {
        "symbol": symbol,
        "timestamp": datetime.now().isoformat(),
        "currentPrice": data.get("c"),              # Current price
        "change": data.get("d"),                     # Dollar change
        "percentChange": data.get("dp"),             # Percent change
        "high": data.get("h"),                       # Day high
        "low": data.get("l"),                        # Day low
        "open": data.get("o"),                       # Open price
        "previousClose": data.get("pc"),             # Previous close
        "marketTimestamp": data.get("t")             # Unix timestamp
    }


def get_portfolio_value(holdings: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Calculate total portfolio value for Stock Simulator.
    
    Args:
        holdings: List of holdings, each with 'symbol' and 'shares' keys
                 Example: [{"symbol": "AAPL", "shares": 10, "buyPrice": 150.00}]
    
    Returns:
        Portfolio valuation with current prices and performance
    
    Use Case:
        Display student portfolio with current values
        Calculate returns on AI-approved stock picks
        Leaderboard: Best performing portfolios
    """
    portfolio = {
        "timestamp": datetime.now().isoformat(),
        "holdings": [],
        "totalValue": 0,
        "totalCost": 0,
        "totalGainLoss": 0,
        "totalGainLossPercent": 0
    }
    
    for holding in holdings:
        symbol = holding["symbol"]
        shares = holding["shares"]
        buy_price = holding.get("buyPrice", 0)
        
        # Get current price
        quote = get_realtime_quote(symbol)
        current_price = quote.get("currentPrice", 0)
        
        # Calculate position metrics
        current_value = shares * current_price
        cost_basis = shares * buy_price
        gain_loss = current_value - cost_basis
        gain_loss_percent = (gain_loss / cost_basis * 100) if cost_basis > 0 else 0
        
        portfolio["holdings"].append({
            "symbol": symbol,
            "shares": shares,
            "buyPrice": buy_price,
            "currentPrice": current_price,
            "costBasis": cost_basis,
            "currentValue": current_value,
            "gainLoss": gain_loss,
            "gainLossPercent": gain_loss_percent
        })
        
        portfolio["totalValue"] += current_value
        portfolio["totalCost"] += cost_basis
        
        time.sleep(0.5)  # Rate limiting
    
    portfolio["totalGainLoss"] = portfolio["totalValue"] - portfolio["totalCost"]
    portfolio["totalGainLossPercent"] = (
        portfolio["totalGainLoss"] / portfolio["totalCost"] * 100 
        if portfolio["totalCost"] > 0 else 0
    )
    
    return portfolio


# ============================================================================
# ADDITIONAL USEFUL ENDPOINTS
# ============================================================================

def get_analyst_recommendations(symbol: str) -> Dict[str, Any]:
    """
    Get analyst buy/sell/hold recommendations.
    
    Use Case:
        - Context for student analysis
        - Compare student thesis vs analyst consensus
        - Discussion: "Why do analysts disagree?"
    """
    data = make_api_request("/stock/recommendation", {"symbol": symbol})
    
    if not data or len(data) == 0:
        return {"error": "Failed to fetch recommendations", "symbol": symbol}
    
    latest = data[0]
    return {
        "symbol": symbol,
        "period": latest.get("period"),
        "strongBuy": latest.get("strongBuy"),
        "buy": latest.get("buy"),
        "hold": latest.get("hold"),
        "sell": latest.get("sell"),
        "strongSell": latest.get("strongSell"),
        "consensus": "Buy" if (latest.get("strongBuy", 0) + latest.get("buy", 0)) > 
                              (latest.get("sell", 0) + latest.get("strongSell", 0)) else "Sell"
    }


def get_company_news(symbol: str, days: int = 30) -> Dict[str, Any]:
    """
    Get recent company news articles.
    
    Use Case:
        - Context for risk factor analysis
        - Current events affecting company
        - Module 2: "How does recent news relate to 10-K risks?"
    """
    from_date = f"{datetime.now().year}-{max(1, datetime.now().month - 1):02d}-01"
    to_date = datetime.now().strftime("%Y-%m-%d")
    
    data = make_api_request("/company-news", {
        "symbol": symbol,
        "from": from_date,
        "to": to_date
    })
    
    if not data:
        return {"error": "Failed to fetch news", "symbol": symbol}
    
    # Format top 10 articles
    articles = []
    for article in data[:10]:
        articles.append({
            "headline": article.get("headline"),
            "summary": article.get("summary"),
            "source": article.get("source"),
            "url": article.get("url"),
            "datetime": article.get("datetime"),
            "category": article.get("category")
        })
    
    return {
        "symbol": symbol,
        "total_articles": len(data),
        "articles": articles
    }


# ============================================================================
# BULK DATA EXTRACTION FOR ALL COMPANIES
# ============================================================================

def extract_all_companies_data() -> Dict[str, Any]:
    """
    Extract complete dataset for all top 20 companies.
    
    This is the MASTER function that gets everything you need:
    - Module 1: Basic fundamentals
    - Module 2: 10-K metadata
    - Module 3: Financial statements
    - Module 4/5: Company profiles for comparison
    - Simulator: Real-time quotes
    
    Returns:
        Complete dataset ready to store in Supabase
    
    Usage:
        Run once to populate database
        Schedule periodic updates (daily/weekly)
        Cache results to minimize API calls
    """
    print("="*80)
    print("VESTO DATA EXTRACTION - Top 20 Companies")
    print("="*80)
    print()
    
    all_data = {
        "extracted_at": datetime.now().isoformat(),
        "companies": {}
    }
    
    for company in TOP_20_COMPANIES:
        symbol = company["symbol"]
        name = company["name"]
        
        print(f"Extracting data for {name} ({symbol})...")
        
        try:
            # Get all relevant data
            company_data = {
                "symbol": symbol,
                "name": name,
                
                # Module 1: Basic Fundamentals
                "fundamentals": get_basic_fundamentals(symbol),
                
                # Module 2: 10-K Metadata (for sec-api.io)
                "filings": get_10k_filing_metadata(symbol, years=3),
                
                # Module 3: Financial Statements
                "financials": get_financial_statements(symbol, frequency="annual"),
                
                # Module 4/5: Company Profile
                "profile": get_company_profile(symbol),
                
                # Stock Simulator: Real-time Quote
                "quote": get_realtime_quote(symbol),
                
                # Additional Context
                "recommendations": get_analyst_recommendations(symbol),
                "news": get_company_news(symbol)
            }
            
            all_data["companies"][symbol] = company_data
            
            print(f"  ✓ Successfully extracted data for {symbol}")
            print()
            
            # Rate limiting (60 calls/minute on free tier)
            time.sleep(1)
            
        except Exception as e:
            print(f"  ✗ Error extracting {symbol}: {e}")
            all_data["companies"][symbol] = {
                "symbol": symbol,
                "name": name,
                "error": str(e)
            }
    
    return all_data


# ============================================================================
# DEMO: EXTRACT AND SAVE DATA
# ============================================================================

if __name__ == "__main__":
    """
    Demo script: Extract all data and save to JSON file.
    
    This file can be:
    1. Loaded into Supabase database
    2. Used for testing AI question generation
    3. Cached for frontend to reduce API calls
    4. Passed to Gemini API for analysis
    """
    
    print("\n" + "="*80)
    print("STARTING VESTO DATA EXTRACTION")
    print("="*80)
    print("\nThis will extract:")
    print("  • Basic fundamentals (P/E, ROE, ROA, D/E, EBITDA)")
    print("  • 10-K filing metadata (for sec-api.io integration)")
    print("  • Financial statements (Balance Sheet, Income, Cash Flow)")
    print("  • Company profiles (for comparative analysis)")
    print("  • Real-time stock quotes (for simulator)")
    print("  • Analyst recommendations & news")
    print()
    
    # Extract all data
    data = extract_all_companies_data()
    
    # Save to JSON file
    output_file = "vesto_finnhub_20_companies.json"
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)
    
    print("\n" + "="*80)
    print("EXTRACTION COMPLETE")
    print("="*80)
    print(f"\n✓ Data saved to: {output_file}")
    print(f"✓ Companies extracted: {len(data['companies'])}")
    
    # Summary by company
    print("\nData Summary by Company:")
    print("-" * 80)
    for symbol, company_data in data["companies"].items():
        if "error" in company_data:
            print(f"  ✗ {symbol}: Error - {company_data['error']}")
        else:
            print(f"  ✓ {symbol}: All data extracted successfully")
            
            # Show sample metrics
            if "fundamentals" in company_data and "valuation" in company_data["fundamentals"]:
                pe = company_data["fundamentals"]["valuation"].get("peRatio")
                print(f"      P/E Ratio: {pe}")
            
            if "quote" in company_data:
                price = company_data["quote"].get("currentPrice")
                print(f"      Current Price: ${price}")
            
            if "filings" in company_data:
                filings_count = company_data["filings"].get("total_10k_filings", 0)
                print(f"      10-K Filings Available: {filings_count}")
            
            print()
    
    print("="*80)
    print("NEXT STEPS FOR VESTO INTEGRATION")
    print("="*80)
    print("""
    1. Load this data into Supabase:
       - Create tables for companies, fundamentals, filings, quotes
       - Use symbol as primary key
       - Add timestamp fields for cache invalidation
    
    2. Create Next.js API routes:
       - /api/company/[symbol]/fundamentals
       - /api/company/[symbol]/filings
       - /api/company/[symbol]/financials
       - /api/company/[symbol]/quote
       - /api/company/compare (for Module 4/5)
    
    3. Frontend components:
       - MetricsCard: Display P/E, ROE, etc.
       - ComparisonTable: Side-by-side company comparison
       - StockQuote: Real-time price display
       - PortfolioTracker: Simulator holdings
    
    4. AI Integration:
       - Pass fundamentals to Gemini for MCQ generation
       - Use financial statements for calculation questions
       - Compare student answers against actual values
    
    5. sec-api.io Integration:
       - Use accessNumber from filings data
       - Extract text sections (Business, Risk Factors)
       - Pass to Gemini for text-based questions
    
    This file contains ALL the data you need from Finnhub!
    """)
    print("="*80)
