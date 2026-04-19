"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="shrink-0 flex items-center gap-1.5 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium px-3 py-1.5 rounded-full transition-colors"
    >
      {copied ? "✓ Copié !" : "Partager"}
    </button>
  );
}
