import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RJR Herbal Hospitals",
  description: "How RJR Herbal Hospitals collects, uses and protects the information you share when you book a consultation.",
};

const UPDATED = "12 November 2026";

/* Plain-language policy written from what this page actually collects and where it sends it:
   booking form → Google Sheets + TeleCRM; hashed phone/name → Meta Custom Audience; GTM dataLayer events. */
const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "Who we are",
    body: (
      <p>
        This website is run by RJR Herbal Hospitals, No. 150, Habibulla Road, Near Devar Kalyana Mandabam, T. Nagar, Chennai 600017
        (&quot;RJR&quot;, &quot;we&quot;, &quot;us&quot;). This policy explains what information we collect through this page, why we collect it, and the
        choices you have.
      </p>
    ),
  },
  {
    h: "Information we collect",
    body: (
      <>
        <p>When you book a consultation, we collect the details you type into the form:</p>
        <ul>
          <li>Your name and 10-digit mobile number</li>
          <li>The RJR branch you choose</li>
          <li>The health concern you select (optional)</li>
          <li>Your consent to be contacted by call or WhatsApp</li>
        </ul>
        <p>Along with the form, we automatically record:</p>
        <ul>
          <li>The date and time of your request and the language you used on the page (English or Tamil)</li>
          <li>The address of the page you submitted from, and any campaign codes in the link you followed (such as utm_source, gclid or fbclid), so we know which advertisement or page brought you here</li>
        </ul>
        <p>
          Please do not share detailed medical records or reports through this form. Your doctor will review them with you in person at the
          consultation.
        </p>
      </>
    ),
  },
  {
    h: "How we use your information",
    body: (
      <ul>
        <li>To call you or message you on WhatsApp about the consultation you requested, and to arrange it at your chosen branch</li>
        <li>To follow up on your enquiry if we could not reach you the first time</li>
        <li>To understand which of our pages and advertisements are useful, so we can improve them</li>
        <li>To show relevant RJR advertisements, and to avoid showing booking advertisements to people who have already enquired (see &quot;Advertising&quot; below)</li>
      </ul>
    ),
  },
  {
    h: "Where your information is stored",
    body: (
      <>
        <p>Your booking details are sent securely to two systems used by our team:</p>
        <ul>
          <li>
            <b>A Google Sheet</b> (Google Workspace), which our team uses to track enquiries
          </li>
          <li>
            <b>TeleCRM</b>, the call-management software our branches use to call you back
          </li>
        </ul>
        <p>Access is limited to RJR staff and partners who handle consultation bookings. We do not sell your personal information.</p>
      </>
    ),
  },
  {
    h: "Advertising",
    body: (
      <p>
        We may share your mobile number and name with Meta (Facebook and Instagram) in a scrambled (hashed) form, as part of a &quot;Custom
        Audience&quot;. Meta uses it only to match you to an existing account, so we can measure and tailor our advertisements; the readable
        details are not sent. Our page may also send anonymous events (for example, that the booking form was submitted) to Google Tag
        Manager and the advertising tools connected to it.
      </p>
    ),
  },
  {
    h: "Cookies and browser storage",
    body: (
      <p>
        We save your language choice (English or Tamil) in your browser so the page opens in the same language next time. Analytics and
        advertising tools loaded through Google Tag Manager may set their own cookies. You can clear or block cookies in your browser
        settings at any time.
      </p>
    ),
  },
  {
    h: "Your location",
    body: (
      <p>
        The &quot;Find the branch nearest to me&quot; button asks your browser for your location only when you tap it. Your location is used
        inside your browser to pick the closest branch and is not sent to us or stored.
      </p>
    ),
  },
  {
    h: "How long we keep it",
    body: (
      <p>
        We keep your enquiry only as long as we need it to arrange and follow up on your consultation, to keep proper records, or as required
        by law. After that it is deleted.
      </p>
    ),
  },
  {
    h: "Your choices and rights",
    body: (
      <>
        <p>You can ask us at any time to:</p>
        <ul>
          <li>Tell you what information we hold about you</li>
          <li>Correct or update it</li>
          <li>Delete it, or stop contacting you</li>
          <li>Withdraw the consent you gave on the form</li>
        </ul>
        <p>These rights are in line with India&apos;s Digital Personal Data Protection Act, 2023. To make a request, contact us using the details below.</p>
      </>
    ),
  },
  {
    h: "Medical information",
    body: (
      <p>
        Information on this website is general and is not a substitute for a doctor&apos;s advice. Treatment is advised only after examination by a
        registered practitioner, and individual results vary.
      </p>
    ),
  },
  {
    h: "Changes to this policy",
    body: <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>,
  },
  {
    h: "Contact us",
    body: (
      <p>
        RJR Herbal Hospitals, No. 150, Habibulla Road, Near Devar Kalyana Mandabam, T. Nagar, Chennai 600017
        <br />
        Phone: <a href="tel:+914440064006">044 4006 4006</a> · <a href="tel:+917871111115">+91 78711 11115</a>
        <br />
        Email: <a href="mailto:care@rjrherbalhospitals.com">care@rjrherbalhospitals.com</a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main id="top" className="bg-white">
      <header className="bg-ivory">
        <div className="wrap py-12 min-[860px]:py-16">
          <p className="mt-0 mb-3 text-[1rem] font-semibold text-crimson">Legal</p>
          <h1 className="display m-0 text-[clamp(2rem,4.6vw,3rem)] text-ink">Privacy Policy</h1>
          <p className="mt-3 mb-0 text-muted">Last updated: {UPDATED}</p>
        </div>
      </header>

      <div className="wrap py-10 min-[860px]:py-14">
        <article
          className="max-w-[72ch] text-[1rem] leading-[1.75] text-ink
            [&_a]:font-semibold [&_a]:text-crimson [&_a]:underline [&_a]:underline-offset-2
            [&_h2]:display [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[1.35rem] [&_h2]:text-ink [&>section:first-child_h2]:mt-0
            [&_li]:mb-1.5 [&_p]:my-3 [&_p]:text-[#3a4252] [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-[#3a4252]"
        >
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
