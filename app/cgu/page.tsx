import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Le Médecin des Pauvres",
};

export default function CGU() {
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

        <h2 className="text-2xl font-bold text-amber-900">Conditions Générales d&apos;Utilisation</h2>
        <p className="text-xs text-stone-400">Dernière mise à jour : avril 2026</p>

        <div className="flex flex-col gap-5 text-sm text-stone-700 leading-relaxed">
          <section>
            <h3 className="font-bold text-amber-900 mb-1">1. Objet</h3>
            <p>
              Les présentes conditions régissent l&apos;utilisation du site <em>Le Médecin des Pauvres</em>,
              plateforme de consultation de remèdes naturels issus d&apos;un ouvrage du domaine public datant de 1912.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">2. Accès au service</h3>
            <p>
              Le service est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet.
              L&apos;éditeur se réserve le droit de modifier, suspendre ou interrompre le service à tout moment
              sans préavis.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">3. Nature des informations</h3>
            <p>
              Les remèdes présentés sont extraits d&apos;un livre publié en 1912. Ils ont une valeur
              <strong> strictement historique et documentaire</strong>. Ces informations ne constituent
              pas des conseils médicaux et ne sauraient remplacer une consultation auprès d&apos;un
              professionnel de santé.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">4. Limitation de responsabilité</h3>
            <p>
              L&apos;éditeur ne saurait être tenu responsable de tout dommage direct ou indirect résultant
              de l&apos;utilisation des informations contenues sur ce site. L&apos;utilisateur reconnaît
              utiliser ces informations à ses propres risques et sous sa seule responsabilité.
            </p>
            <p className="mt-2">
              Certaines plantes mentionnées peuvent être toxiques ou dangereuses. Des avertissements
              spécifiques sont indiqués le cas échéant. L&apos;utilisateur s&apos;engage à en tenir compte.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">5. Utilisation acceptable</h3>
            <p>L&apos;utilisateur s&apos;engage à :</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Ne pas utiliser le site à des fins illégales</li>
              <li>Ne pas tenter de perturber le fonctionnement du service</li>
              <li>Ne pas reproduire le contenu à des fins commerciales sans autorisation</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">6. Propriété intellectuelle</h3>
            <p>
              Le contenu textuel issu du livre est dans le domaine public. Le code, le design et
              l&apos;organisation du site sont protégés. Toute reproduction partielle ou totale est
              interdite sans accord préalable de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">7. Droit applicable</h3>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-amber-900 mb-1">8. Contact</h3>
            <p>
              Pour toute question : <a href="mailto:mikaelrx@gmail.com" className="text-amber-700 underline">mikaelrx@gmail.com</a>
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
