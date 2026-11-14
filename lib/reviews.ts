import { BR } from "./data";

/* The 37 branches that get their own review + feedback pages:
     /review-<slug>            star rating (4-5 → Google review, 1-3 → feedback form)
     /client-feedback-<slug>   private feedback form → that branch's own tab in the Google Sheet

   `name` must match FEEDBACK_BRANCHES in google-apps-script/Code.gs (it becomes the tab "Feedback - <name>").
   `br` links to the branch in lib/data.ts for its phone number and address (Pondicherry is not listed there yet).
   `google` is the branch's Google "write a review" link (Google Business Profile → Ask for reviews → copy link,
   e.g. https://g.page/r/XXXX/review). Until it is filled in, 4-5 star ratings open the branch's Google Maps listing. */
export type ReviewBranch = { slug: string; name: string; br?: string; google?: string };

export const REVIEW_BRANCHES: ReviewBranch[] = [
  { slug: "ambur", name: "Ambur", br: "Ambur" },
  { slug: "cuddalore", name: "Cuddalore", br: "Cuddalore" },
  { slug: "dharmapuri", name: "Dharmapuri", br: "Dharmapuri" },
  { slug: "dindigul", name: "Dindigul", br: "Dindigul" },
  { slug: "kanchipuram", name: "Kanchipuram", br: "Kanchipuram" },
  { slug: "karaikudi", name: "Karaikudi", br: "Karaikudi" },
  { slug: "karur", name: "Karur", br: "Karur" },
  { slug: "kovilpatti", name: "Kovilpatti", br: "Kovilpatti" },
  { slug: "krishnagiri", name: "Krishnagiri", br: "Krishnagiri" },
  { slug: "kumbakonam", name: "Kumbakonam", br: "Kumbakonam" },
  { slug: "marthandam", name: "Marthandam", br: "Marthandam" },
  { slug: "mayiladuthurai", name: "Mayiladuthurai", br: "Mayiladuthurai" },
  { slug: "nagapattinam", name: "Nagapattinam", br: "Nagapattinam" },
  { slug: "nagercoil", name: "Nagercoil", br: "Nagercoil" },
  { slug: "pollachi", name: "Pollachi", br: "Pollachi" },
  { slug: "pudukkottai", name: "Pudukkottai", br: "Pudukkottai" },
  { slug: "ramanathapuram", name: "Ramanathapuram", br: "Ramanathapuram" },
  { slug: "salem", name: "Salem", br: "Salem" },
  { slug: "arumbakkam", name: "Arumbakkam", br: "Chennai - Arumbakkam" },
  { slug: "coimbatore", name: "Coimbatore", br: "Coimbatore" },
  { slug: "erode", name: "Erode", br: "Erode" },
  { slug: "hosur", name: "Hosur", br: "Hosur" },
  { slug: "sivakasi", name: "Sivakasi", br: "Sivakasi" },
  { slug: "pondicherry", name: "Pondicherry" },
  { slug: "thanjavur", name: "Thanjavur", br: "Thanjavur" },
  { slug: "tiruvallur", name: "Tiruvallur", br: "Thiruvallur" },
  { slug: "t-nagar", name: "T Nagar", br: "Chennai - T. Nagar" },
  { slug: "tenkasi", name: "Tenkasi", br: "Tenkasi" },
  { slug: "theni", name: "Theni", br: "Theni" },
  { slug: "tirunelveli", name: "Tirunelveli", br: "Tirunelveli" },
  { slug: "thiruvannamalai", name: "Thiruvannamalai", br: "Tiruvannamalai" },
  { slug: "trichy", name: "Trichy", br: "Trichy" },
  { slug: "tiruppur", name: "Tiruppur", br: "Tiruppur" },
  { slug: "urapakkam", name: "Urapakkam (Kilambakkam)", br: "Chennai - Urapakkam" },
  { slug: "vellore", name: "Vellore", br: "Vellore" },
  { slug: "villupuram", name: "Villupuram", br: "Villupuram" },
  { slug: "virudhachalam", name: "Virudhachalam", br: "Virudhachalam" },
];

export const REVIEW_PREFIX = "review-";
export const FEEDBACK_PREFIX = "client-feedback-";

const MAIN_PHONE = "+917871111115";

/* Positive ratings (this and above) go to Google; lower ones go to the private feedback form */
export const POSITIVE_MIN = 4;

export const reviewBranch = (slug: string) => REVIEW_BRANCHES.find((b) => b.slug === slug);

/** Phone, address and Google review link for one review branch, ready for the pages. */
export function reviewDetails(rb: ReviewBranch) {
  const b = rb.br ? BR.find((x) => x.n === rb.br) : undefined;
  const phone = b?.p.find((p) => p.startsWith("+91")) || MAIN_PHONE;
  const query = `RJR Herbal Hospital ${b ? b.a : rb.name}`;
  return {
    phone,
    phoneDisplay: `+91 ${phone.slice(3, 8)} ${phone.slice(8)}`,
    googleUrl: rb.google || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
  };
}
