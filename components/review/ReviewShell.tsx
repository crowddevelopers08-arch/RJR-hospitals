/* Full-screen forest page with one centred card and the RJR logo, shared by the review and feedback pages */
export default function ReviewShell({
  branch,
  wide = false,
  children,
}: {
  branch: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="review flex min-h-screen flex-col items-center justify-center p-4 sm:p-6" style={{ backgroundColor: "var(--r-brand-deep)" }}>
      <div
        className={`mx-auto w-full rounded-[28px] bg-[var(--r-paper)] shadow-[0_40px_80px_-40px_rgba(4,14,9,0.85)] ${
          wide ? "my-6 max-w-[560px] p-5 sm:p-8" : "max-w-[460px] px-5 py-8 sm:px-9 sm:py-10"
        }`}
      >
        <div className="flex justify-center">
          <a href="/" aria-label="RJR Herbal Hospitals" className="flex shrink-0 items-center gap-2.5 no-underline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" width={64} height={64} className="h-14 w-14 rounded-full ring-1 ring-[var(--r-line)] sm:h-16 sm:w-16" />
            <span className="leading-[1.15]">
              <span className="display block text-[1.25rem] font-semibold text-[var(--r-brand-deep)] sm:text-[1.45rem]">RJR Herbal Hospitals</span>
              <span className="block text-[.72rem] font-semibold tracking-[.14em] text-[var(--r-brand)] uppercase">{branch}</span>
            </span>
          </a>
        </div>
        {children}
      </div>
    </main>
  );
}
