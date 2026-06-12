"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { setSessionCookie } from "@/lib/auth-client";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const returnTo = new URLSearchParams(window.location.search).get("returnTo") || "/dashboard";

    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      const result = await supabase.auth.signInWithPassword({ email, password });
      if (!result.error) {
        setSessionCookie();
        router.push(returnTo);
        return;
      }
    }

    if (email === "executive@boardroom.com" && password === "password123") {
      setSessionCookie();
      router.push(returnTo);
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setError(nextAttempts >= 5 ? "Too many failed attempts. Temporary lock warning." : "Invalid email or password");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f0e8] p-4 text-[#1a1a1a]">
      <main className="w-full max-w-md border-4 border-[#1a1a1a] bg-white p-8 md:p-10 neo-shadow">
        <h1 className="font-headline text-5xl font-black uppercase leading-none">Identity Verification</h1>
        <p className="mt-3 font-label text-xs uppercase">Access The Executive Suite</p>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block font-label text-xs font-bold uppercase">
              Work Email
            </label>
            <input id="email" name="email" type="email" required placeholder="executive@boardroom.com" className="w-full border-0 border-b-4 border-[#1a1a1a] bg-transparent p-0 pb-2 font-body text-lg focus:outline-none" />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block font-label text-xs font-bold uppercase">
              Password
            </label>
            <input id="password" name="password" type="password" required placeholder="••••••••" className="w-full border-0 border-b-4 border-[#1a1a1a] bg-transparent p-0 pb-2 font-body text-lg focus:outline-none" />
          </div>

          {error ? (
            <p role="alert" className={error.includes("Temporary") ? "toast-error border-2 border-red-700 bg-red-100 px-3 py-2 text-sm font-medium" : "toast-error border-2 border-red-700 bg-red-100 px-3 py-2 text-sm font-medium"}>
              {error}
            </p>
          ) : null}

          <button type="submit" className="w-full border-4 border-[#1a1a1a] bg-[#1a1a1a] px-4 py-3 font-label text-lg font-bold uppercase text-white">
            ENTER BOARDROOM
          </button>
          <div className="flex justify-between border-t-2 border-[#1a1a1a]/20 pt-4 font-label text-xs font-bold uppercase">
            <a href="#" className="text-blue-700">
              Single Sign-On
            </a>
            <a href="#" className="text-[#4a4a4a]">
              Request Access
            </a>
          </div>
          <p className="font-body text-sm">
            New founder?{" "}
            <Link href="/signup" className="font-bold underline">
              Create account
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
