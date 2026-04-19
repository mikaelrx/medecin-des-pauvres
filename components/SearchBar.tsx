"use client";

import { useState, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (value.trim()) onSearch(value.trim());
    },
    [value, onSearch]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Décrivez vos symptômes… ex : j'ai mal au ventre et des crampes depuis ce matin"
          rows={3}
          className="w-full rounded-xl border border-amber-300 bg-white px-4 py-3 text-stone-800 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none text-base"
        />
        <button
          type="submit"
          disabled={loading || value.trim().length < 2}
          className="w-full sm:w-auto sm:self-end bg-amber-700 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow"
        >
          {loading ? "Recherche…" : "Trouver un remède"}
        </button>
      </div>
    </form>
  );
}
