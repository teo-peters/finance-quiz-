export type QuestionSource = { name: string; url: string };

const source = (name: string, url: string): QuestionSource => ({ name, url });

// Primary regulators, central banks, statistical agencies and protocol documentation.
// Topic matching gives each displayed question a reference appropriate to its subject.
const references: Record<string, QuestionSource> = {
  bitcoin: source("Bitcoin Developer Documentation", "https://developer.bitcoin.org/devguide/"),
  cryptoRisk: source("BaFin: Risiken von Kryptowerten", "https://www.bafin.de/SharedDocs/Veroeffentlichungen/DE/Verbrauchermitteilung/weitere/2021/meldung_210113_Warnung_Kryptowerte.html"),
  wallet: source("Bitcoin.org: Schütze deine Wallet", "https://bitcoin.org/de/schutze-deine-wallet"),
  stablecoin: source("BIS: The use of stablecoins", "https://www.bis.org/publ/arpdf/ar2023e3.htm"),
  ethereum: source("Ethereum.org: Smart contracts", "https://ethereum.org/en/developers/docs/smart-contracts/"),
  securities: source("Investor.gov: Stocks", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks"),
  etf: source("SEC Investor Bulletin: Exchange-Traded Funds", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-2"),
  diversification: source("Investor.gov: Diversification", "https://www.investor.gov/introduction-investing/investing-basics/glossary/diversification"),
  company: source("SEC: Beginners’ Guide to Financial Statements", "https://www.sec.gov/about/reports-publications/beginners-guide-financial-statements"),
  ratios: source("Investor.gov: How to Read a 10-K", "https://www.investor.gov/introduction-investing/investing-basics/glossary/10-k"),
  index: source("MSCI: Indexes", "https://www.msci.com/our-solutions/indexes"),
  markets: source("SEC: Trading Basics", "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work"),
  inflation: source("ECB: What is inflation?", "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html"),
  rates: source("ECB: Key interest rates", "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html"),
  gdp: source("Eurostat: National accounts", "https://ec.europa.eu/eurostat/web/national-accounts"),
  labour: source("Eurostat: Unemployment rate", "https://ec.europa.eu/eurostat/databrowser/view/tps00203/default/table"),
  monetary: source("ECB: Monetary policy", "https://www.ecb.europa.eu/mopo/intro/html/index.en.html"),
  recession: source("IMF: Recessions and recoveries", "https://www.imf.org/external/pubs/ft/fandd/basics/recess.htm"),
  compound: source("Investor.gov: Compound Interest Calculator", "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"),
  credit: source("European Commission: Consumer credit", "https://europa.eu/youreurope/citizens/consumers/financial-products-and-services/consumer-credits-and-loans/index_en.htm"),
  budget: source("Consumer.gov: Making a Budget", "https://consumer.gov/managing-your-money/making-budget"),
  insurance: source("BaFin: Insurance", "https://www.bafin.de/EN/Verbraucher/Versicherung/versicherung_node_en.html"),
  bonds: source("Investor.gov: Bonds", "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds"),
  trading: source("Investor.gov: Types of Orders", "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders"),
  leverage: source("ESMA: CFDs and leverage", "https://www.esma.europa.eu/investor-corner/financial-products-and-services/contracts-difference-cfds"),
  options: source("OCC: Characteristics and Risks of Standardized Options", "https://www.theocc.com/company-information/documents-and-archives/options-disclosure-document"),
  risk: source("CFTC: Understand the Risks of Virtual Currency Trading", "https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/understand_risks_of_virtual_currency.html"),
  portfolio: source("Investor.gov: Asset Allocation and Diversification", "https://www.investor.gov/introduction-investing/investing-basics/save-and-invest/asset-allocation-diversification-and-rebalancing"),
  valuation: source("Damodaran Online: Valuation", "https://pages.stern.nyu.edu/~adamodar/"),
  tax: source("European Commission: Taxation", "https://taxation-customs.ec.europa.eu/taxation_en"),
};

const rules: Array<[RegExp, keyof typeof references]> = [
  [/bitcoin|blockchain|hashrate|proof.of.work|proof.of.stake|consensus|miner|satoshi|halving|network|protocol|finality/i, "bitcoin"],
  [/wallet|private key|seed phrase|custody|self.custody|schlüssel|seedphrase/i, "wallet"],
  [/stablecoin|peg|depeg|reserve|deckung|coin.stabil/i, "stablecoin"],
  [/ethereum|smart.contract|defi|decentral|token|bridge|krypto|crypto|cryptowert|cryptocurrency|bitcoin/i, "cryptoRisk"],
  [/etf|fonds|fund|tracking|indexnachbildung/i, "etf"],
  [/diversif|korrel|portfolio|rebalanc|asset.allocation|streu/i, "portfolio"],
  [/kgv|p\/e|valuation|bewertung|discount|cashflow|terminal|roic|kapitalkosten|marktkapital|buyback|rückkauf|dividendenrendite/i, "valuation"],
  [/aktie|share|equity|dividend|earnings|gewinn je aktie|bilanz|eigenkapital|verwässer|dilution|unternehmen/i, "securities"],
  [/anleihe|bond|duration|renditekurve|yield curve|spread|zinskurve/i, "bonds"],
  [/börse|order|limit|stop|slippage|ausführung|execution|candlestick|kerze|spread|bid|ask|trading|trade|chance.risiko|positionsgröße/i, "trading"],
  [/option|volatilität|volatility|delta|gamma/i, "options"],
  [/hebel|leverage|margin|cfd/i, "leverage"],
  [/inflation|deflation|preisniveau|kaufkraft|realzins|nominalzins|real rate|consumer price|verbraucherpreis/i, "inflation"],
  [/leitzins|policy rate|zentralbank|monetary|geldpolitik|zinsentscheid|rate cut|rate hike/i, "rates"],
  [/bip|gdp|bruttoinlandsprodukt|national accounts|reales wachstum|deflator/i, "gdp"],
  [/arbeitslos|unemployment|erwerbsbevölkerung|labour market|arbeitsmarkt/i, "labour"],
  [/rezession|recession|konjunktur|nachfrage|angebotsschock|stagflation/i, "recession"],
  [/zinseszins|compound interest|sparquote|savings rate|rendite nach|endbetrag|kapital nach|jährlich für|jähriger zins/i, "compound"],
  [/kredit|loan|tilgung|hypothek|mortgage|apr|jahreszins|schuld|debt|kreditkarte|rate.*kredit/i, "credit"],
  [/budget|haushalt|einkommen|ausgaben|notgroschen|emergency fund|liquid|sparen/i, "budget"],
  [/versicherung|insurance|selbstbehalt|haftpflicht/i, "insurance"],
  [/steuer|tax|nachsteuer/i, "tax"],
  [/risiko|risk|var|value at risk|expected shortfall|tail|stress|drawdown|verlust|volatil/i, "risk"],
  [/markt|index|börse|aktienmarkt/i, "markets"],
];

export function sourceForQuestion(categoryId: string, question: string): QuestionSource {
  for (const [pattern, key] of rules) if (pattern.test(question)) return references[key];
  const categoryFallback: Record<string, keyof typeof references> = {
    crypto: "cryptoRisk", stocks: "securities", economy: "monetary", personal: "budget", trading: "trading",
  };
  return references[categoryFallback[categoryId] ?? "markets"];
}
