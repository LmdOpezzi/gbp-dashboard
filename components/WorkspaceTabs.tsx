"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Overview", href: "" },
  { label: "Posts", href: "/posts" },
  { label: "Reviews", href: "/reviews" },
  { label: "Approval Queue", href: "/approval-queue" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export default function WorkspaceTabs({ businessId }: { businessId: string }) {
  const pathname = usePathname();
  const base = `/business/${businessId}`;

  return (
    <div className="mb-6 flex gap-1 overflow-x-auto border-b border-slate-200">
      {TABS.map((tab) => {
        const href = `${base}${tab.href}`;
        const active = pathname === href;
        return (
          <Link
            key={tab.label}
            href={href}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium ${
              active
                ? "border-b-2 border-slate-900 text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
