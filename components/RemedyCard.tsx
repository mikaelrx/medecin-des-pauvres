"use client";

import Link from "next/link";
import type { Remedy } from "@/types/remedy";
import { slugify } from "@/lib/slugify";

export default function RemedyCard({ remedy }: { remedy: Remedy }) {
  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-xl font-bold text-amber-900">{remedy.remede}</h3>
        {remedy.pertinence !== undefined && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${
            remedy.pertinence >= 70 ? "bg-green-100 text-green-700" :
            remedy.pertinence >= 55 ? "bg-amber-100 text-amber-700" :
            "bg-stone-100 text-stone-500"
          }`}>
            {remedy.pertinence >= 70 ? "Très pertinent" : remedy.pertinence >= 55 ? "Pertinent" : "Partiel"}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {remedy.symptomes.map((s, i) => (
          <span
            key={`${i}-${s}`}
            className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="text-sm text-stone-700 mb-3 leading-relaxed">{remedy.description}</p>

      {remedy.preparation && (
        <div className="border-t border-amber-100 pt-3">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">
            Préparation
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">{remedy.preparation}</p>
        </div>
      )}

      {remedy.avertissement && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex gap-2">
          <span className="text-red-500 text-sm shrink-0">⚠️</span>
          <p className="text-xs text-red-700 leading-relaxed">{remedy.avertissement}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-stone-400 italic">
          Source : Le Médecin des Pauvres, Dr Beauvillard (1912)
        </p>
        <Link
          href={`/remede/${slugify(remedy.remede)}`}
          className="text-xs text-amber-700 hover:text-amber-500 font-medium underline underline-offset-2 shrink-0"
        >
          Voir & partager →
        </Link>
      </div>
    </div>
  );
}
