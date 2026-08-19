"use client";

import Link from "next/link";
import { Trees, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between rounded-full bg-white/90 px-6 py-3.5 shadow-2xl shadow-black/10 backdrop-blur-md border border-slate-100/80">
        
        {/* Logo & Marque */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-600/30 transition-transform group-hover:scale-105">
            <Trees className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            Forest<span className="text-emerald-600">is</span>
          </span>
        </Link>

        {/* Liens de navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="transition hover:text-emerald-600">
            Accueil
          </Link>
          <Link href="/species" className="transition hover:text-emerald-600">
            Espèces
          </Link>
          <Link href="/map" className="transition hover:text-emerald-600">
            Carte
          </Link>
          <Link href="/about" className="transition hover:text-emerald-600">
            À propos
          </Link>
        </nav>

        {/* Actions à droite (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition"
          >
            Connexion
          </Link>
          
          <Link 
            href="/species" 
            className="flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-emerald-800"
          >
            <span>Explorer</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </Link>
        </div>

        {/* Bouton Hamburger (Mobile) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition focus:outline-none"
          aria-label="Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Carte / Panneau de navigation flottant (Mobile) */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 mx-auto max-w-6xl rounded-3xl bg-white/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl border border-slate-100 md:hidden flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Accueil
            </Link>
            <Link 
              href="/species" 
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Espèces
            </Link>
            <Link 
              href="/map" 
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              Carte
            </Link>
            <Link 
              href="/about" 
              onClick={() => setIsOpen(false)}
              className="rounded-2xl px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              À propos
            </Link>
          </nav>

          <hr className="border-slate-100 my-1" />

          <div className="flex flex-col gap-3">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition"
            >
              Connexion
            </Link>
            <Link 
              href="/species" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-900 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-emerald-800"
            >
              <span>Explorer</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}