/* Pushes analytics events to the GTM dataLayer, same as the original page */
type DL = Record<string, unknown>[];

export function track(event: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: DL };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...extra });
}
