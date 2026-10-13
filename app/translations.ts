import type { Difficulty, Question } from "./quiz-data";

export type Language = "en" | "de";
export type QuestionText = Pick<Question, "question" | "answers" | "explanation">;

export const copy = {
  en: {
    metaDescription: "Choose a category and test your knowledge of crypto, stocks, the economy, personal finance and trading.",
    navLabel: "Main navigation", homeLabel: "Finance Quiz home", languageLabel: "Language", navCategories: "Categories", navAbout: "About", freeToPlay: "Free to play",
    eyebrow: "FINANCIAL LITERACY, MADE INTERACTIVE", headline: "How strong is your", headlineAccent: "financial knowledge?", subtitle: "Choose a category. Test yourself. Level up.",
    explore: "Explore all categories", categoriesKicker: "PICK YOUR CHALLENGE", categoriesTitle: "Explore categories", topics: "TOPICS", questions: "QUESTIONS", questionsEach: "10 questions per level", questionCount: "questions", startQuiz: "Start Quiz",
    difficultyKicker: "MAKE IT YOUR CHALLENGE", difficultyTitle: "Choose your level", difficultyDescription: "Every level has a fresh set of questions, made for the way you want to learn.", levelQuestions: "10 questions", levelBeginner: "Beginner", levelIntermediate: "Intermediate", levelAdvanced: "Advanced", levelPro: "Pro",
    levelBeginnerDescription: "Start with essential terms and clear, everyday concepts.", levelIntermediateDescription: "Connect the ideas and put core knowledge to work.", levelAdvancedDescription: "Explore detailed analysis, calculations and trade-offs.", levelProDescription: "Tackle expert scenarios and nuanced decisions.", levelLabel: "LEVEL", backLevels: "Choose another level", chooseLevel: "Choose level", allLevels: "40 questions across 4 levels",
    bannerTitle: "Small steps. Smarter money decisions.", bannerText: "Build your financial confidence, one question at a time.", footer: "KNOWLEDGE IS YOUR BEST INVESTMENT.",
    quizComplete: "QUIZ COMPLETE", yourResult: "Your result", correctAnswers: "correct answers", correctCount: "correct", questionLabel: "QUESTION", of: "OF", chooseAnswer: "CHOOSE THE CORRECT ANSWER", selectHint: "Select an answer to continue", correct: "Correct!", incorrect: "Not quite.",
    nextQuestion: "Next Question", seeResults: "See Results", tryAgain: "Try Again", backCategories: "Back to Categories", categoriesShort: "Categories", learnAsYouGo: "Take your time. Learn as you go.", wellPlayed: "Well played!", resultPerfect: "Perfect! You know this topic inside out.", resultStrong: "Great result. You have a solid grasp of the basics.", resultStart: "A good start. Keep practising to build your confidence.", resultLearn: "Every journey starts somewhere. Use the explanations to learn as you go.",
    categoryTitle: "Category", score: "Score", noQuestions: "No questions are available in this category.",
  },
  de: {
    metaDescription: "Wähle eine Kategorie und teste dein Wissen zu Kryptowährungen, Aktien, Wirtschaft, persönlichen Finanzen und Trading.",
    navLabel: "Hauptnavigation", homeLabel: "Finance Quiz Startseite", languageLabel: "Sprache", navCategories: "Kategorien", navAbout: "Über uns", freeToPlay: "Kostenlos spielen",
    eyebrow: "FINANZWISSEN, INTERAKTIV ERLEBT", headline: "Wie gut kennst du dich mit", headlineAccent: "Finanzen aus?", subtitle: "Kategorie wählen. Wissen testen. Weiterkommen.",
    explore: "Alle Kategorien ansehen", categoriesKicker: "WÄHLE DEINE HERAUSFORDERUNG", categoriesTitle: "Kategorien entdecken", topics: "THEMEN", questions: "FRAGEN", questionsEach: "10 Fragen pro Level", questionCount: "Fragen", startQuiz: "Quiz starten",
    difficultyKicker: "WÄHLE DEINE HERAUSFORDERUNG", difficultyTitle: "Wähle dein Level", difficultyDescription: "Jedes Level bietet eigene Fragen – passend dazu, wie tief du einsteigen möchtest.", levelQuestions: "10 Fragen", levelBeginner: "Beginner", levelIntermediate: "Intermediate", levelAdvanced: "Advanced", levelPro: "Pro",
    levelBeginnerDescription: "Starte mit wichtigen Begriffen und klaren Grundlagen.", levelIntermediateDescription: "Verknüpfe Zusammenhänge und wende dein Wissen an.", levelAdvancedDescription: "Analysiere anspruchsvolle Konzepte, Zahlen und Abwägungen.", levelProDescription: "Löse Experten-Szenarien und triff fundierte Entscheidungen.", levelLabel: "LEVEL", backLevels: "Anderes Level wählen", chooseLevel: "Level wählen", allLevels: "40 Fragen in 4 Levels",
    bannerTitle: "Kleine Schritte. Bessere Finanzentscheidungen.", bannerText: "Stärke dein Finanzwissen – eine Frage nach der anderen.", footer: "WISSEN IST DEINE BESTE INVESTITION.",
    quizComplete: "QUIZ ABGESCHLOSSEN", yourResult: "Dein Ergebnis", correctAnswers: "richtige Antworten", correctCount: "richtig", questionLabel: "FRAGE", of: "VON", chooseAnswer: "WÄHLE DIE RICHTIGE ANTWORT", selectHint: "Wähle eine Antwort, um fortzufahren", correct: "Richtig!", incorrect: "Nicht ganz.",
    nextQuestion: "Nächste Frage", seeResults: "Ergebnis ansehen", tryAgain: "Noch einmal spielen", backCategories: "Zurück zu den Kategorien", categoriesShort: "Kategorien", learnAsYouGo: "Lass dir Zeit und lerne Schritt für Schritt.", wellPlayed: "Gut gemacht!", resultPerfect: "Perfekt! Du kennst dich mit diesem Thema bestens aus.", resultStrong: "Starkes Ergebnis. Die Grundlagen sitzen bereits gut.", resultStart: "Ein guter Anfang. Mit etwas Übung wächst deine Sicherheit.", resultLearn: "Jede Lernreise beginnt irgendwo. Die Erklärungen helfen dir dabei.",
    categoryTitle: "Kategorie", score: "Punktzahl", noQuestions: "In dieser Kategorie sind keine Fragen verfügbar.",
  },
} satisfies Record<Language, Record<string, string>>;

