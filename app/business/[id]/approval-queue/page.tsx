import { createClient } from "@/utils/supabase/server";
import QueueItemCard, { type QueueItem } from "@/components/QueueItemCard";
import SeedTestItemsButton from "@/components/SeedTestItemsButton";

export const dynamic = "force-dynamic";

export default async function ApprovalQueuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: items, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("business_id", id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Nothing publishes to Google until it&apos;s approved here.
        </p>
        <SeedTestItemsButton businessId={id} />
      </div>

      {error && (
        <p className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          Couldn&apos;t load queue: {error.message}
        </p>
      )}

      {!error && (!items || items.length === 0) && (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          Nothing waiting for approval right now.
        </div>
      )}

      <div className="space-y-3">
        {(items as QueueItem[] | null)?.map((item) => (
          <QueueItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
