import React from "react";
import { Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-[#39FF14]" />
          <span className="text-white font-bold">Celeiro Digital</span>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Celeiro Digital — Porto Firme, MG. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}