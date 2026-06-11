import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, TrendingUp, CloudRain, Truck, BookOpen,
  ShoppingBag, Settings, Sprout, Sun, MessageSquare,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Ulimi Wanga" }] }),
  component: Dashboard,
});

const NAV = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: TrendingUp, label: "Pricing" },
  { icon: CloudRain, label: "Weather" },
  { icon: Truck, label: "Logistics" },
  { icon: BookOpen, label: "Learning" },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Settings, label: "Settings" },
];

type AgentKey = "pricing" | "weather" | "financial" | "logistics";

const AGENTS: { key: AgentKey; icon: any; name: string; desc: string }[] = [
  { key: "pricing", icon: TrendingUp, name: "Pricing Agent", desc: "Live MACE prices, district trends, alerts." },
  { key: "weather", icon: CloudRain, name: "Weather Alert Agent", desc: "5-day forecast and planting advisories." },
  { key: "financial", icon: BookOpen, name: "Financial Literacy Agent", desc: "Daily SMS lessons in Chichewa & English." },
  { key: "logistics", icon: Truck, name: "Logistics Agent", desc: "Book transporters and track pickups." },
];

function Dashboard() {
  const user = useAuth((s) => s.user);
  const [open, setOpen] = useState<AgentKey | null>(null);
  const initials = (user?.name ?? "Farmer")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-stone-200 flex-col">
        <Link to="/" className="flex items-center gap-2 h-16 px-6 border-b border-stone-200 font-bold text-stone-900">
          <Sprout className="h-6 w-6 text-amber-600" />
          Ulimi Wanga
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map((n, i) => (
            <button
              key={n.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-amber-50 text-amber-700"
                  : "text-stone-700 hover:bg-stone-50"
              }`}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-200 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
          <div className="text-sm">
            <div className="font-medium text-stone-900">{user?.name ?? "Guest Farmer"}</div>
            <div className="text-stone-500 text-xs">{user?.district ?? "Lilongwe"}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <div className="py-12 px-6 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Moni, {user?.name ?? "Farmer"}!
          </h1>
          <p className="text-stone-600 mt-2">Here's your farming snapshot for today.</p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat icon={TrendingUp} label="Groundnut Price" value="MWK 920/kg" sub="+3.4% this week" />
            <Stat icon={TrendingUp} label="Maize Price" value="MWK 340/kg" sub="-1.1% this week" />
            <Stat icon={Sun} label="Weather (Lilongwe)" value="28°C · Sunny" sub="Rain in 3 days" />
            <Stat icon={MessageSquare} label="Next SMS Tip" value="Today, 6:00 PM" sub="Topic: Saving for inputs" />
          </div>

          {/* Agents */}
          <h2 className="mt-12 text-xl font-bold">Your Agents</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENTS.map((a) => (
              <div key={a.key} className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-amber-400 transition-colors">
                <a.icon className="h-8 w-8 text-amber-600" />
                <h3 className="mt-4 font-semibold">{a.name}</h3>
                <p className="mt-2 text-sm text-stone-600">{a.desc}</p>
                <button
                  onClick={() => setOpen(a.key)}
                  className="mt-4 text-sm font-medium text-amber-700 hover:underline"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Agent Sheets */}
      <Sheet open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {open && <AgentDetail keyId={open} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub }: {
  icon: any; label: string; value: string; sub: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">{label}</span>
        <Icon className="h-4 w-4 text-amber-600" />
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs text-stone-500">{sub}</div>
    </div>
  );
}

function AgentDetail({ keyId }: { keyId: AgentKey }) {
  if (keyId === "pricing") {
    const rows = [
      ["Mon", "MWK 890", "MWK 320"],
      ["Tue", "MWK 895", "MWK 325"],
      ["Wed", "MWK 905", "MWK 330"],
      ["Thu", "MWK 910", "MWK 335"],
      ["Fri", "MWK 915", "MWK 340"],
      ["Sat", "MWK 920", "MWK 340"],
      ["Sun", "MWK 920", "MWK 345"],
    ];
    return (
      <>
        <SheetHeader>
          <SheetTitle>Pricing Agent</SheetTitle>
          <SheetDescription>7-day MACE price trend</SheetDescription>
        </SheetHeader>
        <table className="mt-6 w-full text-sm">
          <thead className="text-left text-stone-500 border-b border-stone-200">
            <tr><th className="py-2">Day</th><th>Groundnuts</th><th>Maize</th></tr>
          </thead>
          <tbody>
            {rows.map(([d, g, m]) => (
              <tr key={d} className="border-b border-stone-100">
                <td className="py-2 font-medium">{d}</td>
                <td>{g}</td><td>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  if (keyId === "weather") {
    const days = [
      ["Mon", "28°C", "Sunny", "Good for weeding"],
      ["Tue", "29°C", "Sunny", "Apply fertilizer early"],
      ["Wed", "27°C", "Cloudy", "Prep drainage"],
      ["Thu", "24°C", "Rain", "Avoid spraying"],
      ["Fri", "25°C", "Showers", "Monitor seedlings"],
    ];
    return (
      <>
        <SheetHeader>
          <SheetTitle>Weather Alert Agent</SheetTitle>
          <SheetDescription>5-day forecast · Lilongwe district</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          {days.map(([d, t, c, n]) => (
            <div key={d} className="flex items-center gap-4 p-3 rounded-lg border border-stone-200">
              <div className="w-10 font-medium">{d}</div>
              <div className="font-bold text-lg w-16">{t}</div>
              <div className="text-stone-600 w-20">{c}</div>
              <div className="flex-1 text-sm text-amber-700">{n}</div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (keyId === "financial") {
    const tips = [
      { en: "Save 10% of every sale for input costs next season.",
        ch: "Sungani 10% ya zogulitsa zanu kuti mukhale ndi zofunika nyengo yotsatira." },
      { en: "Track your spending each week — even small expenses add up.",
        ch: "Lembani zogula zanu sabata iliyonse — zochepa zimakulira." },
      { en: "Join a VSLA to access low-cost credit during planting.",
        ch: "Lowani VSLA kuti mupeze ngongole yotsika nthawi yobzala." },
    ];
    return (
      <>
        <SheetHeader>
          <SheetTitle>Financial Literacy Agent</SheetTitle>
          <SheetDescription>Last 3 SMS tips</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {tips.map((t, i) => (
            <div key={i} className="rounded-2xl border border-stone-200 p-4">
              <div className="text-xs uppercase tracking-wide text-amber-600 font-medium">English</div>
              <p className="mt-1 text-sm">{t.en}</p>
              <div className="mt-3 text-xs uppercase tracking-wide text-amber-600 font-medium">Chichewa</div>
              <p className="mt-1 text-sm text-stone-700">{t.ch}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  // logistics
  const bookings = [
    ["BK-2841", "Lilongwe → Blantyre", "200 kg", "Delivered"],
    ["BK-2842", "Mchinji → Lilongwe", "150 kg", "In Transit"],
    ["BK-2843", "Kasungu → Lilongwe", "300 kg", "Pending"],
    ["BK-2844", "Dowa → Salima", "120 kg", "Pending"],
  ];
  const badge = (s: string) =>
    s === "Delivered" ? "bg-green-50 text-green-700"
      : s === "In Transit" ? "bg-amber-50 text-amber-700"
      : "bg-stone-100 text-stone-700";
  return (
    <>
      <SheetHeader>
        <SheetTitle>Logistics Agent</SheetTitle>
        <SheetDescription>Recent transporter bookings</SheetDescription>
      </SheetHeader>
      <div className="mt-6 space-y-2">
        {bookings.map(([id, route, qty, status]) => (
          <div key={id} className="flex items-center gap-3 p-3 rounded-lg border border-stone-200">
            <div className="font-mono text-xs text-stone-500 w-20">{id}</div>
            <div className="flex-1 text-sm">
              <div className="font-medium">{route}</div>
              <div className="text-stone-500 text-xs">{qty}</div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-md font-medium ${badge(status)}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
