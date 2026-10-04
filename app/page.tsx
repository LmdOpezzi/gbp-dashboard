import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AddBusinessForm from "@/components/AddBusinessForm";
import type { Business } from "@/types/business";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Businesses
          </h1>
          <p className="text-sm text-slate-500">
            Manage every business profile from one place.
          </p>
        </div>
        <AddBusinessForm />
      </div>

      {error && (
        <p className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          Couldn&apos;t load businesses: {error.message}
        </p>
      )}

      {!error && (!businesses || businesses.length === 0) && (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
          No businesses yet. Click &quot;Add New Business&quot; to get
          started.
        </div>
      )}

      <ul className="space-y-3">
        {(businesses as Business[] | null)?.map((business) => (
          <li key={business.id}>
            <Link
              href={`/business/${business.id}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <div>
                <p className="font-medium text-slate-900">{business.name}</p>
                {business.description && (
                  <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                    {business.description}
                  </p>
                )}
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium capitalize text-emerald-700">
                {business.status}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
