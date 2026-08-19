"use client";

import Link from "next/link";
import { Trees, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020e0a] text-white border-t border-emerald-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Colonne 1 : Logo & Description */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                <Trees className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Forest<span className="text-emerald-400">is</span>
              </span>
            </Link>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Une plateforme moderne et interactive dédiée à l&apos;identification et à la découverte des espèces forestières mondiales.
            </p>
          </div>

          {/* Colonne 2 : Navigation rapide */}
          <div>
            <h3 className="font-semibold text-emerald-300 text-sm tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-100/70">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition">Accueil</Link>
              </li>
              <li>
                <Link href="/species" className="hover:text-emerald-400 transition">Espèces</Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-emerald-400 transition">Carte interactive</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">À propos</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Ressources */}
          <div>
            <h3 className="font-semibold text-emerald-300 text-sm tracking-wider uppercase mb-4">
              Ressources
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-100/70">
              <li>
                <a href="https://www.gbif.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                  Données GBIF
                </a>
              </li>
              <li>
                <span className="text-emerald-100/40">Taxonomie forestière</span>
              </li>
              <li>
                <span className="text-emerald-100/40">API & Données</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Informations */}
          <div>
            <h3 className="font-semibold text-emerald-300 text-sm tracking-wider uppercase mb-4">
              Sécurité & Données
            </h3>
            <p className="text-sm text-emerald-100/70 mb-4">
              Plateforme engagée pour la préservation de la biodiversité et des forêts.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-100/60">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Données botaniques certifiées</span>
            </div>
          </div>

        </div>

        {/* Ligne de séparation & Copyright */}
        <div className="mt-12 pt-8 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/50 gap-4">
          <p>&copy; {new Date().getFullYear()} Forestis. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition">Politique de confidentialité</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition">Conditions d&apos;utilisation</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}