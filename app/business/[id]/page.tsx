import { createClient } from "@/utils/supabase/server";
import type { Business } from "@/types/business";

export const dynamic = "force-dynamic";

export default async function OverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", id)
    .single<Business>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Tone
        </p>
        <p className="mt-1 text-sm text-slate-700">
          {business?.tone || "Not set yet"}
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Target audience
        </p>
        <p className="mt-1 text-sm text-slate-700">
          {business?.target_audience || "Not set yet"}
        </p>
      </div>
    </div>
  );
}