export const categoryCopy: Record<string, Record<Language, { title: string; description: string }>> = {
  crypto: {
    en: { title: "Crypto Knowledge", description: "Understand Bitcoin, digital currencies and the essentials of staying safe." },
    de: { title: "Krypto-Wissen", description: "Bitcoin, digitale Währungen und sichere Grundlagen verstehen." },
  },
  stocks: {
    en: { title: "Stock Market", description: "Stocks, ETFs, key metrics and how the market works." },
    de: { title: "Aktienmarkt", description: "Aktien, ETFs, Kennzahlen und das Geschehen an der Börse." },
  },
  economy: {
    en: { title: "Economy & Macro", description: "Make sense of inflation, interest rates, growth and central banks." },
    de: { title: "Wirtschaft & Makroökonomie", description: "Inflation, Zinsen, Konjunktur und Zentralbanken verstehen." },
  },
  personal: {
    en: { title: "Personal Finance", description: "Saving, borrowing and making confident everyday money decisions." },
    de: { title: "Persönliche Finanzen", description: "Sparen, Kredite und kluge Entscheidungen im Alltag." },
  },
  trading: {
    en: { title: "Trading & Investing", description: "Orders, charts and disciplined risk management." },
    de: { title: "Trading & Investieren", description: "Orders, Charts und diszipliniertes Risikomanagement." },
  },
};

export const difficultyCopy: Record<Difficulty, Record<Language, { description: string; icon: string }>> = {
  beginner: {
    en: { description: copy.en.levelBeginnerDescription, icon: "✳" },
    de: { description: copy.de.levelBeginnerDescription, icon: "✳" },
  },
  intermediate: {
    en: { description: copy.en.levelIntermediateDescription, icon: "⌁" },
    de: { description: copy.de.levelIntermediateDescription, icon: "⌁" },
  },
  advanced: {
    en: { description: copy.en.levelAdvancedDescription, icon: "◈" },
    de: { description: copy.de.levelAdvancedDescription, icon: "◈" },
  },
  pro: {
    en: { description: copy.en.levelProDescription, icon: "✦" },
    de: { description: copy.de.levelProDescription, icon: "✦" },
  },
};

