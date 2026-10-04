import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import WorkspaceTabs from "@/components/WorkspaceTabs";
import type { Business } from "@/types/business";

export const dynamic = "force-dynamic";

export default async function BusinessLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single<Business>();

  if (!business) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="mb-4 inline-block text-sm text-slate-500 hover:text-slate-800"
      >
        ← All businesses
      </Link>

      <h1 className="mb-1 text-2xl font-semibold text-slate-900">
        {business.name}
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        {business.description || "No description added yet."}
      </p>

      <WorkspaceTabs businessId={id} />

      {children}
    </main>
  );
}
