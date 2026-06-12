"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { setSessionCookie } from "@/lib/auth-client";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const supabase = getSupabaseBrowserClient();

    if (supabase) {
      await supabase.auth.signUp({ email, password });
    }

    setSessionCookie();
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f0e8] p-4 text-[#1a1a1a]">
      <main className="w-full max-w-lg border-4 border-[#1a1a1a] bg-white p-8 neo-shadow">
        <h1 className="font-headline text-4xl font-black uppercase">Create Founder Account</h1>
        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <input id="email" name="email" required type="email" placeholder="Work Email" className="w-full border-2 border-[#1a1a1a] p-3 font-body" />
          <input id="password" name="password" required type="password" placeholder="Password" className="w-full border-2 border-[#1a1a1a] p-3 font-body" />
          <input id="org-name" name="org-name" required type="text" placeholder="Organization Name" className="w-full border-2 border-[#1a1a1a] p-3 font-body" />
          <button type="submit" className="w-full border-4 border-[#1a1a1a] bg-[#1a1a1a] p-3 font-label text-sm font-bold uppercase text-white">
            CREATE ACCOUNT
          </button>
        </form>
      </main>
    </div>
  );
}
