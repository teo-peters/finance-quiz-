import { useState } from "react";
import Image from "next/image";
import questionImages from "./question-images.json";

type CategoryId = "crypto" | "stocks" | "economy" | "personal" | "trading";
type Difficulty = "beginner" | "intermediate" | "advanced" | "pro";
type Photo = { src: string; alt: string; position: string };
type QuestionPhoto = {
  src: string;
  alt: string;
  source?: string;
  author?: string;
  license?: string;
  licenseUrl?: string;
  generated?: boolean;
  fit?: "cover" | "contain";
};
const questionPhotos = questionImages as Record<string, QuestionPhoto>;

const photos: Record<CategoryId, Photo> = {
  crypto: {
    src: "/images/category-crypto.jpg",
    alt: "Gold Bitcoin coin photographed against a dark background",
    position: "68% 48%",
  },
  stocks: {
    src: "/images/category-stocks.jpg",
    alt: "Stock market candlestick chart on a trading screen",
    position: "52% 48%",
  },
  economy: {
    src: "/images/category-economy.jpg",
    alt: "Illuminated globe showing connections across the world",
    position: "68% 50%",
  },
  personal: {
    src: "/images/category-personal.jpg",
    alt: "Personal budget notebook, calculator, savings goal and euro cash",
    position: "50% 50%",
  },
  trading: {
    src: "/images/category-trading.jpg",
    alt: "Professional trading desk with market charts and price movements",
    position: "50% 42%",
  },
};

function isCategoryId(value: string): value is CategoryId {
  return Object.prototype.hasOwnProperty.call(photos, value);
}

function photoForQuestion(scene: string, category: CategoryId): Photo {
  const key = scene.toLowerCase();

  if (category === "crypto") {
    if (/bitcoin|peer-to-peer|private-key|seed-phrase|wallet|supply-cap|key-signature/.test(key)) return photos.crypto;
    if (/volatility|price-movement|market-chart|trading/.test(key)) return photos.trading;
    if (/stablecoin|blockchain|network|peer-to-peer|consensus|transaction|global/.test(key)) return photos.economy;
  }

  return photos[category];
}

export function LevelArtwork({ level }: { level: Difficulty }) {
  const common = { className: "difficulty-pictogram", viewBox: "0 0 220 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  if (level === "beginner") return <svg {...common}>
    <path d="M48 68c12-8 27-8 39 0v17c-12-8-27-8-39 0V68Zm39 0c12-8 27-8 39 0v17c-12-8-27-8-39 0V68Z" stroke="#a9ee78" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M87 68v17M106 63V43m0 12c-9 0-14-5-14-12 9 0 14 4 14 12Zm0-7c0-9 5-14 14-14 0 9-5 14-14 14Z" stroke="#62d9c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42 90h92" stroke="#45634e" strokeWidth="2" strokeLinecap="round" />
    <circle cx="157" cy="30" r="3" fill="#a9ee78"/><circle cx="174" cy="47" r="2" fill="#62d9c4"/><circle cx="57" cy="36" r="2" fill="#62d9c4"/>
  </svg>;

  if (level === "intermediate") return <svg {...common}>
    <path d="M56 79V58h18v21H56Zm29 0V43h18v36H85Zm29 0V29h18v50h-18Z" stroke="#62d9c4" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="m58 48 24-14 18 5 31-22m-1 0h-12m12 0v12" stroke="#a9ee78" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M49 86h100" stroke="#45634e" strokeWidth="2" strokeLinecap="round" />
    <circle cx="82" cy="34" r="3" fill="#a9ee78"/><circle cx="100" cy="39" r="3" fill="#62d9c4"/><circle cx="131" cy="17" r="3" fill="#a9ee78"/>
  </svg>;

  if (level === "advanced") return <svg {...common}>
    <rect x="49" y="19" width="103" height="65" rx="7" stroke="#62d9c4" strokeWidth="2.5" />
    <path d="M60 68h82M61 58l17-13 15 7 19-20 13 8 15-16" stroke="#45634e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M61 58l17-13 15 7 19-20 13 8 15-16" stroke="#a9ee78" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="140" cy="24" r="3.5" fill="#a9ee78" />
    <circle cx="147" cy="61" r="18" fill="#101a16" stroke="#62d9c4" strokeWidth="2.5" />
    <path d="m160 74 12 12" stroke="#62d9c4" strokeWidth="4" strokeLinecap="round" />
  </svg>;

  return <svg {...common}>
    <path d="m110 14 7 15 17 2-12 11 3 17-15-8-15 8 3-17-12-11 17-2 7-15Z" stroke="#d6ec9d" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="110" cy="55" r="31" stroke="#62d9c4" strokeWidth="2" />
    <path d="M79 55h62M110 24c10 9 15 19 15 31s-5 22-15 31m0-62c-10 9-15 19-15 31s5 22 15 31" stroke="#45634e" strokeWidth="1.7" />
    <path d="M67 41c-9 8-11 22-5 32m96-32c9 8 11 22 5 32" stroke="#a9ee78" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="66" cy="38" r="3" fill="#a9ee78"/><circle cx="154" cy="38" r="3" fill="#a9ee78"/>
  </svg>;
}

export function QuestionArtwork({
  art,
  questionId,
  scene,
  question,
  categoryId,
}: {
  art: string;
  questionId: string;
  scene: string;
  question: string;
  categoryId: string;
}) {
  if (!isCategoryId(categoryId)) throw new Error(`Question illustration is missing a supported category for "${categoryId}"`);
  if (!art || !questionId || !scene) throw new Error("Question illustration is missing its unique question mapping");

  const [imageFailed, setImageFailed] = useState(false);
  const fallbackPhoto = photoForQuestion(scene, categoryId);
  const questionPhoto = questionPhotos[questionId];
  const photo = questionPhoto && !imageFailed ? questionPhoto : fallbackPhoto;

  return (
    <figure className="question-art" data-artwork-id={art} data-question-id={questionId} data-visual-kind={categoryId} data-image-src={photo.src} data-unique-image={questionPhoto && !imageFailed ? "true" : "false"}>
      <div className="question-art-frame" role="img" aria-label={`${photo.alt}. Related to: ${question}`}>
        <Image
          src={photo.src}
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 900px"
          className="question-art-image"
          style={{
            objectPosition: questionPhoto && !imageFailed ? "center" : fallbackPhoto.position,
            objectFit: questionPhoto && !imageFailed ? questionPhoto.fit ?? "cover" : "cover",
          }}
          onError={() => setImageFailed(true)}
        />
      </div>
      {questionPhoto && !imageFailed && <figcaption className="question-art-credit">
        {questionPhoto.generated ? <span>Original AI-generated artwork</span> : <>
          <span>{questionPhoto.author}</span>
          {questionPhoto.source && <a href={questionPhoto.source} target="_blank" rel="noreferrer">Source</a>}
          {questionPhoto.licenseUrl && <a href={questionPhoto.licenseUrl} target="_blank" rel="noreferrer">{questionPhoto.license}</a>}
        </>}
      </figcaption>}
    </figure>
  );
}
