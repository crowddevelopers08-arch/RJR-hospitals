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
  { slug: "ambur", name: "Ambur", br: "Ambur", google: "https://g.page/r/CeWVxgDk64UTEBM/review" },
  { slug: "cuddalore", name: "Cuddalore", br: "Cuddalore", google: "https://g.page/r/CWzs6-vWLi3lEBM/review" },
  { slug: "dharmapuri", name: "Dharmapuri", br: "Dharmapuri", google: "https://g.page/r/CXR-LlGRpIGREBM/review" },
  { slug: "dindigul", name: "Dindigul", br: "Dindigul", google: "https://g.page/r/CUk_zKer9HALEBM/review" },
  { slug: "kanchipuram", name: "Kanchipuram", br: "Kanchipuram", google: "https://g.page/r/CcEGQLJoF0_nEBM/review" },
  { slug: "karaikudi", name: "Karaikudi", br: "Karaikudi", google: "https://g.page/r/CQkeaT7Z53_uEBM/review" },
  { slug: "karur", name: "Karur", br: "Karur", google: "https://g.page/r/CVjgSCT-FnpEEBM/review" },
  { slug: "kovilpatti", name: "Kovilpatti", br: "Kovilpatti", google: "https://g.page/r/CcjInhF3m9J7EBM/review" },
  { slug: "krishnagiri", name: "Krishnagiri", br: "Krishnagiri", google: "https://g.page/r/CSRsARP-AcwmEBM/review" },
  { slug: "kumbakonam", name: "Kumbakonam", br: "Kumbakonam", google: "https://g.page/r/CZRTx_I5vEoOEBM/review" },
  { slug: "marthandam", name: "Marthandam", br: "Marthandam", google: "https://g.page/r/CSdl16EI4-t-EBM/review" },
  { slug: "mayiladuthurai", name: "Mayiladuthurai", br: "Mayiladuthurai", google: "https://g.page/r/CXlEvwT2utABEBM/review" },
  { slug: "nagapattinam", name: "Nagapattinam", br: "Nagapattinam", google: "https://g.page/r/CRQbmOzQG0YxEBM/review" },
  { slug: "nagercoil", name: "Nagercoil", br: "Nagercoil", google: "https://g.page/r/CX62_-CrH6-VEBM/review" },
  { slug: "pollachi", name: "Pollachi", br: "Pollachi", google: "https://g.page/r/CQxWoAoKqo1YEBM/review" },
  { slug: "pudukkottai", name: "Pudukkottai", br: "Pudukkottai", google: "https://g.page/r/CcV4rDUCmqwfEBM/review" },
  { slug: "ramanathapuram", name: "Ramanathapuram", br: "Ramanathapuram", google: "https://g.page/r/CdDzFba-AJ8bEBM/review" },
  { slug: "salem", name: "Salem", br: "Salem", google: "https://g.page/r/CQluFwm4_WdREBM/review" },
  { slug: "arumbakkam", name: "Arumbakkam", br: "Chennai - Arumbakkam", google: "https://g.page/r/CejYj8zmDNTSEBM/review" },
  { slug: "coimbatore", name: "Coimbatore", br: "Coimbatore", google: "https://g.page/r/CXZxBZ02yctUEBM/review" },
  { slug: "erode", name: "Erode", br: "Erode", google: "https://g.page/r/CbqDYhCLJrRhEBM/review" },
  { slug: "hosur", name: "Hosur", br: "Hosur", google: "https://g.page/r/CVRtiw6jH-xhEBM/review" },
  { slug: "sivakasi", name: "Sivakasi", br: "Sivakasi", google: "https://g.page/r/CYh5DLha2AAwEBM/review" },
  { slug: "pondicherry", name: "Pondicherry", google: "https://g.page/r/CRF3tVahuiadEBM/review" },
  { slug: "thanjavur", name: "Thanjavur", br: "Thanjavur", google: "https://g.page/r/CRKx1CiNTnHUEBM/review" },
  { slug: "tiruvallur", name: "Tiruvallur", br: "Thiruvallur", google: "https://g.page/r/CRehNEDMqxlJEBM/review" },
  { slug: "t-nagar", name: "T Nagar", br: "Chennai - T. Nagar", google: "https://g.page/r/CW7lcXlsUWfHEBM/review" },
  { slug: "tenkasi", name: "Tenkasi", br: "Tenkasi", google: "https://g.page/r/Ce4Uq8nit6pSEBM/review" },
  { slug: "theni", name: "Theni", br: "Theni", google: "https://g.page/r/Cd38yLD2CCJGEBM/review" },
  { slug: "tirunelveli", name: "Tirunelveli", br: "Tirunelveli", google: "https://g.page/r/Cf98g-q5JYSWEBM/review" },
  { slug: "thiruvannamalai", name: "Thiruvannamalai", br: "Tiruvannamalai", google: "https://g.page/r/CQQ9kSEKOfeiEBM/review" },
  { slug: "trichy", name: "Trichy", br: "Trichy", google: "https://g.page/r/CQDurrn8lVi5EBM/review" },
  { slug: "tiruppur", name: "Tiruppur", br: "Tiruppur", google: "https://g.page/r/Cai4Tfpk619NEBM/review" },
  { slug: "urapakkam", name: "Urapakkam (Kilambakkam)", br: "Chennai - Urapakkam", google: "https://g.page/r/CYxyeZpHHeWaEBM/review" },
  { slug: "vellore", name: "Vellore", br: "Vellore", google: "https://g.page/r/CWIAw2xn3MfTEBM/review" },
  { slug: "villupuram", name: "Villupuram", br: "Villupuram", google: "https://g.page/r/CWCANfbsEVJ7EBM/review" },
  { slug: "virudhachalam", name: "Virudhachalam", br: "Virudhachalam", google: "https://g.page/r/CcVkSN1D21YfEBM/review" },
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
