import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Phone, Lock, Sprout } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Ulimi Wanga" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(phone);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 font-bold text-stone-900">
          <Sprout className="h-6 w-6 text-amber-600" />
          Ulimi Wanga
        </Link>
        <form
          onSubmit={submit}
          className="rounded-2xl border border-stone-200 bg-white p-8"
        >
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-stone-600 text-sm mt-1">Login to access your dashboard.</p>

          <div className="mt-6 space-y-4">
            <Field icon={Phone} placeholder="Phone (e.g. +265 999 123 456)" value={phone} onChange={setPhone} />
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
          >
            Login
          </button>

          <p className="mt-6 text-sm text-center text-stone-600">
            No account?{" "}
            <Link to="/register" className="text-amber-700 hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
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
