import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <img src="/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <h1 className="font-bold text-2xl"> <span className="text-4xl">Started</span> <span className="text-sky-500" >Project</span></h1>
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>Template d'un project simple en <strong>Nextjs</strong>, <strong>TypeScript</strong> et <strong>CSS tailwind</strong></p>
              <p>Étapes à suivre pour lancer le projet : </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Lancer les commandes
                    <code className="text-sm font-bold text-gray-900"> npm install </code> pour installer les dépences js et <code className="text-sm font-bold text-gray-900"> gulp</code> pour le css.
                  </p>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">
                    Lancer la commande
                    <code className="text-sm font-bold text-gray-900"> npm run dev </code> pour démarrer le projet en mode developpement.
                  </p>
                </li>

                <li className="flex items-center">
                  <svg className="h-6 w-6 flex-none fill-sky-100 stroke-green-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
                  </svg>
                  <p className="ml-4">Vous êtes prêt à coder</p>
                </li>
              </ul>
              <p>Configuration de base :</p>
              <ul className="space-y-4 italic">
                __
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
