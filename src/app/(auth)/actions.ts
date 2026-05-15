"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/shared/database/server";

const errorRedirect = (path: string, message: string) => {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected authentication error.";
};

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    errorRedirect("/login", "Email and password are required.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      errorRedirect("/login", error.message);
    }
  } catch (error) {
    errorRedirect("/login", getErrorMessage(error));
  }

  redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) {
    errorRedirect("/signup", "Full name, email, and password are required.");
  }

  if (password.length < 8) {
    errorRedirect("/signup", "Password must be at least 8 characters.");
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      errorRedirect("/signup", error.message);
    }
  } catch (error) {
    errorRedirect("/signup", getErrorMessage(error));
  }

  redirect("/dashboard");
}
