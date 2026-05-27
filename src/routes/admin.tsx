import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { listings as seed, type Listing, formatPrice } from "@/lib/listings";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — H and H Realty" }] }),
  component: Admin,
});

function Admin() {
  const [rows, setRows] = useState<Listing[]>(seed);

  const markSold = (id: string) =>
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status: "Sold" } : x)));
  const remove = (id: string) => setRows((r) => r.filter((x) => x.id !== id));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-16 md:pt-28 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Admin</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Properties dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo dashboard — connect Lovable Cloud to persist data.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add property
        </button>
      </div>

      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4">
        {[
          { k: "Total properties", v: rows.length },
          { k: "Available", v: rows.filter((r) => r.status === "Available").length },
          { k: "Reserved", v: rows.filter((r) => r.status === "Reserved").length },
          { k: "Sold", v: rows.filter((r) => r.status === "Sold").length },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-xs text-muted-foreground">{s.k}</p>
            <p className="mt-1 font-display text-3xl font-semibold">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3">ID</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-secondary/30">
                <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-5 py-3 font-medium">{r.title}</td>
                <td className="px-5 py-3 text-xs font-medium text-muted-foreground">
                  {r.category}
                </td>
                <td className="px-5 py-3 text-xs">{r.type}</td>
                <td className="px-5 py-3">
                  {r.location}, {r.city}
                </td>
                <td className="px-5 py-3 font-semibold">{formatPrice(r.priceLakh, true)}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      r.status === "Available"
                        ? "bg-success/10 text-success"
                        : r.status === "Reserved"
                          ? "bg-warning/20 text-warning-foreground"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => markSold(r.id)}
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
                      title="Mark sold"
                    >
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
