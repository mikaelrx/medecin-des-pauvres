import type { MetadataRoute } from "next";
import remediesData from "@/data/remedies.json";
import type { Remedy } from "@/types/remedy";
import { slugify } from "@/lib/slugify";

const BASE_URL = "https://medecin-des-pauvres.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const remedies = remediesData as Remedy[];

  const remedyRoutes = remedies.map((r) => ({
    url: `${BASE_URL}/remede/${slugify(r.remede)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/aide`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cgu`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...remedyRoutes,
  ];
}
