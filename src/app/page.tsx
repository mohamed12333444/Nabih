import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="grid min-h-[92vh] content-between px-6 py-8 md:px-12">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">Nabih</Link>
          <Button asChild variant="secondary"><Link href="/login">Sign in</Link></Button>
        </nav>
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-primary">Arabic-first AI reminders</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-normal md:text-7xl">Nabih</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Record Egyptian Arabic voice notes, extract intent with provider-agnostic AI, and turn them into structured tasks and reminders.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link href="/signup">Start building</Link></Button>
              <Button asChild variant="ghost"><Link href="/dashboard">Open dashboard</Link></Button>
            </div>
          </div>
          <div className="grid gap-3">
            {[
              { label: "Voice", title: "Voice intake", body: "Live browser recording with Groq Whisper-ready API boundaries." },
              { label: "AI", title: "AI extraction", body: "OpenRouter, OpenAI, and Gemini behind one provider interface." },
              { label: "Secure", title: "Secure by default", body: "Protected routes, typed DTOs, validation, and rate limits." }
            ].map((item) => (
              <article key={item.title} className="rounded-md border bg-card p-5">
                <p className="text-xs font-semibold uppercase text-primary">{item.label}</p>
                <h2 className="mt-4 font-medium">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-3 border-t pt-4 text-xs text-muted-foreground md:grid-cols-3">
          <span>Supabase PostgreSQL</span><span>Next.js 15 App Router</span><span>Vercel-ready cloud development</span>
        </div>
      </section>
    </main>
  );
}
