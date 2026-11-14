import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import FeedbackForm from "@/components/review/FeedbackForm";
import ReviewRating from "@/components/review/ReviewRating";
import ReviewShell from "@/components/review/ReviewShell";
import { FEEDBACK_PREFIX, REVIEW_BRANCHES, REVIEW_PREFIX, reviewBranch, reviewDetails } from "@/lib/reviews";

/* One route serves every branch's two pages:
     /review-<branch>            → star rating
     /client-feedback-<branch>   → private feedback form
   All 74 are pre-rendered at build time. Any other capitalisation (/review-Villupuram) redirects to the lowercase URL. */

type Params = { params: Promise<{ slug: string }> };

function resolve(raw: string) {
  const slug = decodeURIComponent(raw).toLowerCase();
  const kind = slug.startsWith(REVIEW_PREFIX) ? "review" : slug.startsWith(FEEDBACK_PREFIX) ? "feedback" : null;
  if (!kind) return null;
  const branch = reviewBranch(slug.slice(kind === "review" ? REVIEW_PREFIX.length : FEEDBACK_PREFIX.length));
  return branch ? { kind, branch, slug } : null;
}

export function generateStaticParams() {
  return REVIEW_BRANCHES.flatMap((b) => [{ slug: REVIEW_PREFIX + b.slug }, { slug: FEEDBACK_PREFIX + b.slug }]);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const r = resolve((await params).slug);
  if (!r) return {};
  const title = r.kind === "review" ? "Share Your Review" : "Help Us Improve";
  return {
    title: `${title} | RJR Herbal Hospitals, ${r.branch.name}`,
    description: `Rate your visit to RJR Herbal Hospitals, ${r.branch.name}.`,
    // patient-facing utility pages: keep them out of search results
    robots: { index: false, follow: false },
  };
}

export default async function BranchReviewPage({ params }: Params) {
  const raw = (await params).slug;
  const r = resolve(raw);
  if (!r) notFound();
  if (decodeURIComponent(raw) !== r.slug) permanentRedirect(`/${r.slug}`);

  const { branch } = r;
  const d = reviewDetails(branch);
  const reviewPath = `/${REVIEW_PREFIX}${branch.slug}`;
  const feedbackPath = `/${FEEDBACK_PREFIX}${branch.slug}`;

  if (r.kind === "review") {
    return (
      <ReviewShell branch={branch.name}>
        <ReviewRating branch={branch.name} googleUrl={d.googleUrl} feedbackPath={feedbackPath} />
      </ReviewShell>
    );
  }
  return (
    <ReviewShell branch={branch.name} wide>
      <FeedbackForm slug={branch.slug} branch={branch.name} reviewPath={reviewPath} phone={d.phone} phoneDisplay={d.phoneDisplay} />
    </ReviewShell>
  );
}
