import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Sprout, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { DISTRICTS } from "@/lib/listings";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Ulimi Wanga" }] }),
  component: Checkout,
});

function randRef() {
  return Array.from({ length: 8 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");
}

function Checkout() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Lilongwe");
  const [address, setAddress] = useState("");
  const [pickup, setPickup] = useState("");
  const [payment, setPayment] = useState("Mobile Money");
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderRef(randRef());
    clear();
  };

  if (orderRef) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl border border-stone-200 bg-white p-10 text-center">
          <CheckCircle className="h-16 w-16 text-amber-500 mx-auto" />
          <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-stone-600">
            Your order reference is
          </p>
          <div className="mt-3 inline-block px-4 py-2 rounded-lg bg-amber-50 text-amber-700 font-mono font-bold">
            {orderRef}
          </div>
          <p className="mt-6 text-sm text-stone-600">
            You'll receive an SMS with delivery details shortly.
          </p>
          <Link
            to="/marketplace"
            className="mt-8 inline-block px-6 py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
          >
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-50 bg-white/95 border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-stone-900">
            <Sprout className="h-6 w-6 text-amber-600" />
            Ulimi Wanga
          </Link>
          <Link to="/marketplace" className="text-sm text-stone-700 hover:text-amber-700">
            Continue shopping
          </Link>
        </div>
      </header>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Checkout</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
            <p className="text-stone-600">Your cart is empty.</p>
            <Link to="/marketplace" className="mt-4 inline-block text-amber-700 hover:underline">
              Browse marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((i) => (
                  <div key={i.id} className="flex gap-3 items-center">
                    <img src={i.image} className="h-16 w-16 rounded-lg object-cover" alt={i.name} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{i.name}</p>
                      <p className="text-sm text-stone-500">
                        {i.qty} kg · MWK {(i.qty * i.price).toLocaleString()}
                      </p>
                    </div>
                    <button onClick={() => remove(i.id)} className="p-2 text-stone-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-stone-200 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>MWK {total.toLocaleString()}</span>
              </div>
            </div>

            <form onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
              <h2 className="font-semibold text-lg">Delivery & Payment</h2>
              <Input placeholder="Full Name" value={name} onChange={setName} />
              <Input placeholder="Phone" value={phone} onChange={setPhone} />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400"
              >
                {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
              <Input placeholder="Address / Village" value={address} onChange={setAddress} />
              <Input type="date" placeholder="Pickup Date" value={pickup} onChange={setPickup} />

              <div>
                <p className="font-medium text-sm mb-2">Payment Method</p>
                <div className="space-y-2">
                  {["Mobile Money", "Pay on Delivery"].map((p) => (
                    <label
                      key={p}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                        payment === p
                          ? "bg-amber-50 border-amber-400 text-amber-700"
                          : "border-stone-200 hover:border-amber-400"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={payment === p}
                        onChange={() => setPayment(p)}
                        className="accent-amber-500"
                      />
                      <span className="font-medium text-sm">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
              >
                Place Order
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

function Input({
  type = "text", placeholder, value, onChange,
}: { type?: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      type={type}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400"
    />
  );
}
