
'use client'

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import('react-spring-3d-carousel'), {
  ssr: false
});


export default function Slide3D() {
  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: false,
    enableSwipe: true,
  });

  const slides = [
    {
      key: 0,
      content: <img src="assets/images/img/img-produit.jpg" alt="1" />,
    },
    {
      key: 1,
      content: <img src="assets/images/img/img-produit.jpg" alt="3" />,
    },
    {
      key: 2,
      content: <img src="assets/images/img/img-produit.jpg" alt="2" />,
    },
  ];

  const goToslide = (el) => {
    setState({ ...state, goToSlide: state.goToSlide + el });
  };

  useEffect(() => {
    let autoplay = true;

    function slideAuto() {
      if (autoplay) {
        $(".splide__arrownext").trigger("click");
      }
    }

    let intervalID = setInterval(slideAuto, 5000);

    $(".Carrousel_3D_container").on("mouseenter", function () {
      autoplay = false;
      clearInterval(intervalID);
    });

    $(".Carrousel_3D_container").on("mouseleave", function () {
      autoplay = true;
      clearInterval(slideAuto);
      intervalID = setInterval(slideAuto, 5000);
    });

  },[]);

 

  return (
    <div className="Carrousel_3D_container padding-inline">
      <div className="Carrousel_3D">
        <Carousel
          slides={slides}
          goToSlide={state.goToSlide}
          offsetRadius={state.offsetRadius}
          showNavigation={state.showNavigation}
          animationConfig={state.config}
        />
        <div className="arrows">
          <div className="arrow_arrow arrowLeft" onClick={() => goToslide(-1)}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              enableBackground="new 0 0 32 32"
            >
              <line
                fill="none"
                strokeMiterlimit="10"
                x1="26"
                y1="16"
                x2="4"
                y2="16"
              />
              <polyline
                fill="none"
                strokeMiterlimit="10"
                points="18,7.5 26.5,16 18,24.5 "
              />
            </svg>
          </div>
          <div
            className="arrow_arrow splide__arrownext"
            onClick={() => goToslide(1)}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              enableBackground="new 0 0 32 32"
            >
              <line
                fill="none"
                strokeMiterlimit="10"
                x1="26"
                y1="16"
                x2="4"
                y2="16"
              />
              <polyline
                fill="none"
                strokeMiterlimit="10"
                points="18,7.5 26.5,16 18,24.5 "
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="over_lay_whithe"></div>
    </div>
  );
}
