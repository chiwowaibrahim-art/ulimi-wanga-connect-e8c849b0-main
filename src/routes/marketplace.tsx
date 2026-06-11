import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, ShoppingCart, Minus, Plus, MapPin, Sprout,
  ArrowUpDown, Calendar, CheckCircle2, Clock, Package,
} from "lucide-react";
import { useMemo, useState } from "react";
import { LISTINGS, type Listing } from "@/lib/listings";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [{ title: "Marketplace — Ulimi Wanga" }] }),
  component: Marketplace,
});

type CropFilter = "All" | "Groundnuts" | "Maize";
type AvailabilityFilter = "All" | "Available Now" | "Harvesting Soon" | "Pre-Order";
type SortOption = "Price: Low to High" | "Price: High to Low" | "Delivery: Soonest" | "Delivery: Latest";

function Marketplace() {
  const [q, setQ] = useState("");
  const [cropFilter, setCropFilter] = useState<CropFilter>("All");
  const [availFilter, setAvailFilter] = useState<AvailabilityFilter>("All");
  const [sort, setSort] = useState<SortOption>("Price: Low to High");
  const count = useCart((s) => s.count());

  const items = useMemo(() => {
    let result = LISTINGS.filter(
      (l) =>
        (cropFilter === "All" || l.crop === cropFilter) &&
        (availFilter === "All" || l.availability === availFilter) &&
        (l.name.toLowerCase().includes(q.toLowerCase()) ||
          l.district.toLowerCase().includes(q.toLowerCase())),
    );

    switch (sort) {
      case "Price: Low to High":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "Delivery: Soonest":
        result = result.sort((a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime());
        break;
      case "Delivery: Latest":
        result = result.sort((a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime());
        break;
    }

    return result;
  }, [q, cropFilter, availFilter, sort]);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-stone-900">
            <Sprout className="h-6 w-6 text-amber-600" />
            Ulimi Wanga
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/dashboard" className="text-stone-700 hover:text-amber-700">Dashboard</Link>
            <Link to="/checkout" className="relative">
              <ShoppingCart className="h-5 w-5 text-stone-700" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Marketplace</h1>
        <p className="text-stone-600 mt-2">Buy direct from smallholder farmers across Malawi.</p>

        {/* Search & Sort Row */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search crops or districts…"
              className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="pl-10 pr-8 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400 text-sm text-stone-700 appearance-none cursor-pointer"
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Delivery: Soonest</option>
              <option>Delivery: Latest</option>
            </select>
          </div>
        </div>

        {/* Crop Filter */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="text-sm text-stone-500 self-center mr-1">Crop:</span>
          {(["All", "Groundnuts", "Maize"] as CropFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setCropFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                cropFilter === f
                  ? "bg-amber-50 text-amber-700 border-amber-400"
                  : "bg-white text-stone-700 border-stone-200 hover:border-amber-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Availability Filter */}
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="text-sm text-stone-500 self-center mr-1">Availability:</span>
          {(["All", "Available Now", "Harvesting Soon", "Pre-Order"] as AvailabilityFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setAvailFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                availFilter === f
                  ? "bg-amber-50 text-amber-700 border-amber-400"
                  : "bg-white text-stone-700 border-stone-200 hover:border-amber-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
        {items.length === 0 && (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center mt-10">
            <p className="text-stone-600">No listings match your filters.</p>
            <button
              onClick={() => { setQ(""); setCropFilter("All"); setAvailFilter("All"); }}
              className="mt-4 text-amber-700 hover:underline text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function AvailabilityBadge({ availability }: { availability: Listing["availability"] }) {
  if (availability === "Available Now") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium">
        <CheckCircle2 className="h-3 w-3" />
        Available Now
      </span>
    );
  }
  if (availability === "Harvesting Soon") {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700 font-medium">
        <Clock className="h-3 w-3" />
        Harvesting Soon
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-stone-100 text-stone-600 font-medium">
      <Package className="h-3 w-3" />
      Pre-Order
    </span>
  );
}

function ListingCard({ listing }: { listing: typeof LISTINGS[number] }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden hover:border-amber-400 transition-colors">
      <img src={listing.image} alt={listing.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700 font-medium">
            {listing.crop}
          </span>
          <AvailabilityBadge availability={listing.availability} />
        </div>
        <h3 className="mt-3 font-semibold text-lg">{listing.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-sm text-stone-600">
          <MapPin className="h-3.5 w-3.5" />
          {listing.seller} · {listing.district}
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-stone-500">
          <Calendar className="h-3.5 w-3.5" />
          Delivery by {fmtDate(listing.deliveryDate)}
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-bold">MWK {listing.price.toLocaleString()}</span>
            <span className="text-stone-500 text-sm">/kg</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center border border-stone-200 rounded-lg">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-2 hover:bg-stone-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 text-sm font-medium w-10 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="p-2 hover:bg-stone-50">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => add({
              id: listing.id, name: listing.name, seller: listing.seller,
              district: listing.district, price: listing.price, image: listing.image,
            }, qty)}
            className="flex-1 py-2 rounded-lg bg-amber-500 text-white font-medium text-sm hover:bg-amber-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
