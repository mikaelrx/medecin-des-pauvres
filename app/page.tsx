"use client";

import { useState, useCallback, Fragment } from "react";
import { track } from "@vercel/analytics";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import RemedyCard from "@/components/RemedyCard";
import AdBanner from "@/components/AdBanner";
import FilterBar from "@/components/FilterBar";
import type { Remedy } from "@/types/remedy";

type SearchState = "idle" | "loading" | "done";

export default function Home() {
  const [state, setState] = useState<SearchState>("idle");
  const [results, setResults] = useState<Remedy[]>([]);
  const [suggestions, setSuggestions] = useState<Remedy[]>([]);
  const [lastQuery, setLastQuery] = useState("");
  const [categorie, setCategorie] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string, cat?: string | null) => {
    setState("loading");
    setLastQuery(query);
    try {
      const activecat = cat !== undefined ? cat : categorie;
      const url = `/api/search?q=${encodeURIComponent(query)}${activecat ? `&categorie=${encodeURIComponent(activecat)}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results);
      setSuggestions(data.suggestions ?? []);
      track("search", { query, resultCount: data.results.length, categorie: activecat ?? "tous" });
    } catch {
      setResults([]);
      setSuggestions([]);
    } finally {
      setState("done");
    }
  }, [categorie]);

  const handleCategorieChange = useCallback((cat: string | null) => {
    setCategorie(cat);
    if (lastQuery) handleSearch(lastQuery, cat);
  }, [lastQuery, handleSearch]);

  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-amber-900 text-amber-50 px-4 py-6 text-center shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Le Médecin des Pauvres
        </h1>
        <p className="text-amber-200 text-sm mt-1">
          Remèdes naturels tirés du livre du Dr Beauvillard (1912)
        </p>
      </header>

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
          <strong>Avertissement :</strong> Ces remèdes sont issus d&apos;un livre
          de 1912 et ont une valeur historique et ethnobotanique. Consultez toujours
          un médecin pour tout problème de santé sérieux.
        </div>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-amber-900">
              Décrivez vos symptômes
            </h2>
            <Link href="/aide" className="text-xs text-amber-700 hover:text-amber-500 underline underline-offset-2">
              Comment ça marche ?
            </Link>
          </div>
          <SearchBar onSearch={handleSearch} loading={state === "loading"} />
        </section>

        <FilterBar selected={categorie} onChange={handleCategorieChange} />

        <AdBanner />

        {state === "done" && (
          <section>
            {results.length > 0 ? (
              <>
                <h2 className="text-lg font-semibold text-amber-900 mb-4">
                  {results.length} remède{results.length > 1 ? "s" : ""} trouvé
                  {results.length > 1 ? "s" : ""} pour &laquo;&nbsp;{lastQuery}&nbsp;&raquo;
                </h2>
                <div className="flex flex-col gap-4">
                  {results.map((r, i) => (
                    <Fragment key={r.id ?? i}>
                      <RemedyCard remedy={r} />
                      {i < results.length - 1 && <AdBanner />}
                    </Fragment>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="text-center py-6 text-stone-500">
                  <p className="text-4xl mb-3">🌿</p>
                  <p className="font-medium">Aucun remède trouvé pour &laquo;&nbsp;{lastQuery}&nbsp;&raquo;.</p>
                  <p className="text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                    Reformulez avec des termes plus précis ou médicaux.<br />
                    <span className="text-amber-600 font-medium">Pensez à utiliser les accents</span> (é, è, à, ê…).
                  </p>
                </div>

                {suggestions.length > 0 && (
                  <div>
                    <h2 className="text-base font-semibold text-stone-500 mb-3">
                      Peut-être cherchez-vous…
                    </h2>
                    <div className="flex flex-col gap-4">
                      {suggestions.map((r, i) => (
                        <RemedyCard key={r.id ?? i} remedy={r} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {state === "idle" && (
          <div className="text-center py-8 text-stone-400 text-sm">
            <p className="text-5xl mb-4">🌱</p>
            <p>Entrez vos symptômes pour découvrir les remèdes du livre.</p>
          </div>
        )}
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
