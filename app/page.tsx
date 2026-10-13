"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { categories, type Category, type Difficulty, type QuestionText } from "./quiz-data";
import { levelQuestions } from "./level-data";
import { categoryCopy, copy, difficultyCopy, englishQuestions, type Language } from "./translations";
import { LevelArtwork, QuestionArtwork } from "./question-art";

const LANGUAGE_STORAGE_KEY = "finance-quiz-language";
const levels: Difficulty[] = ["beginner", "intermediate", "advanced", "pro"];
const answerRotation = (seed: string) => Array.from(seed).reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 0) % 4;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [category, setCategory] = useState<Category | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const t = copy[language];
  const questionCount = category && difficulty
    ? difficulty === "beginner"
      ? category.questions.length
      : levelQuestions[category.id]?.[difficulty]?.length ?? 0
    : 0;
  const question: (QuestionText & { id: string; correctAnswer: number; art: string; scene: string }) | null = (() => {
    if (!category || !difficulty) return null;
    if (difficulty === "beginner") {
      const beginnerQuestion = category.questions[currentQuestion];
      if (!beginnerQuestion) return null;
      if (language === "de") return beginnerQuestion;
      const english = englishQuestions[category.id]?.[currentQuestion];
      if (!english) return null;
      return {
        ...english,
        id: beginnerQuestion.id,
        answers: [
          ...english.answers.slice(beginnerQuestion.answerRotation),
          ...english.answers.slice(0, beginnerQuestion.answerRotation),
        ] as QuestionText["answers"],
        correctAnswer: beginnerQuestion.correctAnswer,
        art: beginnerQuestion.art,
        scene: beginnerQuestion.scene,
      };
    }
    const sourceQuestion = levelQuestions[category.id]?.[difficulty]?.[currentQuestion];
    if (!sourceQuestion) return null;
    const localized = sourceQuestion[language];
    const shift = answerRotation(sourceQuestion.de.question);
    return {
      ...localized,
      id: sourceQuestion.id,
      answers: [...localized.answers.slice(shift), ...localized.answers.slice(0, shift)] as QuestionText["answers"],
      correctAnswer: (sourceQuestion.correctAnswer + localized.answers.length - shift) % localized.answers.length,
      art: sourceQuestion.art,
      scene: sourceQuestion.scene,
    };
  })();
  const isComplete = Boolean(category && difficulty && currentQuestion >= questionCount);

  useEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (storedLanguage === "en" || storedLanguage === "de") setLanguage(storedLanguage);
    } catch {
      // English remains the default when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    function restoreView(event: PopStateEvent) {
      const state = event.state as { financeQuiz?: boolean; categoryId?: string; difficulty?: Difficulty | null } | null;
      const restoredCategory = state?.financeQuiz && state.categoryId
        ? categories.find((item) => item.id === state.categoryId) ?? null
        : null;
      setCategory(restoredCategory);
      setDifficulty(restoredCategory && state?.financeQuiz ? state.difficulty ?? null : null);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setScore(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("popstate", restoreView);
    return () => window.removeEventListener("popstate", restoreView);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "en"
      ? "Finance Quiz — Test your financial knowledge"
      : "Finance Quiz — Teste dein Finanzwissen";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = t.metaDescription;
  }, [language, t.metaDescription]);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The language still changes for the current visit if storage is unavailable.
    }
  }

  function selectCategory(selected: Category) {
    window.history.pushState({ financeQuiz: true, categoryId: selected.id, difficulty: null }, "");
    setCategory(selected);
    setDifficulty(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startQuiz(selectedDifficulty: Difficulty) {
    if (category) window.history.pushState({ financeQuiz: true, categoryId: category.id, difficulty: selectedDifficulty }, "");
    setDifficulty(selectedDifficulty);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToLevels() {
    setDifficulty(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToCategories() {
    setCategory(null);
    setDifficulty(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseAnswer(index: number) {
    if (selectedAnswer !== null || !question) return;
    setSelectedAnswer(index);
    if (index === question.correctAnswer) setScore((value) => value + 1);
  }

  function nextQuestion() {
    setCurrentQuestion((value) => value + 1);
    setSelectedAnswer(null);
  }

  function getResultMessage(result: number) {
    if (result === questionCount) return t.resultPerfect;
    if (result >= 7) return t.resultStrong;
    if (result >= 4) return t.resultStart;
    return t.resultLearn;
  }

  const activeCategoryCopy = category ? categoryCopy[category.id][language] : null;
  const activeDifficultyLabel = difficulty ? t[`level${difficulty[0].toUpperCase()}${difficulty.slice(1)}` as keyof typeof t] : "";

  return <main className="site-shell">
    <header className="topbar">
      <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); backToCategories(); }} aria-label={t.homeLabel}>
        <span className="brand-mark" aria-hidden="true"><span className="brand-coin">$</span><i>✓</i></span><span>Finance<span className="brand-accent"> Quiz</span></span>
      </a>
      <nav className="top-nav" aria-label={t.navLabel}>
        <a href="#categories" onClick={(event) => { event.preventDefault(); backToCategories(); }}>{t.navCategories}</a>
        <a className="nav-about" href="#about" onClick={(event) => { if (category) { event.preventDefault(); backToCategories(); } }}>{t.navAbout}</a>
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
              <rect width="18" height="11" fill="#ffce00" /><path fill="#000" d="M0 0h18v3.67H0z" /><path fill="#dd0000" d="M0 3.67h18v3.66H0z" />
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
          <div className="hero-meta"><span>✦ &nbsp;{categories.length} {t.topics.toLowerCase()}</span><span>◷ &nbsp;{t.allLevels}</span><span>✓ &nbsp;{t.freeToPlay}</span></div>
          <div className="hero-orbit" aria-hidden="true"><span className="hero-token"><b>$</b></span><i /><i /><i /></div>
        </div>
        <div className="section-heading" id="categories"><div><p className="section-kicker">{t.categoriesKicker}</p><h2>{t.categoriesTitle}</h2></div><span className="category-count">{categories.length} {t.topics} <b>·</b> {categories.length * 40} {t.questions}</span></div>
        <div className="category-grid">
          {categories.map((item, index) => {
            const translatedCategory = categoryCopy[item.id][language];
            return <button className={`category-card card-${index + 1}`} key={item.id} onClick={() => selectCategory(item)} aria-label={`${t.chooseLevel}: ${translatedCategory.title}`}>
              <div className={`card-art art-${item.id}`} aria-hidden="true"><Image src={`/images/category-${item.id}.jpg`} alt="" fill sizes="(max-width: 480px) 50vw, (max-width: 760px) 50vw, 33vw" className="card-art-image" onError={(event) => { event.currentTarget.style.opacity = "0"; }} /></div>
              <div className="card-top"><span className="category-icon">{item.icon}</span><span className="card-arrow">↗</span></div>
              <div className="card-body"><span className="card-index">{index + 1} / {categories.length}</span><h3>{translatedCategory.title}</h3><p>{translatedCategory.description}</p></div>
              <div className="card-bottom"><span>{item.questions.length * 4} {t.questionCount}</span><span className="start-link">{t.chooseLevel} <b>→</b></span></div>
            </button>;
          })}
        </div>
        <section className="bottom-banner" id="about"><span className="banner-icon">✳</span><div><strong>{t.bannerTitle}</strong><p>{t.bannerText}</p></div><span className="banner-stat">{categories.length * 40} <small>{t.questions}</small></span></section>
      </> : !difficulty ? <section className="selection-panel">
        <button className="back-link selection-back" onClick={backToCategories}>← {t.backCategories}</button>
        <div className="selection-heading">
          <p className="section-kicker">{t.difficultyKicker} · {activeCategoryCopy?.title}</p>
          <h1>{t.difficultyTitle}</h1>
          <p>{t.difficultyDescription}</p>
        </div>
        <div className="difficulty-grid">
          {levels.map((level, index) => <button key={level} className={`difficulty-card difficulty-${level}`} onClick={() => startQuiz(level)}>
            <span className="difficulty-number">{index + 1}</span>
            <span className="difficulty-art" aria-hidden="true"><LevelArtwork level={level} /></span>
            <span className="difficulty-rank">{t.levelLabel} {index + 1} / 4</span>
            <strong>{t[`level${level[0].toUpperCase()}${level.slice(1)}` as keyof typeof t]}</strong>
            <span className="difficulty-description">{difficultyCopy[level][language].description}</span>
            <span className="difficulty-footer">{t.levelQuestions}<b>→</b></span>
          </button>)}
        </div>
      </section> : isComplete ? <section className="quiz-card result-card" aria-live="polite">
        <button className="back-link" onClick={backToCategories}>← {t.backCategories}</button>
        <div className="result-icon">{score >= 7 ? "✦" : "✓"}</div>
        <p className="eyebrow centered-eyebrow">{t.quizComplete} · {activeCategoryCopy?.title} · {activeDifficultyLabel}</p>
        <h1>{t.wellPlayed}</h1><p className="result-copy">{getResultMessage(score)}</p>
        <div className="score-panel">
          <span className="score-label">{t.yourResult}</span><strong>{score}<span> / {questionCount}</span></strong>
          <div className="score-track" role="progressbar" aria-label={t.score} aria-valuenow={score} aria-valuemin={0} aria-valuemax={questionCount}><span style={{ width: `${(score / questionCount) * 100}%` }} /></div>
          <span className="score-caption">{Math.round((score / questionCount) * 100)}% {t.correctAnswers}</span>
        </div>
        <div className="result-actions">
          <button className="primary-button" onClick={() => startQuiz(difficulty)}>{t.tryAgain} <span>↻</span></button>
          <button className="secondary-button" onClick={backToLevels}>{t.backLevels}</button>
          <button className="secondary-button" onClick={backToCategories}>{t.backCategories}</button>
        </div>
      </section> : question ? <section className="quiz-card" aria-live="polite">
        <div className="quiz-topline">
          <button className="back-link" onClick={backToLevels}>← {t.backLevels}</button>
          <div className="quiz-pills">
            <span className="category-pill">{category.icon} &nbsp;{activeCategoryCopy?.title}</span>
            <span className={`category-pill level-pill level-pill-${difficulty}`}>{activeDifficultyLabel}</span>
          </div>
        </div>
        <div className="question-meta"><span>{t.questionLabel} <strong>{currentQuestion + 1}</strong> {t.of} {questionCount}</span><span>{score} {t.correctCount}</span></div>
        <div className="progress-track" role="progressbar" aria-label={`${t.questionLabel} ${currentQuestion + 1} ${t.of} ${questionCount}`} aria-valuenow={currentQuestion + 1} aria-valuemin={1} aria-valuemax={questionCount}><span style={{ width: `${((currentQuestion + 1) / questionCount) * 100}%` }} /></div>
        <div className="question-content">
          <QuestionArtwork key={question.id} art={question.art} questionId={question.id} scene={question.scene} question={question.question} categoryId={category.id} />
          <p className="question-kicker">{t.chooseAnswer}</p><h1>{question.question}</h1>
          <div className="answer-list">{question.answers.map((answer, index) => { const selected = selectedAnswer === index; const correct = index === question.correctAnswer; const state = selectedAnswer === null ? "" : correct ? " answer-correct" : selected ? " answer-incorrect" : ""; return <button className={`answer-option${state}`} key={answer} onClick={() => chooseAnswer(index)} disabled={selectedAnswer !== null} aria-pressed={selected}><span className="answer-letter">{String.fromCharCode(65 + index)}</span><span className="answer-text">{answer}</span>{selectedAnswer !== null && correct && <span className="answer-result">✓</span>}{selected && !correct && <span className="answer-result">×</span>}</button>; })}</div>
          {selectedAnswer !== null && <div className={`feedback ${selectedAnswer === question.correctAnswer ? "feedback-correct" : "feedback-incorrect"}`}><strong>{selectedAnswer === question.correctAnswer ? t.correct : t.incorrect}</strong><span>{question.explanation}</span></div>}
          <div className="question-actions">{selectedAnswer === null ? <span className="select-hint">{t.selectHint}</span> : <button className="primary-button next-button" onClick={nextQuestion}>{currentQuestion === questionCount - 1 ? t.seeResults : t.nextQuestion}<span>→</span></button>}</div>
        </div>
        <div className="quiz-footer"><span>{t.learnAsYouGo}</span><span>{currentQuestion + 1} <i>/</i> {questionCount}</span></div>
      </section> : <p role="alert">{t.noQuestions}</p>}
      <footer className="page-footer"><span>FINANCE QUIZ</span><span>{t.footer}</span><span>© 2026</span></footer>
    </section>
  </main>;
}
