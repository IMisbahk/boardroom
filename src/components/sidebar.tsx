"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Database,
  CalendarDays,
  Users,
  Gavel,
  FilePieChart,
  Settings, 
  HelpCircle,
  PlusSquare,
  Upload,
  LineChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Context", icon: Database },
  { href: "/meetings", label: "Meetings", icon: CalendarDays },
  { href: "/team", label: "Team", icon: Users },
  { href: "/decisions", label: "Decisions", icon: Gavel },
  { href: "/reports", label: "Reports", icon: FilePieChart },
  { href: "/uploads", label: "Uploads", icon: Upload },
  { href: "/context", label: "Startup", icon: LineChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r-3 border-graphite bg-obsidian-container text-foreground font-label text-base font-bold uppercase p-4 overflow-y-auto z-50">
      {/* Brand Header */}
      <div className="mb-8">
        <span className="font-headline text-2xl font-black bg-primary text-primary-foreground p-2 block brutal-shadow-amber border-3 border-black">
          BOARDROOM
        </span>
        <span className="text-xs tracking-widest mt-2 block opacity-70 font-mono">
          V.01-AI-NIMBUS
        </span>
      </div>

      {/* Navigation List */}
      <div className="flex flex-col gap-2 flex-grow mt-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 mb-2 transition-all border-3 font-label",
                isActive
                  ? "bg-primary text-primary-foreground border-black brutal-shadow-amber"
                  : "text-foreground hover:bg-obsidian-card hover:border-graphite border-transparent"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto pt-8 border-t-3 border-dashed border-graphite">
        <Link
          href="/meetings?new=1"
          className="w-full bg-primary text-primary-foreground font-headline font-black uppercase p-4 border-3 border-black brutal-shadow-amber brutal-hover brutal-active active:scale-95 transition-transform mb-6 text-lg tracking-tighter flex items-center justify-center gap-2"
        >
          <PlusSquare className="h-5 w-5" />
          <span>New Meeting</span>
        </Link>
        
        <div className="flex flex-col gap-2 opacity-80 font-label">
          <Link 
            href="/settings" 
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all text-sm py-1"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link 
            href="/support" 
            className="flex items-center gap-3 text-foreground hover:text-primary transition-all text-sm py-1"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
