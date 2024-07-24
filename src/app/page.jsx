"use client";

import CardCategorie from "@/components/CardCategorie";
import CardProduit from "@/components/CardProduit";
import CardType from "@/components/CardType";
import SlideArticle from "@/components/SlideArticle";
import Titre from "@/components/Titre";
import { useEffect, useState } from "react";

export default function Home() {
  const categorieFake = [
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
    {
      img: "assets/images/img/img.jpg",
      designation: "Accéssoire",
    },
  ];

  const typeFake = [
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Meilleures ventes",
    },
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Meilleures ventes",
    },
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Meilleures ventes",
    },
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Homme",
    },
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Femmes",
    },
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Meilleures ventes",
    },
  ];

  const produitFake = [
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Tissue AC",
      createur: "African Made",
      prix: 25000,
      remise: 10,
    },
    {
      img: "/assets/images/img/img-type.jpg",
      designation: "Meilleures ventes",
      createur: "African Made",
      prix: 25000,
      remise: 10,
    },
  ];

  const [categories, setCategories] = useState(null);
  const [typeArticle, setTypeArticle] = useState(null);
  const [produits, setProduits] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setCategories([...categorieFake]);
      setTypeArticle([...typeFake]);
      setProduits([...produitFake]);
    }, 3000);
  }, []);

  return (
    <div className="min-h-scree">
      <title>Bienvenu sur Nahyel</title>
      <div className="space-out"></div>
      <div className="padding-inline scetion_scroll">
        <div className="section-categorie flex items-center gap-4 overflow-auto">
          <CardCategorie data={categories}></CardCategorie>
        </div>
      </div>
      <div className="space-out"></div>
      <div className="padding-inline scetion_scroll">
        <div className="mt-[1px] section-type flex items-center gap-4 overflow-auto">
          <CardType data={typeArticle}></CardType>
        </div>
      </div>
      <div className="space-out"></div>
      <div className="space-out"></div>
      <Titre titre_text="Tous nos produits" lenght={0}></Titre>
      <div className="space-out"></div>
      <div className="space-out"></div>
      <div className="padding-inline relative">
        <CardProduit data={produits}></CardProduit>
      </div>
      <div className="space-out"></div>
      <div className="space-out"></div>
      <Titre titre_text="Designed by Nahyel" lenght={0}></Titre>
      <div className="space-out"></div>
      <div className="space-out"></div>
      <SlideArticle></SlideArticle>
    </div>
  );
}
