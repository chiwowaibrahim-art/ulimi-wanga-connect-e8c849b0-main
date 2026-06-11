import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { User, Phone, MapPin, Wheat, Lock, Sprout } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { DISTRICTS } from "@/lib/listings";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Ulimi Wanga" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuth((s) => s.register);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Lilongwe");
  const [crop, setCrop] = useState("Groundnuts");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, phone, district, crop });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 font-bold text-stone-900">
          <Sprout className="h-6 w-6 text-amber-600" />
          Ulimi Wanga
        </Link>
        <form onSubmit={submit} className="rounded-2xl border border-stone-200 bg-white p-8">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-stone-600 text-sm mt-1">Join 12,400+ farmers across Malawi.</p>

          <div className="mt-6 space-y-4">
            <IconInput icon={User} placeholder="Full Name" value={name} onChange={setName} />
            <IconInput icon={Phone} placeholder="Phone Number" value={phone} onChange={setPhone} />
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400"
              >
                {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="relative">
              <Wheat className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400"
              >
                <option>Groundnuts</option>
                <option>Maize</option>
                <option>Both</option>
              </select>
            </div>
            <IconInput icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
          </div>

          <button type="submit" className="mt-6 w-full py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">
            Create Account
          </button>

          <p className="mt-6 text-sm text-center text-stone-600">
            Already a member? <Link to="/login" className="text-amber-700 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function IconInput({
  icon: Icon, type = "text", placeholder, value, onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  type?: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-amber-400"
      />
    </div>
  );
}
