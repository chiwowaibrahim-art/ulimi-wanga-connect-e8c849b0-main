import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-stone-900 text-lg">
          <Sprout className="h-6 w-6 text-amber-600" />
          Ulimi Wanga
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-stone-700">
          <a href="#agents" className="hover:text-amber-600">Agents</a>
          <a href="#gallery" className="hover:text-amber-600">Farms</a>
          <a href="#stats" className="hover:text-amber-600">Impact</a>
          <a href="#about" className="hover:text-amber-600">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-amber-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
