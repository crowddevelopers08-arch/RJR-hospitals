"use client";

import { useState } from "react";
import { POSITIVE_MIN } from "@/lib/reviews";
import { track } from "@/lib/track";
import { FACES, Star } from "./icons";

/* Five-star rating. 4-5 stars → the branch's Google review page; 1-3 → the branch's private feedback form.
   The face above the stars follows the hovered / chosen rating. */
export default function ReviewRating({ branch, googleUrl, feedbackPath }: { branch: string; googleUrl: string; feedbackPath: string }) {
  const [hover, setHover] = useState(0);
  const [chosen, setChosen] = useState(0);
  const shown = chosen || hover;
  const Face = FACES[shown];

  const choose = (n: number) => {
    if (chosen) return;
    setChosen(n);
    const positive = n >= POSITIVE_MIN;
    track("review_rating", { rating: n, branch, destination: positive ? "google" : "feedback" });
    setTimeout(() => {
      location.href = positive ? googleUrl : `${feedbackPath}?rating=${n}`;
    }, 450);
  };

  return (
    <div className="mt-7 flex flex-col items-center">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[22px] border border-[var(--r-line)] bg-[var(--r-canvas)] sm:h-20 sm:w-20">
        <span key={shown} aria-hidden="true" className="r-scale-in text-[var(--r-brand)]">
          <Face className="h-9 w-9 sm:h-10 sm:w-10" strokeWidth={1.75} />
        </span>
      </div>

      <h1 className="mt-6 text-center text-[clamp(1.65rem,5.6vw,2.1rem)] leading-tight text-[var(--r-brand-deep)]">How was your experience?</h1>
      <p className="mx-auto mt-2.5 max-w-[34ch] text-center text-[0.92rem] leading-relaxed text-[var(--r-muted)] sm:text-[0.98rem]">
        Please rate your visit. Your feedback helps us improve our care.
      </p>

      <div
        role="group"
        aria-label="Rate your experience out of 5"
        className="mt-7 flex items-center justify-center gap-2 sm:gap-2.5"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const on = n <= shown;
          return (
            <button
              key={n}
              type="button"
              disabled={!!chosen}
              aria-label={`${n} star${n === 1 ? "" : "s"}`}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              onClick={() => choose(n)}
              className={`flex h-12 w-12 flex-none cursor-pointer items-center justify-center rounded-2xl border transition-all duration-200 focus-visible:outline-none disabled:cursor-default sm:h-14 sm:w-14 ${
                on
                  ? "-translate-y-0.5 border-[var(--r-star-line)] bg-[var(--r-star-soft)]"
                  : "border-[var(--r-line)] bg-[var(--r-canvas)] hover:border-[var(--r-star-line)]"
              }`}
            >
              <Star
                className={`h-5 w-5 transition-colors duration-200 sm:h-6 sm:w-6 ${
                  on ? "fill-[var(--r-star)] text-[var(--r-star)]" : "fill-[var(--r-line)] text-[var(--r-line)]"
                }`}
              />
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 min-h-[1.1rem] text-center text-[0.72rem] font-bold tracking-[0.14em] text-[var(--r-brand-deep)] uppercase">
        {chosen ? (chosen >= POSITIVE_MIN ? "Thank you — taking you to Google" : "Thank you — one more step") : "Select your rating"}
      </p>
    </div>
  );
}