// English content follows the same question and answer order as the German source.
// The correctAnswer index always comes from the source question, so switching language cannot change scoring.
export const englishQuestions: Record<string, QuestionText[]> = {
  crypto: [
    { question: "Which description best fits Bitcoin?", answers: ["A digital asset and payment network that operates without a central bank", "A share in a technology company", "A government-issued digital currency", "A bank balance guaranteed by a commercial bank"], explanation: "Bitcoin enables digital transfers on an open network that is not operated by a single bank." },
    { question: "What problem is Bitcoin designed to address?", answers: ["Transferring digital value directly between people without needing a central intermediary for every payment", "Keeping the prices of all goods stable", "Making loans that never need to be repaid", "Making every payment anonymous and untraceable"], explanation: "The network is designed for direct digital transfers. Transactions are publicly visible, and the price can fluctuate." },
    { question: "How does Bitcoin fundamentally differ from euros in a bank account?", answers: ["Bitcoin is not issued or managed by a central bank", "Bitcoin always has a stable value", "Euro payments can only be made in cash", "Bitcoin is guaranteed by every commercial bank"], explanation: "The euro is a government-backed currency. Bitcoin follows network rules and is not issued by a central bank." },
    { question: "What is a blockchain?", answers: ["A shared digital ledger that organizes transactions into blocks", "An individual account at a crypto exchange", "A program that keeps prices stable", "A device that prints digital coins"], explanation: "Many computers maintain and check copies of the ledger. New blocks are added to the existing chain." },
    { question: "Why do many cryptocurrency prices fluctuate so much?", answers: ["Supply and demand can change quickly, and the market is often relatively young", "A central bank adjusts the price every day", "The price is legally pegged to the euro", "Cryptocurrencies can only be traded once a month"], explanation: "Sentiment, news, liquidity and demand can move prices sharply, so losses are possible." },
    { question: "What is the difference between a crypto exchange and a wallet?", answers: ["An exchange enables trading; a wallet manages the keys used to access crypto assets", "A wallet guarantees the price; an exchange only stores passwords", "Both must be government-run banks", "An exchange is a private key and a wallet is a share"], explanation: "Exchanges facilitate buying and selling. Wallets manage keys that provide access to assets on a network." },
    { question: "What does a limited supply mean for a cryptocurrency?", answers: ["The protocol sets a maximum number of units that can ever exist", "Its price cannot fall", "One person owns all existing units", "The currency cannot be transferred"], explanation: "A supply limit caps the possible quantity, but says nothing about future prices or returns." },
    { question: "What are stablecoins commonly used for?", answers: ["Crypto assets designed to track a stable reference value, often used for trading or transfers", "Coins whose value is guaranteed to rise", "Digital shares in central banks", "Crypto assets that cannot be transferred"], explanation: "Many stablecoins aim to stay linked to a currency or other reference value, but that stability is not guaranteed." },
    { question: "Which risk should beginners understand before buying crypto?", answers: ["Sharp price falls, scams or losing access to their own keys", "Deposit protection for every token", "Guaranteed refunds for every mistaken transfer", "A law that prevents prices from falling"], explanation: "Crypto assets can lose value quickly and usually are not covered by traditional deposit protection." },
    { question: "Why should private wallet keys be kept secret and secure?", answers: ["Anyone who controls them can usually move the associated crypto assets", "They determine the exchange price", "They replace the public wallet address when receiving funds", "A central bank can always reissue them if they are lost"], explanation: "Private keys authorize transactions. If they are lost or stolen, access to the assets may be lost permanently." },
  ],
  stocks: [
    { question: "What do you acquire when you buy a share?", answers: ["A stake in a company", "A guaranteed interest payment", "A government bond", "Insurance against price falls"], explanation: "A share represents ownership in a company, though its market value can rise or fall." },
    { question: "What is an ETF?", answers: ["An exchange-traded fund that often tracks an index", "A single corporate bond", "A guaranteed savings rate", "An order type with no fees"], explanation: "Many ETFs bundle securities and follow the rules of an index or market." },
    { question: "What is a dividend?", answers: ["A possible payment made to shareholders", "A stock exchange fee", "The face value of each share", "A guaranteed share of revenue"], explanation: "A company may decide to distribute some of its profits or reserves to shareholders." },
    { question: "How is the price-to-earnings ratio (P/E) usually calculated?", answers: ["Share price divided by earnings per share", "Revenue divided by employees", "Dividend divided by inflation", "Equity plus the share price"], explanation: "The P/E ratio compares a share's price with the company's earnings per share." },
    { question: "What does a listed company's market capitalization measure?", answers: ["Its share price multiplied by the number of shares outstanding", "The cash held by the company", "Annual revenue after tax", "All dividends it has ever paid"], explanation: "Market capitalization is the stock market value of a company's equity at the current share price." },
    { question: "What is a stock market index?", answers: ["A measure that summarizes the performance of selected securities", "A single savings account", "A guarantee about the entire market", "A list of all bank accounts"], explanation: "An index tracks a selected group of securities according to a set of rules." },
    { question: "What does it mean when a share is traded on an exchange?", answers: ["Buyers and sellers can submit orders to trade it", "Its price can no longer fall", "The company is owned by the government", "All shareholders earn the same return"], explanation: "An exchange matches buy and sell orders, and prices can change continuously." },
    { question: "What is a public limited company?", answers: ["A company whose share capital is divided into shares", "A fund with no owners", "An authority that sets stock prices", "A bank with a fixed interest rate"], explanation: "Shareholders own stakes in a public limited company through its shares." },
    { question: "What does an accumulating fund do with its income?", answers: ["Reinvests the income within the fund", "Must pay out all income every month", "Cannot hold shares", "Guarantees the original investment"], explanation: "Accumulating funds retain income and reinvest it rather than distributing it to investors." },
    { question: "What does diversification mean when investing in shares?", answers: ["Spreading money across different investments", "Buying only the share with the highest price", "Selling every share each day", "Always taking dividends as cash"], explanation: "Spreading investments can reduce reliance on any one company, but it does not guarantee a profit." },
  ],
  economy: [
    { question: "What does inflation describe?", answers: ["A sustained rise in the general price level", "A fall in the price of one share", "A rise in all wages", "An increase in population"], explanation: "With inflation, money loses purchasing power on average." },
    { question: "What is a policy rate?", answers: ["An interest rate set by a central bank as part of monetary policy", "The rate on every private credit card", "The yield on every government bond", "The legal minimum wage"], explanation: "Policy rates influence money-market conditions and can affect many other interest rates." },
    { question: "What does gross domestic product (GDP) measure?", answers: ["The value of goods and services produced within a country over a period", "The government's total wealth", "The number of listed companies", "The annual savings of all households"], explanation: "GDP summarizes economic production within a country over a given period." },
    { question: "What does the unemployment rate measure?", answers: ["The share of unemployed people in the labour force under a given statistical definition", "The share of all residents with no income", "The number of job openings per company", "The share of part-time workers"], explanation: "The exact calculation depends on the statistical definition being used." },
    { question: "How might a central bank try to slow high inflation?", answers: ["It can raise policy rates", "It can set every price directly", "It can stop every company from producing", "It can abolish taxes for everyone"], explanation: "Higher rates can dampen demand, though the effects take time and are not guaranteed." },
    { question: "What is a recession in common usage?", answers: ["A significant, broad-based decline in economic activity", "A brief fall in one share price", "An increase in exports", "A change in a currency"], explanation: "A technical recession is often described as two quarters of falling real GDP, though definitions vary." },
    { question: "What does purchasing power mean?", answers: ["How many goods and services a given amount of money can buy", "How many shares someone owns", "The level of the policy rate", "A country's tax revenue"], explanation: "Purchasing power describes the real amount of goods and services money can buy." },
    { question: "What is deflation?", answers: ["A sustained fall in the general price level", "Slower execution of a stock trade", "A rising price level", "A higher unemployment rate by itself"], explanation: "With deflation, prices fall on average over an extended period." },
    { question: "Why might central banks lower policy rates?", answers: ["To support borrowing and demand", "To set stock prices by law", "To rule out all inflation", "To collect taxes directly"], explanation: "Lower rates can make financing easier and support economic activity." },
    { question: "What is a nominal interest rate?", answers: ["The stated interest rate before accounting for inflation", "The rate after all taxes are deducted", "An inflation-adjusted rate", "The interest rate on shares"], explanation: "The real interest rate also accounts for inflation; the nominal rate does not." },
  ],
  personal: [
    { question: "What is compound interest?", answers: ["Interest is earned on the original amount and on previously earned interest", "Interest is waived only at the end of the term", "The rate doubles every year", "The government pays the interest"], explanation: "When interest is reinvested, the balance can grow on both the original amount and past interest." },
    { question: "Why can an emergency fund be useful?", answers: ["It can help cover unexpected expenses", "It guarantees a high return", "It replaces every insurance policy", "It prevents all debt"], explanation: "A liquid reserve can help pay unplanned bills without immediately borrowing." },
    { question: "What is a loan's APR (effective annual rate)?", answers: ["A measure of annual borrowing costs that includes certain fees", "The monthly repayment amount", "The rate after inflation", "The maximum loan amount"], explanation: "APR helps compare loans, although it may not capture every cost in every individual case." },
    { question: "What does diversification mean in long-term saving and investing?", answers: ["Spreading investments across different assets or areas", "Putting everything into one share", "Holding only cash in one currency", "Changing investments every day"], explanation: "Broader diversification reduces dependence on individual investments, but does not remove all risk." },
    { question: "Which statement about a household budget is true?", answers: ["It compares income with expenses", "It guarantees a higher salary", "It replaces a bank statement", "It automatically makes debt tax-free"], explanation: "A budget helps you understand cash flow and plan savings goals." },
    { question: "What does principal repayment mean on a loan?", answers: ["Paying back the amount borrowed", "Earning interest on savings", "A fee for a current account", "Cancelling all loan costs"], explanation: "Repayment reduces the amount of the loan that is still outstanding." },
    { question: "Why can paying only the minimum on a credit card be costly?", answers: ["The remaining balance may keep accruing interest for a long time", "It clears the entire debt", "It prevents any further interest", "It is always more than the balance"], explanation: "If only a small amount is repaid, interest may continue to build on the remaining balance." },
    { question: "What is a liquid asset?", answers: ["An asset that can be turned into cash relatively quickly", "An investment with a guaranteed profit", "An asset with no price risk", "An item that can only be sold over a long period"], explanation: "Liquidity describes how easily something can be sold or used without a large loss in value." },
    { question: "What does the savings rate measure?", answers: ["The share of disposable income that is saved", "The return on a stock fund", "The interest on a loan", "The share of taxes in GDP"], explanation: "The savings rate compares the amount saved with disposable income." },
    { question: "What is useful when comparing loans?", answers: ["Comparing APR and repayment terms", "Looking only at the monthly payment", "Reading only the lender's advertisement", "Ignoring the amount borrowed"], explanation: "The term, fees and APR all affect the total cost of borrowing." },
  ],
  trading: [
    { question: "What does a candlestick typically show?", answers: ["The opening, closing, high and low prices for a time period", "Only the day's trading volume", "Next year's dividend", "A guaranteed future price"], explanation: "A candlestick summarizes four price points for a chosen time period." },
    { question: "What does a stop-loss order generally do?", answers: ["It triggers a sell order when a specified price level is reached", "It guarantees a sale at exactly the stop price", "It prevents every loss", "It automatically buys more securities"], explanation: "In fast-moving markets, the execution price can differ from the stop price." },
    { question: "What is a limit order?", answers: ["An order with a maximum purchase price or minimum sale price", "An order to execute immediately at any price", "A guarantee that a trade will execute", "An order with no price specified"], explanation: "A limit order sets price boundaries, but it may not be filled." },
    { question: "What does a trade's risk/reward ratio compare?", answers: ["The planned potential gain with the potential loss", "The number of orders placed each day", "The difference between purchase and sales tax", "The policy rate"], explanation: "It compares a trade's intended upside with the loss defined in advance." },
    { question: "How does leverage affect a position?", answers: ["It magnifies gains and losses relative to the capital invested", "It removes the risk of loss", "It guarantees a particular return", "It always eliminates fees"], explanation: "Leverage amplifies price movements relative to the capital invested in both directions." },
    { question: "What is the spread in trading?", answers: ["The difference between the bid and ask price", "A company's profit", "The gap to its 52-week high", "The annual dividend"], explanation: "The spread is the difference between the highest bid and the lowest ask." },
    { question: "What is slippage?", answers: ["The difference between an expected price and the actual execution price", "A fixed exchange contribution", "A guaranteed stop execution", "Another word for dividend"], explanation: "In fast or illiquid markets, an order may execute at a different price than expected." },
    { question: "What can help manage the risk of a trade?", answers: ["Set the position size and potential loss before entering", "Double the stake after a loss", "Always avoid stop orders", "Focus only on the profit target"], explanation: "Planning position size and a loss limit in advance helps keep risk under control." },
    { question: "What does FOMO mean in trading?", answers: ["Fear of missing out on a price move", "An automatic sell order", "A method of calculating tax", "A type of diversification"], explanation: "FOMO can lead to impulsive decisions driven by fear of missing a move." },
    { question: "Why can a trading journal be useful?", answers: ["It helps you review decisions and results systematically", "It predicts the next price with certainty", "It automatically lowers trading fees", "It replaces risk management"], explanation: "Recording entries, exits and reasoning can help reveal patterns and mistakes." },
  ],
};
