import Link from "next/link";

export default function Aide() {
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

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 text-sm font-medium"
        >
          ← Retour à la recherche
        </Link>

        <h2 className="text-2xl font-bold text-amber-900">Guide d&apos;utilisation</h2>

        <section className="flex flex-col gap-4">
          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 mb-2">📝 Décrire ses symptômes</h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              Écrivez dans le champ de saisie ce que vous ressentez, en langage naturel.
              Vous pouvez être aussi précis que vous le souhaitez.
            </p>
            <div className="mt-3 bg-amber-50 rounded-xl px-4 py-3 text-sm text-amber-800 space-y-1">
              <p className="font-semibold">Exemples :</p>
              <p>• <em>« j&apos;ai mal à la gorge et je tousse »</em></p>
              <p>• <em>« douleurs abdominales après les repas »</em></p>
              <p>• <em>« insomnie et nervosité »</em></p>
              <p>• <em>« bleu sur la jambe suite à un choc »</em></p>
            </div>
          </div>

          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 mb-2">🔍 Lancer la recherche</h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              Cliquez sur le bouton <strong>« Trouver un remède »</strong> après avoir décrit
              vos symptômes. L&apos;interface cherche dans l&apos;ensemble du livre les remèdes
              correspondants et affiche les plus pertinents.
            </p>
          </div>

          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 mb-2">🌿 Lire les résultats</h3>
            <p className="text-sm text-stone-700 leading-relaxed mb-3">
              Chaque résultat affiche :
            </p>
            <ul className="text-sm text-stone-700 space-y-2">
              <li className="flex gap-2">
                <span className="text-amber-700 font-bold">Nom</span>
                <span>— la plante ou le remède concerné</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-700 font-bold">Étiquettes</span>
                <span>— les symptômes traités par ce remède</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-700 font-bold">Description</span>
                <span>— l&apos;explication fidèle au livre</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-700 font-bold">Préparation</span>
                <span>— comment utiliser le remède (dosage, mode d&apos;emploi)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-lg font-bold text-amber-900 mb-2">💡 Conseils pour de meilleurs résultats</h3>
            <ul className="text-sm text-stone-700 space-y-2 leading-relaxed">
              <li>• Utilisez des mots simples et directs plutôt que des termes médicaux complexes</li>
              <li>• Si aucun résultat n&apos;apparaît, reformulez avec d&apos;autres mots</li>
              <li>• Vous pouvez combiner plusieurs symptômes dans une même recherche</li>
              <li>• Les noms de plantes fonctionnent aussi comme mots-clés</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ Avertissement important</h3>
            <p className="text-sm text-red-700 leading-relaxed">
              Les remèdes présentés sont tirés d&apos;un ouvrage de 1912 et ont une valeur
              <strong> historique et ethnobotanique</strong>. Ils ne se substituent en aucun
              cas à un avis médical professionnel. En cas de symptômes graves, persistants
              ou d&apos;urgence, <strong>consultez immédiatement un médecin</strong>.
            </p>
          </div>
        </section>
      </div>

      <footer className="text-center text-xs text-stone-400 py-4 border-t border-amber-100">
        Basé sur &laquo; Le Médecin des Pauvres &raquo; — Domaine public
      </footer>
    </main>
  );
}
