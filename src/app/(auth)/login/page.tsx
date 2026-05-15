import Link from "next/link";

import { loginAction } from "../actions";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <section className="w-full max-w-md rounded-md border bg-card p-6">
        <Link href="/" className="text-xl font-semibold">Nabih</Link>
        <h1 className="mt-8 text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Access your voice reminders workspace.</p>
        <form action={loginAction} className="mt-6 grid gap-4">
          <input className="h-10 rounded-md border px-3 text-sm" name="email" type="email" placeholder="Email" autoComplete="email" required />
          <input className="h-10 rounded-md border px-3 text-sm" name="password" type="password" placeholder="Password" autoComplete="current-password" required />
          {params?.error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{params.error}</p> : null}
          <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">Sign in</button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          New here? <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">Create account</Link>
        </p>
      </section>
    </main>
  );
}
