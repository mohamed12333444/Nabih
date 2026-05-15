import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <section className="w-full max-w-md rounded-md border bg-card p-6">
        <Link href="/" className="text-xl font-semibold">Nabih</Link>
        <h1 className="mt-8 text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access your voice reminders workspace.</p>
        <form className="mt-6 grid gap-4">
          <input className="h-10 rounded-md border px-3 text-sm" name="email" type="email" placeholder="Email" autoComplete="email" required />
          <input className="h-10 rounded-md border px-3 text-sm" name="password" type="password" placeholder="Password" autoComplete="current-password" required />
          <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground" type="button">Sign in</button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          New here? <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">Create account</Link>
        </p>
      </section>
    </main>
  );
}
