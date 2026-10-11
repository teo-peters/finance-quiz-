"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { categories, type Category, type Question } from "./quiz-data";
import { categoryCopy, copy, englishQuestions, type Language } from "./translations";

const LANGUAGE_STORAGE_KEY = "finance-quiz-language";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [category, setCategory] = useState<Category | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const t = copy[language];
  const sourceQuestion = category?.questions[currentQuestion];
  const question = category && sourceQuestion
    ? language === "en"
      ? { ...englishQuestions[category.id][currentQuestion], answers: [
          ...englishQuestions[category.id][currentQuestion].answers.slice(sourceQuestion.answerRotation),
          ...englishQuestions[category.id][currentQuestion].answers.slice(0, sourceQuestion.answerRotation),
        ] as Question["answers"], correctAnswer: sourceQuestion.correctAnswer }
      : sourceQuestion
    : null;
  const isComplete = Boolean(category && currentQuestion >= category.questions.length);

  useEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage === "en" || storedLanguage === "de") setLanguage(storedLanguage);
    } catch {
      // English remains the default when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "en"
      ? "Finance Quiz — Test your financial knowledge"
      : "Finance Quiz — Teste dein Finanzwissen";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.metaDescription;
  }, [language]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The language still changes for the current visit if storage is unavailable.
    }
  }

  function startQuiz(selected: Category) {
    setCategory(selected); setCurrentQuestion(0); setSelectedAnswer(null); setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function backToCategories() {
    setCategory(null); setCurrentQuestion(0); setSelectedAnswer(null); setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function chooseAnswer(index: number) {
    if (selectedAnswer !== null || !question) return;
    setSelectedAnswer(index);
    if (index === question.correctAnswer) setScore((value) => value + 1);
  }
  function nextQuestion() { setCurrentQuestion((value) => value + 1); setSelectedAnswer(null); }
  function getResultMessage(result: number) {
    if (result === 10) return t.resultPerfect;
    if (result >= 7) return t.resultStrong;
    if (result >= 4) return t.resultStart;
    return t.resultLearn;
  }

  return <main className="site-shell">
    <header className="topbar">
      <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); backToCategories(); }} aria-label={t.homeLabel}>
        <span className="brand-mark" aria-hidden="true">↗</span><span>Finance<span className="brand-accent"> Quiz</span></span>
      </a>
      <nav className="top-nav" aria-label={t.navLabel}>
        <a href="#categories" onClick={(event) => { event.preventDefault(); backToCategories(); }}>{t.navCategories}</a>
        <a className="nav-about" href="#about">{t.navAbout}</a>
        <span className="nav-chip"><span className="status-dot" /> {t.freeToPlay}</span>
        <div className="language-switch" role="group" aria-label={t.languageLabel}>
          <button type="button" className={language === "en" ? "language-option active" : "language-option"} onClick={() => changeLanguage("en")} aria-pressed={language === "en"}>
            <svg className="language-flag" viewBox="0 0 19 10" aria-hidden="true" focusable="false">
              <rect width="19" height="10" fill="#fff" />
              <path fill="#b22234" d="M0 0h19v.77H0zM0 1.54h19v.77H0zM0 3.08h19v.77H0zM0 4.62h19v.77H0zM0 6.16h19v.77H0zM0 7.7h19v.77H0zM0 9.24h19v.76H0z" />
              <rect width="7.6" height="5.38" fill="#3c3b6e" />
              <g fill="#fff"><circle cx=".8" cy=".55" r=".19"/><circle cx="2" cy=".55" r=".19"/><circle cx="3.2" cy=".55" r=".19"/><circle cx="4.4" cy=".55" r=".19"/><circle cx="5.6" cy=".55" r=".19"/><circle cx="6.8" cy=".55" r=".19"/><circle cx="1.4" cy="1.55" r=".19"/><circle cx="2.6" cy="1.55" r=".19"/><circle cx="3.8" cy="1.55" r=".19"/><circle cx="5" cy="1.55" r=".19"/><circle cx="6.2" cy="1.55" r=".19"/><circle cx=".8" cy="2.55" r=".19"/><circle cx="2" cy="2.55" r=".19"/><circle cx="3.2" cy="2.55" r=".19"/><circle cx="4.4" cy="2.55" r=".19"/><circle cx="5.6" cy="2.55" r=".19"/><circle cx="6.8" cy="2.55" r=".19"/><circle cx="1.4" cy="3.55" r=".19"/><circle cx="2.6" cy="3.55" r=".19"/><circle cx="3.8" cy="3.55" r=".19"/><circle cx="5" cy="3.55" r=".19"/><circle cx="6.2" cy="3.55" r=".19"/><circle cx=".8" cy="4.55" r=".19"/><circle cx="2" cy="4.55" r=".19"/><circle cx="3.2" cy="4.55" r=".19"/><circle cx="4.4" cy="4.55" r=".19"/><circle cx="5.6" cy="4.55" r=".19"/><circle cx="6.8" cy="4.55" r=".19"/></g>
            </svg>
            <span>English</span>
          </button>
          <button type="button" className={language === "de" ? "language-option active" : "language-option"} onClick={() => changeLanguage("de")} aria-pressed={language === "de"}>
            <svg className="language-flag" viewBox="0 0 18 11" aria-hidden="true" focusable="false">
              <rect width="18" height="11" fill="#ffce00" />
              <path fill="#000" d="M0 0h18v3.67H0z" />
              <path fill="#dd0000" d="M0 3.67h18v3.66H0z" />
            </svg>
            <span>Deutsch</span>
          </button>
        </div>
      </nav>
    </header>

    <section className="main-content" id="top">
      {!category ? <>
        <div className="hero">
          <div className="eyebrow"><span /> {t.eyebrow}</div>
          <h1>{t.headline}<br /><span>{t.headlineAccent}</span></h1>
          <p className="hero-copy">{t.subtitle}</p>
          <a className="hero-cta" href="#categories">{t.explore} <span>↓</span></a>
          <div className="hero-meta"><span>✦ &nbsp;5 {t.topics.toLowerCase()}</span><span>◷ &nbsp;{t.questionsEach}</span><span>✓ &nbsp;{t.freeToPlay}</span></div>
          <div className="hero-orbit" aria-hidden="true"><span>€</span><i /><i /><i /></div>
        </div>
        <div className="section-heading" id="categories"><div><p className="section-kicker">{t.categoriesKicker}</p><h2>{t.categoriesTitle}</h2></div><span className="category-count">05 {t.topics} <b>·</b> 50 {t.questions}</span></div>
        <div className="category-grid">
          {categories.map((item, index) => {
            const translatedCategory = categoryCopy[item.id][language];
            return <button className={`category-card card-${index + 1}`} key={item.id} onClick={() => startQuiz(item)} aria-label={`${t.startQuiz}: ${translatedCategory.title}`}>
              <div className={`card-art art-${item.id}`} aria-hidden="true"><Image src={`/images/category-${item.id}.jpg`} alt="" fill sizes="(max-width: 480px) 50vw, (max-width: 760px) 50vw, 33vw" className="card-art-image" onError={(event) => { event.currentTarget.style.opacity = "0"; }} /></div>
              <div className="card-top"><span className="category-icon">{item.icon}</span><span className="card-arrow">↗</span></div>
              <div className="card-body"><span className="card-index">0{index + 1} / 05</span><h3>{translatedCategory.title}</h3><p>{translatedCategory.description}</p></div>
              <div className="card-bottom"><span>{item.questions.length} {t.questionCount}</span><span className="start-link">{t.startQuiz} <b>→</b></span></div>
            </button>;
          })}
        </div>
        <section className="bottom-banner" id="about"><span className="banner-icon">✳</span><div><strong>{t.bannerTitle}</strong><p>{t.bannerText}</p></div><span className="banner-stat">50 <small>{t.questions}</small></span></section>
      </> : isComplete ? <section className="quiz-card result-card" aria-live="polite">
        <button className="back-link" onClick={backToCategories}>← {t.backCategories}</button>
        <div className="result-icon">{score >= 7 ? "✦" : "✓"}</div><p className="eyebrow centered-eyebrow">{t.quizComplete} · {categoryCopy[category.id][language].title}</p>
        <h1>{t.wellPlayed}</h1><p className="result-copy">{getResultMessage(score)}</p>
        <div className="score-panel"><span className="score-label">{t.yourResult}</span><strong>{score}<span> / {category.questions.length}</span></strong><div className="score-track" role="progressbar" aria-label={t.score} aria-valuenow={score} aria-valuemin={0} aria-valuemax={category.questions.length}><span style={{ width: `${(score / category.questions.length) * 100}%` }} /></div><span className="score-caption">{Math.round((score / category.questions.length) * 100)}% {t.correctAnswers}</span></div>
        <div className="result-actions"><button className="primary-button" onClick={() => startQuiz(category)}>{t.tryAgain} <span>↻</span></button><button className="secondary-button" onClick={backToCategories}>{t.backCategories}</button></div>
      </section> : question ? <section className="quiz-card" aria-live="polite">
        <div className="quiz-topline"><button className="back-link" onClick={backToCategories}>← {t.categoriesShort}</button><span className="category-pill">{category.icon} &nbsp;{categoryCopy[category.id][language].title}</span></div>
        <div className="question-meta"><span>{t.questionLabel} <strong>{currentQuestion + 1}</strong> {t.of} {category.questions.length}</span><span>{score} {t.correctCount}</span></div>
        <div className="progress-track" role="progressbar" aria-label={`${t.questionLabel} ${currentQuestion + 1} ${t.of} ${category.questions.length}`} aria-valuenow={currentQuestion + 1} aria-valuemin={1} aria-valuemax={category.questions.length}><span style={{ width: `${((currentQuestion + 1) / category.questions.length) * 100}%` }} /></div>
        <div className="question-content"><p className="question-kicker">{t.chooseAnswer}</p><h1>{question.question}</h1>
          <div className="answer-list">{question.answers.map((answer, index) => { const selected = selectedAnswer === index; const correct = index === question.correctAnswer; const state = selectedAnswer === null ? "" : correct ? " answer-correct" : selected ? " answer-incorrect" : ""; return <button className={`answer-option${state}`} key={answer} onClick={() => chooseAnswer(index)} disabled={selectedAnswer !== null} aria-pressed={selected}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span className="answer-text">{answer}</span>{selectedAnswer !== null && correct && <span className="answer-result">✓</span>}{selected && !correct && <span className="answer-result">×</span>}</button>; })}</div>
          {selectedAnswer !== null && <div className={`feedback ${selectedAnswer === question.correctAnswer ? "feedback-correct" : "feedback-incorrect"}`}><strong>{selectedAnswer === question.correctAnswer ? t.correct : t.incorrect}</strong><span>{question.explanation}</span></div>}
          <div className="question-actions">{selectedAnswer === null ? <span className="select-hint">{t.selectHint}</span> : <button className="primary-button next-button" onClick={nextQuestion}>{currentQuestion === category.questions.length - 1 ? t.seeResults : t.nextQuestion}<span>→</span></button>}</div>
        </div><div className="quiz-footer"><span>{t.learnAsYouGo}</span><span>{currentQuestion + 1} <i>/</i> {category.questions.length}</span></div>
      </section> : <p role="alert">{t.noQuestions}</p>}
      <footer className="page-footer"><span>FINANCE QUIZ</span><span>{t.footer}</span><span>© 2026</span></footer>
    </section>
  </main>;
}
