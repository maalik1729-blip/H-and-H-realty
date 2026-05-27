import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/language-context";
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
  const { language, t } = useLanguage();

  const blogTranslationsTamil = [
    {
      title: "வழிமுறை வழிகாட்டி: சென்னையில் நிலம் வாங்குவது எப்படி?",
      excerpt: "நிலத்தின் பத்திரங்கள், வரி ரசீதுகள் மற்றும் இதர ஆவணங்களை எவ்வாறு சரிபார்ப்பது என்ற எளிய வழிமுறைகள்.",
      read: "6 நிமிடம் வாசிக்க",
      tag: "வழிகாட்டிகள்"
    },
    {
      title: "அரசு அங்கீகார வழிகாட்டி: உங்கள் மனை 100% சட்டப்பூர்வமானதா?",
      excerpt: "TNRERA, CMDA அல்லது DTCP ஆகியவற்றின் அங்கீகாரத்தை எளிதாக எவ்வாறு சரிபார்ப்பது என்று தெரிந்துகொள்ளுங்கள்.",
      read: "8 நிமிடம் வாசிக்க",
      tag: "சட்டபூர்வமானது"
    },
    {
      title: "சிறந்த முதலீட்டு பகுதிகள்: சென்னையின் நில மதிப்பு எங்கு இரட்டிப்பாகிறது?",
      excerpt: "சென்னையில் அதிக முதலீட்டு லாபம் தரும் அதிவேகமாக வளர்ந்து வரும் பகுதிகள் (OMR, ECR, GST) பற்றிய தொகுப்பு.",
      read: "10 நிமிடம் வாசிக்க",
      tag: "முதலீடு"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-primary pt-20 sm:pt-28 pb-10 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-primary to-primary-dark opacity-95" />
        
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t("blog.badge")}
          </span>
          <h1 className="font-display text-[clamp(2rem,5vw+0.5rem,3.25rem)] font-bold tracking-tight text-white leading-tight">
            {t("blog.title")}
          </h1>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
            {t("blog.desc")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12 sm:px-6 lg:px-8">

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {blogPosts.map((p, idx) => {
          const item = language === "en" ? p : blogTranslationsTamil[idx];
          return (
            <article
              key={p.slug}
              className="group rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-card transition hover:shadow-elevated"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {item.tag}
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-snug group-hover:text-primary">
                <Link to="/blog">{item.title}</Link>
              </h2>
              <p className="mt-3 text-muted-foreground">{item.excerpt}</p>
              <p className="mt-5 text-xs text-muted-foreground">{item.read}</p>
            </article>
          );
        })}
      </div>
      </div>
    </div>
  );
}
