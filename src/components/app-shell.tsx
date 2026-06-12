"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";

const PUBLIC_ROUTES = new Set(["/", "/home", "/signin", "/signup"]);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = PUBLIC_ROUTES.has(pathname);

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="w-full md:ml-64 min-h-screen bg-obsidian-container">{children}</main>
    </div>
  );
}
