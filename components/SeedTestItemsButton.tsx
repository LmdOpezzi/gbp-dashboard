"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const SAMPLES = [
  {
    type: "post",
    content:
      "🔧 Winter is here! Make sure your pipes are protected from freezing temperatures. Test Plumbing Co offers free winterization checks for Tulsa homeowners this month. Call us today!",
  },
  {
    type: "review_reply",
    content:
      "Thank you so much for the kind words, Sarah! We're glad our technician could get your water heater fixed quickly. We appreciate your business!",
  },
];

export default function SeedTestItemsButton({
  businessId,
}: {
  businessId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function seed() {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("content_items")
      .insert(SAMPLES.map((s) => ({ ...s, business_id: businessId })));
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={seed}
      disabled={loading}
      className="rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50"
    >
      {loading ? "Adding..." : "+ Add 2 test items (for testing only)"}
    </button>
  );
}
