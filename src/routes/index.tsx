import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp, CloudRain, BookOpen, Truck, Sprout,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ulimi Wanga — Empowering Malawi's Smallholder Farmers" },
      { name: "description", content: "Agritech platform for smallholder groundnut and maize farmers across Malawi." },
    ],
  }),
  component: Landing,
});

const AGENTS = [
  { icon: TrendingUp, name: "Pricing Agent", desc: "Live MACE prices and market trends for groundnuts and maize, delivered daily." },
  { icon: CloudRain, name: "Weather Alert Agent", desc: "District-level forecasts and planting alerts to protect your harvest." },
  { icon: BookOpen, name: "Financial Literacy Agent", desc: "SMS lessons in Chichewa and English on saving, credit, and crop budgeting." },
  { icon: Truck, name: "Logistics Agent", desc: "Connect with vetted transporters and book pickup from your village." },
];

const FARMS = [
  { img: "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=800", district: "Lilongwe" },
  { img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800", district: "Kasungu" },
  { img: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800", district: "Mchinji" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-white text-stone-900">
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[600px] flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <p className="uppercase tracking-widest text-amber-400 text-sm mb-4">
            Ulimi Wanga · My Farming
          </p>
          <h1 className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
            Empowering Malawi's Smallholder Farmers
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-200">
            Tools, prices, weather, and markets — built in Lilongwe for groundnut and
            maize farmers across all 28 districts.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/register" className="px-6 py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">
              Join as a Farmer
            </Link>
            <Link to="/marketplace" className="px-6 py-3 rounded-lg bg-white text-stone-900 font-medium hover:bg-stone-100">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-medium text-sm uppercase tracking-wide">AI Agents</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Four agents working for you</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((a) => (
            <div key={a.name} className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-amber-400 transition-colors">
              <a.icon className="h-8 w-8 text-amber-600" />
              <h3 className="mt-4 font-semibold text-lg">{a.name}</h3>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">{a.desc}</p>
              <span className="inline-block mt-4 px-2 py-1 text-xs rounded-md bg-amber-50 text-amber-700 font-medium">
                Active
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-amber-600 font-medium text-sm uppercase tracking-wide">From the field</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Farms across Malawi</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FARMS.map((f) => (
            <div key={f.district} className="relative h-80 rounded-2xl overflow-hidden border border-stone-200">
              <img src={f.img} alt={f.district} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {f.district}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="bg-stone-900 text-white">
        <div className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["12,400+", "Registered Farmers"],
            ["28", "Districts Covered"],
            ["MWK 4.2B", "Crop Value Traded"],
            ["98%", "SMS Delivery Rate"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">{n}</div>
              <div className="mt-2 text-stone-300 text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
            alt="Farming in Malawi"
            className="rounded-2xl border border-stone-200 w-full h-[400px] object-cover"
          />
          <div>
            <p className="text-amber-600 font-medium text-sm uppercase tracking-wide">About</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Built in Lilongwe, for Malawi</h2>
            <p className="mt-6 text-stone-600 leading-relaxed">
              Ulimi Wanga is a Lilongwe-based agritech startup serving smallholder farmers
              with the tools they need to thrive. From SMS-based pricing alerts to
              direct-to-buyer marketplaces, we bridge the last-mile gap.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Our team partners with cooperatives, extension officers, and transporters
              across 28 districts to deliver real impact for groundnut and maize growers.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300">
        <div className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Sprout className="h-5 w-5 text-amber-400" />
              Ulimi Wanga
            </div>
            <p className="mt-3 text-stone-400">Empowering Malawi's smallholders.</p>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Product</div>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="hover:text-amber-400">Marketplace</Link></li>
              <li><Link to="/dashboard" className="hover:text-amber-400">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Company</div>
            <ul className="space-y-2">
              <li>Lilongwe, Malawi</li>
              <li>hello@ulimiwanga.mw</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Account</div>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-amber-400">Login</Link></li>
              <li><Link to="/register" className="hover:text-amber-400">Register</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 py-6 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Ulimi Wanga. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
