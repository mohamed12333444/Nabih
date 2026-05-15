import Link from "next/link";

import { signupAction } from "../actions";

type SignupPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <section className="w-full max-w-md rounded-md border bg-card p-6">
        <Link href="/" className="text-xl font-semibold">Nabih</Link>
        <h1 className="mt-8 text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start capturing Arabic reminders with live voice recording.</p>
        <form action={signupAction} className="mt-6 grid gap-4">
          <input className="h-10 rounded-md border px-3 text-sm" name="fullName" placeholder="Full name" autoComplete="name" required />
          <input className="h-10 rounded-md border px-3 text-sm" name="email" type="email" placeholder="Email" autoComplete="email" required />
          <input className="h-10 rounded-md border px-3 text-sm" name="password" type="password" placeholder="Password" autoComplete="new-password" minLength={8} required />
          {params?.error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{params.error}</p> : null}
          <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground" type="submit">Create account</button>
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="font-medium text-foreground underline underline-offset-4">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
