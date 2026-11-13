/* Tailwind class sets for the page's pill buttons.
   Variant and size never set the same property, so classes never fight each other.
   Feedback is on press (active), and instant, so taps feel direct on phones. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold cursor-pointer no-underline select-none whitespace-nowrap " +
  "transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[.97] active:duration-75 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  // main call to action: antique-gold gradient with forest text
  primary:
    "border-0 bg-[linear-gradient(180deg,#E3B54F,#C9962E)] text-forest shadow-[0_10px_24px_-8px_rgba(201,150,46,.75)] hover:shadow-[0_14px_30px_-8px_rgba(201,150,46,.85)] hover:brightness-105",
  // secondary: forest with light-gold text
  forest: "border-0 bg-forest text-gold shadow-[0_10px_24px_-8px_rgba(18,48,31,.5)] hover:bg-forest-2",
  line: "bg-transparent text-forest border-[1.5px] border-solid border-forest hover:bg-forest hover:text-gold",
  lineLight: "bg-white/5 text-white border-[1.5px] border-solid border-white/60 hover:bg-white hover:text-forest-dk",
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
