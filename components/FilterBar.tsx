"use client";

const CATEGORIES = [
  { label: "Digestion", emoji: "🫃" },
  { label: "Respiratoire", emoji: "🫁" },
  { label: "Peau", emoji: "🩹" },
  { label: "Douleurs", emoji: "💊" },
  { label: "Sommeil & Nervosité", emoji: "😴" },
  { label: "Urinaire & Reins", emoji: "💧" },
  { label: "Fièvre & Infections", emoji: "🌡️" },
  { label: "Circulation & Cœur", emoji: "❤️" },
  { label: "Femme", emoji: "🌸" },
  { label: "Premiers secours", emoji: "🚑" },
  { label: "Hygiène & Divers", emoji: "🪥" },
];

interface FilterBarProps {
  selected: string | null;
  onChange: (cat: string | null) => void;
}

export default function FilterBar({ selected, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
      <button
        onClick={() => onChange(null)}
        className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
          selected === null
            ? "bg-amber-800 text-white border-amber-800"
            : "bg-white text-stone-600 border-stone-200 hover:border-amber-400"
        }`}
      >
        Tous
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.label}
          onClick={() => onChange(selected === c.label ? null : c.label)}
          className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors flex items-center gap-1 ${
            selected === c.label
              ? "bg-amber-800 text-white border-amber-800"
              : "bg-white text-stone-600 border-stone-200 hover:border-amber-400"
          }`}
        >
          <span>{c.emoji}</span>
          <span>{c.label}</span>
        </button>
      ))}
    </div>
  );
}
