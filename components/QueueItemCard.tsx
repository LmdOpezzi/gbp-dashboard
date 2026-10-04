"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export type QueueItem = {
  id: string;
  type: string;
  content: string;
  status: string;
  created_at: string;
};

export default function QueueItemCard({ item }: { item: QueueItem }) {
  const [loading, setLoading] = useState<"approve" | "deny" | null>(null);
  const router = useRouter();

  async function setStatus(status: "approved" | "denied") {
    setLoading(status === "approved" ? "approve" : "deny");
    const supabase = createClient();
    await supabase.from("content_items").update({ status }).eq("id", item.id);
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-600">
          {item.type.replace("_", " ")}
        </span>
        <span className="text-xs text-slate-400">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      </div>

      <p className="mb-4 whitespace-pre-wrap text-sm text-slate-800">
        {item.content}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setStatus("approved")}
          disabled={loading !== null}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {loading === "approve" ? "Approving..." : "Approve"}
        </button>
        <button
          onClick={() => setStatus("denied")}
          disabled={loading !== null}
          className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
        >
          {loading === "deny" ? "Denying..." : "Deny"}
        </button>
      </div>
    </div>
  );
}
