/**
 * Mock 10-K Narratives - Simplified for MVP
 * Each company has business, risk, and financial sections
 */

export interface Mock10KData {
  symbol: string;
  companyName: string;
  fiscalYear: number;
  businessDescription: string;
  riskFactors: string;
  financialDiscussion: string;
}

const companyData: Record<string, { name: string; business: string; risks: string; financials: string }> = {
  AAPL: {
    name: "Apple Inc.",
    business: "Apple designs, manufactures, and markets smartphones, personal computers, tablets, and wearables. iPhone represents 52% of revenue, with Services growing to 22% of total sales. We operate through integrated hardware, software, and services ecosystem with over 1 billion paid subscriptions globally.",
    risks: "We face intense competition in consumer electronics from Samsung, Google, and Chinese manufacturers. Supply chain dependency on China exposes us to geopolitical risks and tariffs. Regulatory scrutiny regarding App Store practices and antitrust concerns could force business model changes.",
    financials: "Revenue grew 8% to $383B with gross margin of 44%. iPhone sales increased 6% while Services grew 16%. Operating cash flow of $111B enables significant shareholder returns through $96B in buybacks and dividends while maintaining $162B cash position."
  },
  MSFT: {
    name: "Microsoft Corporation",
    business: "Microsoft develops software, cloud services, and devices globally. Azure cloud platform drives 42% of revenue with 29% growth. Office 365 serves 400M commercial seats. Strategic OpenAI partnership positions us as AI leader across productivity and cloud infrastructure.",
    risks: "Competition from AWS in cloud infrastructure and Google Workspace in productivity. Azure service outages could damage customer relationships. Regulatory investigations into cloud practices, Teams bundling, and AI partnership with OpenAI create uncertainty.",
    financials: "Revenue increased 16% to $228B driven by Azure growth. Operating margin expanded to 44% from 42%. Generated record $101B operating cash flow while investing $37B in datacenter infrastructure for AI capabilities."
  },
  GOOGL: {
    name: "Alphabet Inc.",
    business: "Google provides search, advertising, and cloud services globally. Search dominates with 2.5B YouTube users. Google Cloud grew to 11% of revenue. Heavy AI investment in Bard and generative search features positions us for next computing platform shift.",
    risks: "Advertising revenue dependency (78% of total) exposes us to economic cycles. DOJ antitrust lawsuits challenge search distribution agreements. EU fines exceed €8B for competition violations. iOS privacy changes reduce ad targeting effectiveness.",
    financials: "Revenue grew 13% to $321B with Search up 11% and Cloud up 32%. Cloud achieved 5% operating margin vs negative 8% prior year. Generated $106B cash flow, invested $40B in datacenters, repurchased $62B stock."
  },
  AMZN: {
    name: "Amazon.com Inc.",
    business: "Amazon operates e-commerce, cloud computing, and digital streaming globally. AWS provides 16% of revenue but majority of operating income. Retail serves 240M customers with expanding same-day delivery. Prime membership exceeds 200M globally.",
    risks: "Intense retail competition from Walmart and specialized e-commerce sites. AWS faces competition from Azure and Google Cloud. FTC antitrust lawsuit alleges illegal monopoly maintenance. Unionization efforts and workplace condition scrutiny create labor risks.",
    financials: "Revenue grew 12% to $575B with AWS up 16% and retail up 11%. Operating income surged 225% to $37B as operating margin expanded to 6.4%. Generated $99B operating cash flow, invested $64B in infrastructure."
  },
  NVDA: {
    name: "NVIDIA Corporation",
    business: "NVIDIA provides GPUs and accelerated computing platforms for AI, data centers, and gaming. Data Center segment represents 76% of revenue driven by H100 GPU demand for large language model training. CUDA software creates developer ecosystem moat.",
    risks: "Current AI demand could moderate if enterprise adoption slows. Competition from AMD, Intel, and custom silicon from cloud providers (Google TPU, Amazon chips). U.S. export restrictions to China eliminate 20-25% of Data Center addressable market.",
    financials: "Revenue exploded 126% to $61B driven by 217% Data Center growth. Gross margin expanded to 73% from 57% as H100 commands premium pricing. Operating margin reached extraordinary 55% generating $37B cash flow."
  },
  META: {
    name: "Meta Platforms Inc.",
    business: "Meta builds social technologies connecting 3.19B daily users across Facebook, Instagram, WhatsApp, and Messenger. Advertising generates 98% of revenue. Reality Labs invests $10-15B annually in metaverse and VR with Quest headsets and Ray-Ban smart glasses.",
    risks: "Advertising revenue concentration and economic sensitivity. Apple iOS privacy changes materially impacted ad targeting and measurement. FTC proposes structural remedies including Instagram/WhatsApp divestiture. Reality Labs losses exceed $16B annually with uncertain returns.",
    financials: "Revenue grew 16% to $135B with advertising up 17%. Medical care ratio improved as 'Year of Efficiency' reduced costs. Operating margin expanded to 35% from 25%. Generated $71B cash flow, invested $28B in AI infrastructure."
  },
  TSLA: {
    name: "Tesla Inc.",
    business: "Tesla designs, manufactures, and sells electric vehicles and energy storage worldwide. Produced 1.85M vehicles with vertical integration including battery cells. Autopilot/FSD serves 500K+ customers. Supercharger network includes 50K+ charging stalls globally.",
    risks: "Intense EV competition from traditional automakers and Chinese manufacturers like BYD. Raw material price volatility affects battery costs. Shanghai factory concentration creates geopolitical risk. FSD regulatory scrutiny over safety and marketing claims.",
    financials: "Revenue grew 19% to $97B but automotive gross margin declined to 18% from 26% due to price cuts. Operating margin compressed to 9.5% from 17%. Generated $13B operating cash flow, invested $9B in capacity expansion."
  },
  JPM: {
    name: "JPMorgan Chase & Co.",
    business: "JPMorgan provides investment banking, consumer banking, and asset management globally with $3.9T assets. Consumer Banking serves 54M mobile customers. Corporate & Investment Bank leads in M&A advisory. Asset Management serves high net worth individuals and institutions.",
    risks: "Credit risk from potential economic downturn and commercial real estate exposure, particularly $75B office portfolio facing remote work pressures. Extensive regulation as G-SIB requires heightened capital and resolution planning. Cybersecurity threats could compromise customer data.",
    financials: "Net revenue grew 9% to $158B with net interest income up 17% from higher rates. Provision for credit losses increased to $10B. Net income grew 29% to $50B with ROTCE of 19%. CET1 ratio of 15% exceeds regulatory minimums."
  },
  V: {
    name: "Visa Inc.",
    business: "Visa operates global payments network facilitating digital payments between consumers, merchants, and financial institutions. VisaNet processed 275B transactions on $14.3T payment volume. Cross-border volume represents 35% with 21% growth reflecting travel recovery.",
    risks: "Competition from Mastercard, American Express, digital wallets, and emerging real-time payment networks. EU interchange fee caps limit cross-border revenues. Regulatory investigations of network rules and merchant acceptance practices. Large tech companies developing payment bypasses.",
    financials: "Revenue grew 10% to $36B driven by payment volume and transaction growth. Operating margin of 67% demonstrates business scalability. Generated $22B operating cash flow, returned $18B through $13B buybacks and $5B dividends."
  },
  JNJ: {
    name: "Johnson & Johnson",
    business: "Johnson & Johnson researches and sells healthcare products through Innovative Medicine (65% of sales) and MedTech (35%) following Consumer Health separation. Leading pharmaceutical products include Stelara, Darzalex, and Tremfya. MedTech includes orthopedics and cardiovascular devices.",
    risks: "Stelara U.S. patent expires 2025 facing biosimilar competition on $9B annual sales. Drug pricing pressure intensifying with IRA enabling Medicare negotiation. Talc litigation continues with thousands of claims. Opioid-related litigation regarding Janssen subsidiary products.",
    financials: "Sales grew 7% to $88B with Innovative Medicine up 7% and MedTech up 8%. Gross margin improved to 69%. R&D investment of $15B represents 17% of sales. Generated $22B operating cash flow, returned $14B in dividends maintaining 62-year increase streak."
  },
  WMT: {
    name: "Walmart Inc.",
    business: "Walmart operates 10,500 retail stores and e-commerce sites globally serving 240M weekly customers. Walmart U.S. generates 68% of sales. E-commerce growing 22% with enhanced grocery pickup/delivery. Walmart+ exceeds 32M members driving loyalty and frequency.",
    risks: "Intense retail competition from Amazon, Target, and dollar stores requiring continuous price investments. Labor costs rising from wage pressures and minimum wage increases. Cybersecurity, supply chain disruptions, and food safety risks could impact operations and reputation.",
    financials: "Revenue grew 6% to $648B with comparable sales up 5.3%. Operating margin expanded to 4.2% from 4.0% as operating expenses leveraged. Generated $36B operating cash flow, returned $20B to shareholders through dividends and buybacks."
  },
  PG: {
    name: "Procter & Gamble Co.",
    business: "P&G provides consumer packaged goods across Beauty, Grooming, Health Care, Fabric & Home Care, and Baby/Feminine Care. Portfolio includes 21 brands with $1B+ annual sales like Tide, Pampers, and Gillette. Premium positioning strategy emphasizes innovation over price competition.",
    risks: "Private label competition intensifying particularly in economic downturns. Commodity cost volatility affects profitability with pricing lag. Regulatory scrutiny on product safety and environmental impact. Currency fluctuations impact international sales translation.",
    financials: "Sales grew 2% to $84B with organic growth of 4%. Gross margin expanded to 52% from 50% through productivity and pricing. Operating margin reached 22% from 19%. Generated $19B operating cash flow, returned $17B including $9B dividends (68-year increase record)."
  },
  UNH: {
    name: "UnitedHealth Group",
    business: "UnitedHealth provides health insurance and services through UnitedHealthcare (53M members) and Optum (care delivery, analytics, pharmacy). Medicare Advantage serves 8.1M with 24% market share. Optum includes 70K physicians in value-based care arrangements covering 65% of patients.",
    risks: "Medicare Advantage payment rate changes significantly impact revenues. Medical cost estimation complexity could result in reserve inadequacy. Competition from Elevance, CVS/Aetna, Cigna, Humana intensifying. Data breaches could expose personal health information creating liability.",
    financials: "Revenue grew 14% to $372B with UnitedHealthcare up 12% and Optum up 24%. Medical care ratio improved to 82.8%. Operating margin expanded to 7.0% from 6.5%. Generated $32B cash flow, returned $12B to shareholders."
  },
  HD: {
    name: "The Home Depot Inc.",
    business: "Home Depot operates 2,300+ home improvement retail stores across North America. Serves professional contractors (45% of sales) and DIY consumers. Interconnected retail strategy combines stores, digital platforms, and supply chain for same-day/next-day delivery capabilities.",
    risks: "Cyclical housing market and interest rate sensitivity affect demand. Competition from Lowe's and Amazon requires continuous price competitiveness. Labor shortages impact service levels. Supply chain disruptions and commodity inflation create margin pressure.",
    financials: "Sales grew 4% to $158B with comparable sales up 3%. Operating margin of 15% reflects strong execution. Generated $18B cash flow, returned $17B through $15B buybacks and dividends. Debt leverage well-managed despite high D/E ratio."
  },
  KO: {
    name: "The Coca-Cola Company",
    business: "Coca-Cola manufactures and sells nonalcoholic beverages worldwide across sparkling soft drinks, water, sports drinks, juice, and tea. Brand portfolio includes Coca-Cola, Sprite, Fanta, Dasani, Powerade. Operates through concentrate/syrup sales to bottling partners with broad global distribution.",
    risks: "Consumer health trends toward sugar reduction impact core carbonated beverage volumes. Commodity cost volatility in sweeteners, PET resin, and aluminum affects profitability. Currency fluctuations impact international revenue translation. Water scarcity and sustainability scrutiny create operational challenges.",
    financials: "Revenue grew 3% to $46B with price/mix offsetting volume pressure. Operating margin stable at 29%. Generated $11B operating cash flow enabling $7B dividend and $1B buybacks. Strong balance sheet with AA- credit rating supports financial flexibility."
  },
  NFLX: {
    name: "Netflix Inc.",
    business: "Netflix provides subscription streaming entertainment with 247M paid memberships globally. Invests $17B annually in content across originals and licensed programming. Expanding into live events, gaming, and advertising-supported tier launched 2022 reaching 15M monthly users.",
    risks: "Intense streaming competition from Disney+, HBO Max, Apple TV+, Prime Video forcing content spending escalation. Maturing U.S. market requires international growth. Password sharing crackdown could alienate subscribers. Content production delays or failures impact subscriber retention.",
    financials: "Revenue grew 7% to $33B with 9% paid net additions. Operating margin expanded to 21% from 18% as content efficiency improved. Generated $7B free cash flow turning positive after years of investment. Launched $5B buyback program."
  },
  DIS: {
    name: "The Walt Disney Company",
    business: "Disney operates entertainment businesses including Media Networks (ESPN, ABC), Parks & Experiences, Studio Entertainment (Marvel, Pixar, Star Wars), and Direct-to-Consumer streaming (Disney+, Hulu, ESPN+). Disney+ reached 161M subscribers. Parks drive high-margin revenue.",
    risks: "Streaming competition creates subscriber churn and content cost pressure. ESPN faces cord-cutting and sports rights cost inflation. Park attendance sensitive to economic conditions. Content production dependent on theatrical windows and talent relationships.",
    financials: "Revenue grew 6% to $89B but operating income declined 13% as streaming losses of $4B offset parks strength. Restructuring to reduce $5.5B costs announced. Parks operating margin of 28% demonstrates strong pricing power. Generated $10B cash flow."
  },
  ADBE: {
    name: "Adobe Inc.",
    business: "Adobe provides creative software (Photoshop, Illustrator, Premiere Pro), document solutions (Acrobat, PDF), and experience management through Creative Cloud, Document Cloud, and Experience Cloud subscriptions. Serves creators, marketers, and enterprises with 90%+ of revenue from subscriptions.",
    risks: "AI-generated content tools from Midjourney, Stable Diffusion could disrupt creative workflows. Competition from Canva for simplified design and Figma for collaboration. Enterprise customers consolidating software spend. Figma acquisition blocked by regulators on antitrust grounds.",
    financials: "Revenue grew 10% to $20B with Digital Media up 11% and Creative Cloud representing 72% of revenue. Operating margin of 37% reflects high software margins. Generated $8B operating cash flow, repurchased $4B stock. Strong balance sheet with minimal debt."
  },
  CRM: {
    name: "Salesforce Inc.",
    business: "Salesforce provides cloud-based CRM software helping companies connect with customers through Sales Cloud, Service Cloud, Marketing Cloud, and Commerce Cloud. Serves 150K+ customers. Platform enables third-party apps via AppExchange. Recent acquisitions include Slack and Tableau.",
    risks: "Competition from Microsoft Dynamics, Oracle, SAP, and niche CRM providers intensifying. Enterprise spending sensitive to macroeconomic conditions. Integration challenges from multiple acquisitions including Slack. High valuation expectations require consistent growth execution.",
    financials: "Revenue grew 11% to $34B with subscription revenue of 93%. Operating margin compressed to 15% from 19% as Slack integration and investments weigh on profitability. Generated $7B operating cash flow despite margin pressure. Committed to margin expansion targets."
  },
  XOM: {
    name: "Exxon Mobil Corp.",
    business: "ExxonMobil explores for and produces crude oil, natural gas, and petroleum products globally. Integrated model spans upstream exploration/production, downstream refining/chemicals, and emerging low-carbon solutions. Permian Basin production growing, LNG exports expanding, advancing carbon capture technology.",
    risks: "Commodity price volatility directly impacts revenues and profitability. Energy transition and climate policy create long-term demand uncertainty. Regulatory restrictions on drilling and emissions increase compliance costs. Geopolitical tensions affect international operations and supply chains.",
    financials: "Revenue increased 2% to $413B though oil prices moderated from 2022 peaks. Earnings of $36B reflect strong integrated margins. Generated $56B operating cash flow, returned $32B through dividends and buybacks. Investing $20B annually including low-carbon solutions."
  }
};

export const mock10KNarratives: Mock10KData[] = Object.entries(companyData).map(([symbol, data]) => ({
  symbol,
  companyName: data.name,
  fiscalYear: 2024,
  businessDescription: data.business,
  riskFactors: data.risks,
  financialDiscussion: data.financials
}));

export const get10KNarrative = (symbol: string): Mock10KData | undefined => {
  return mock10KNarratives.find(n => n.symbol === symbol);
};

export const available10KSymbols = mock10KNarratives.map(n => n.symbol);
