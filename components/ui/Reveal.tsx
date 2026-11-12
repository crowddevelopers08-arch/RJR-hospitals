"use client";

import { motion, useReducedMotion } from "motion/react";

/* Fades and lifts its content in once, the first time it scrolls into view.
   Used sparingly (the consultation timeline), not on every section.
   With reduced motion the content is simply shown. */
export default function Reveal({
  as = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: "div" | "article" | "li";
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      /* same start state on server and client (avoids a hydration mismatch);
         reduced motion just makes the reveal instant */
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
