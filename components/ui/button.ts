/* Tailwind class sets for the page's pill buttons.
   Variant and size never set the same property, so classes never fight each other.
   Feedback is on press (active), and instant, so taps feel direct on phones. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer no-underline select-none whitespace-nowrap " +
  "transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[.97] active:duration-75 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  red: "border-0 bg-red text-white shadow-[0_10px_24px_-8px_rgba(224,48,52,.65)] hover:bg-red-hover hover:shadow-[0_14px_30px_-8px_rgba(224,48,52,.7)]",
  gold: "border-0 bg-gold text-ink shadow-[0_10px_24px_-8px_rgba(253,207,59,.7)] hover:bg-gold-hover",
  line: "bg-transparent text-crimson border-[1.5px] border-solid border-crimson hover:bg-crimson hover:text-white",
  lineLight: "bg-white/5 text-white border-[1.5px] border-solid border-white/60 hover:bg-white hover:text-crimson-dk",
};

const sizes = {
  md: "px-7 py-3 min-h-[52px] text-[.95rem]",
  lg: "px-9 py-4 min-h-[58px] text-[1.02rem]",
  nav: "px-5 py-2 min-h-[44px] text-[.88rem]",
  panel: "px-[18px] py-[10px] min-h-[44px] text-[.86rem]",
};

export function btn(variant: keyof typeof variants, size: keyof typeof sizes = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}
