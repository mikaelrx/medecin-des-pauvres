import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Le Médecin des Pauvres",
};

export default function MentionsLegales() {
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

        <h2 className="text-2xl font-bold text-amber-900">Mentions légales</h2>

        <div className="flex flex-col gap-5 text-sm text-stone-700 leading-relaxed">
          <section>
            <h3 className="font-bold text-amber-900 mb-1">Éditeur du site</h3>
            <p>Ce site est édité à titre personnel et non commercial.</p>
            <p className="mt-1">Contact : <a href="mailto:mikaelrx@gmail.com" className="text-amber-700 underline">mikaelrx@gmail.com</a></p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">Hébergement</h3>
            <p>Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.</p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">Contenu</h3>
            <p>
              Le contenu de ce site est issu du livre <em>« Le Médecin des Pauvres »</em> (39e édition) par le Dr Beauvillard,
              publié en 1912 et disponible sur Gallica (Bibliothèque nationale de France). Cet ouvrage est tombé dans le
              domaine public.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">Avertissement médical</h3>
            <p>
              Les informations présentées sur ce site ont une valeur <strong>historique et ethnobotanique uniquement</strong>.
              Elles ne constituent en aucun cas un avis médical, un diagnostic ou une prescription. L&apos;éditeur décline
              toute responsabilité quant à l&apos;usage des remèdes présentés. En cas de problème de santé,
              consultez un professionnel de santé qualifié.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">Propriété intellectuelle</h3>
            <p>
              Le code source de ce site, son design et son organisation sont la propriété de l&apos;éditeur.
              Le contenu textuel issu du livre est dans le domaine public.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">Données personnelles</h3>
            <p>
              Ce site ne collecte aucune donnée personnelle identifiable. Les recherches effectuées
              peuvent être enregistrées de manière anonyme à des fins statistiques.
            </p>
          </section>
        </div>
      </div>

      <footer className="text-center text-xs text-stone-400 py-4 border-t border-amber-100">
        Basé sur &laquo; Le Médecin des Pauvres &raquo; — Domaine public
      </footer>
    </main>
  );
}
