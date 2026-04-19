import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import remediesData from "@/data/remedies.json";
import type { Remedy } from "@/types/remedy";
import { slugify } from "@/lib/slugify";
import ShareButton from "@/components/ShareButton";

const remedies = (remediesData as Remedy[]).map((r, i) => ({ ...r, id: i }));

export function generateStaticParams() {
  return remedies.map((r) => ({ slug: slugify(r.remede) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const remedy = remedies.find((r) => slugify(r.remede) === slug);
  if (!remedy) return {};
  return {
    title: `${remedy.remede} — Le Médecin des Pauvres`,
    description: `Remède pour : ${remedy.symptomes.slice(0, 4).join(", ")}. ${remedy.description.slice(0, 120)}…`,
  };
}

export default async function RemedePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const remedy = remedies.find((r) => slugify(r.remede) === slug);
  if (!remedy) notFound();

  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-amber-900 text-amber-50 px-4 py-6 text-center shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Le Médecin des Pauvres</h1>
        <p className="text-amber-200 text-sm mt-1">Remèdes naturels tirés du livre du Dr Beauvillard (1912)</p>
      </header>

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 text-sm font-medium">
          ← Retour à la recherche
        </Link>

        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold text-amber-900">{remedy.remede}</h2>
            <ShareButton />
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {remedy.symptomes.map((s, i) => (
              <span key={`${i}-${s}`} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>

          <p className="text-stone-700 leading-relaxed mb-4">{remedy.description}</p>

          {remedy.preparation && (
            <div className="border-t border-amber-100 pt-4">
              <p className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2">Préparation</p>
              <p className="text-stone-600 leading-relaxed">{remedy.preparation}</p>
            </div>
          )}

          {remedy.avertissement && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-2">
              <span className="text-red-500 shrink-0">⚠️</span>
              <p className="text-sm text-red-700 leading-relaxed">{remedy.avertissement}</p>
            </div>
          )}

          <p className="text-xs text-stone-400 mt-4 italic">
            Source : Le Médecin des Pauvres, Dr Beauvillard (1912)
          </p>
        </div>
      </div>

      <footer className="text-center text-xs text-stone-400 py-4 border-t border-amber-100 flex flex-col gap-1">
        <div className="flex justify-center gap-4">
          <Link href="/mentions-legales" className="hover:text-amber-700 underline underline-offset-2">Mentions légales</Link>
          <Link href="/cgu" className="hover:text-amber-700 underline underline-offset-2">CGU</Link>
          <Link href="/aide" className="hover:text-amber-700 underline underline-offset-2">Aide</Link>
        </div>
        <p>Basé sur &laquo; Le Médecin des Pauvres &raquo; — Domaine public</p>
      </footer>
    </main>
  );
}
