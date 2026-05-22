import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "@/lib/listings";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Land buying guides & investment tips | Terraline" },
      { name: "description", content: "Articles on land documents, RERA, investment corridors and buyer checklists." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">Insights</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Land buying, demystified.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Honest guides on documents, RERA, location research and investment timing — written by our in-house land lawyers and advisors.</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {blogPosts.map((p) => (
          <article key={p.slug} className="group rounded-2xl border border-border bg-card p-7 shadow-card transition hover:shadow-elevated">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.tag}</span>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug group-hover:text-primary">
              <Link to="/blog">{p.title}</Link>
            </h2>
            <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
            <p className="mt-5 text-xs text-muted-foreground">{p.read}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
