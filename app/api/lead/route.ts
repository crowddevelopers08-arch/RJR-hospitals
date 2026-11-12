import { BR, CONCERNS } from "@/lib/data";
import { istNow, postToSheet } from "@/lib/sheets";
import { normalizeIndianPhone, sendToTeleCRM } from "@/lib/telecrm";

// Booking form (hero + pop-up) → in parallel:
//  - Google Apps Script web app (google-apps-script/Code.gs) → "RJR LP Leads" tab
//  - TeleCRM (Lead Request Type "consultation")
// The visitor sees success if at least one of the two saved the lead.

const SOURCE = "RJR Herbal Hospitals LP";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (body.company) return Response.json({ success: true }); // honeypot: pretend success, store nothing

  const name = clip(body.name, 100);
  const phone = normalizeIndianPhone(body.phone);
  const branch = BR.find((b) => b.n === body.branch);
  const concernOpt = CONCERNS.find((c) => c.v && c.v === body.concern);
  const lang = body.lang === "ta" ? "Tamil" : "English";
  const pageUrl = clip(body.pageUrl, 300);
  const utm = Object.fromEntries(UTM_KEYS.map((k) => [k, clip(body[k], 150)])) as Record<(typeof UTM_KEYS)[number], string>;

  if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || !branch) {
    return Response.json({ error: "Please enter your name, a valid 10-digit mobile number and branch." }, { status: 400 });
  }

  // concern is optional on the form: blank → "Not specified"
  const concern = concernOpt ? concernOpt.en : "Not specified";
  const city = branch.n.split(" - ")[0];
  const utmNote = UTM_KEYS.filter((k) => utm[k]).map((k) => `${k}=${utm[k]}`).join(", ");

  const [sheet, crm] = await Promise.allSettled([
    postToSheet({
      action: "lead",
      timestamp: istNow(),
      name,
      phone: `+91${phone}`,
      branch: branch.n,
      concern,
      language: lang,
      ...utm,
      pageUrl,
    }),
    sendToTeleCRM({
      name,
      phone,
      city,
      message: `Consultation enquiry - ${concern} at RJR Herbal Hospital, ${branch.n}`,
      requestType: "consultation",
      pageName: "rjr-herbal-hospitals-lp",
      notes: [
        `Lead Source: ${SOURCE}`,
        `Live URL: ${pageUrl || "Not provided"}`,
        `Branch: ${branch.n}`,
        `Concern: ${concern}`,
        `Language: ${lang}`,
        `UTM: ${utmNote || "None"}`,
      ],
    }),
  ]);

  if (sheet.status === "rejected") console.error("[Google Sheets - Lead]", sheet.reason);
  if (crm.status === "rejected") console.error("[TeleCRM - Lead]", crm.reason);

  if (sheet.status === "rejected" && crm.status === "rejected") {
    return Response.json({ error: "Could not submit right now. Please call us directly." }, { status: 502 });
  }
  return Response.json({
    success: true,
    sheet: sheet.status === "fulfilled" ? "ok" : "failed",
    crm: crm.status === "fulfilled" ? "ok" : "failed",
  });
}
