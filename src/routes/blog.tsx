import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/lib/listings";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Guides — Land buying tutorials & safety tips | H and H Realty" },
      {
        name: "description",
        content: "Simple step-by-step guides on land documents, government approvals, and property buying in Chennai.",
      },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-primary pt-28 pb-12 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-primary to-primary-dark opacity-95" />
        
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Guides & Insights
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
            Free Land Buying Guides
          </h1>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
            Simple, step-by-step legal and safety tutorials written by Chennai real estate lawyers to help you buy plots and homes with 100% confidence.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {blogPosts.map((p) => (
          <article
            key={p.slug}
            className="group rounded-2xl border border-border bg-card p-7 shadow-card transition hover:shadow-elevated"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {p.tag}
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug group-hover:text-primary">
              <Link to="/blog">{p.title}</Link>
            </h2>
            <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
            <p className="mt-5 text-xs text-muted-foreground">{p.read}</p>
          </article>
        ))}
      </div>
      </div>
    </div>
  );
}
