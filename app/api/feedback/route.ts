import { istNow, postToSheet } from "@/lib/sheets";
import { normalizeIndianPhone } from "@/lib/telecrm";
import { reviewBranch } from "@/lib/reviews";

// Branch feedback form (/client-feedback-<branch>) → Google Apps Script web app (google-apps-script/Code.gs)
// → that branch's own tab, "Feedback - <Branch>".

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.company) return Response.json({ success: true }); // honeypot: pretend success, store nothing

  const branch = reviewBranch(clip(body.branch, 60).toLowerCase());
  const name = clip(body.name, 100);
  const email = clip(body.email, 150);
  const phone = normalizeIndianPhone(body.phone);
  const suggestions = clip(body.suggestions, 3000);
  const r = Number(body.rating);
  const rating = Number.isInteger(r) && r >= 1 && r <= 5 ? r : 0;

  if (!branch) return Response.json({ error: "Unknown branch. Please reopen the review link." }, { status: 400 });
  if (name.length < 2) return Response.json({ error: "Please enter your full name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!/^[6-9]\d{9}$/.test(phone)) return Response.json({ error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
  if (suggestions.length < 2) return Response.json({ error: "Please tell us what we could have done better." }, { status: 400 });

  try {
    await postToSheet({
      action: "feedback",
      timestamp: istNow(),
      branch: branch.name,
      rating,
      name,
      email,
      phone: `+91${phone}`,
      suggestions,
      pageUrl: clip(body.pageUrl, 300),
    });
  } catch (err) {
    console.error("[Google Sheets - Feedback]", err);
    return Response.json({ error: "We couldn't submit that. Please try again." }, { status: 502 });
  }
  return Response.json({ success: true });
}
