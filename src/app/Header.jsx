"use client";

import { useEffect } from "react";
import BarreRecherche from "../components/BarreRecherche";
import "../../public/assets/css/base.css";
import "../../public/assets/css/tailwindOutput.css";
import "owl.carousel/dist/assets/owl.carousel.css";


export default function Header() {
  useEffect(() => {
    $(document).ready(function () {
      $(".owl-carousel-header").owlCarousel({
        margin: 10,
        dots: true,
        nav: false,
        items: 1,
      });
    });
  });

  return (
    
    <div className="w-100">
      <div className="bg-[#F5E7D8] text-center text-black text-md md:text-xl lg:text-2xl  w-fyll py-2 font-bold promo-title">
        % Nouvelle promo chez Nahyel de 25 %
      </div>
      <div className="navbar space-in padding-inline">
        <div className=" flex flex-colum w-100 justify-between items-center lg:gap-[5em]">
          <span className="icon-container lg:hidden">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="icon-size icon-navbar"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 6.75H20.25M3.75 12H12M3.75 17.25H20.25"
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <img
            src={"assets/images/logo/logo.svg"}
            className="w-[60px] md:w-[80px] "
          />
          <div className="hidden lg:block w-full">
            <BarreRecherche></BarreRecherche>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <span className="icon-container">
              <span className="bullet">#</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="icon-size icon-navbar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8.25C21 5.76472 18.9013 3.75 16.3125 3.75C14.3769 3.75 12.7153 4.87628 12 6.48342C11.2847 4.87628 9.62312 3.75 7.6875 3.75C5.09867 3.75 3 5.76472 3 8.25C3 15.4706 12 20.25 12 20.25C12 20.25 21 15.4706 21 8.25Z"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="icon-container">
              <span className="bullet">#</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="icon-size icon-navbar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 3H3.63568C4.14537 3 4.59138 3.34265 4.7227 3.83513L5.1059 5.27209M7.5 14.25C5.84315 14.25 4.5 15.5931 4.5 17.25H20.25M7.5 14.25H18.7183C19.8394 11.9494 20.8177 9.56635 21.6417 7.1125C16.88 5.89646 11.8905 5.25 6.75 5.25C6.20021 5.25 5.65214 5.2574 5.1059 5.27209M7.5 14.25L5.1059 5.27209M6 20.25C6 20.6642 5.66421 21 5.25 21C4.83579 21 4.5 20.6642 4.5 20.25C4.5 19.8358 4.83579 19.5 5.25 19.5C5.66421 19.5 6 19.8358 6 20.25ZM18.75 20.25C18.75 20.6642 18.4142 21 18 21C17.5858 21 17.25 20.6642 17.25 20.25C17.25 19.8358 17.5858 19.5 18 19.5C18.4142 19.5 18.75 19.8358 18.75 20.25Z"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="icon-container">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="icon-size icon-navbar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9815 18.7248C16.6121 16.9175 14.4424 15.75 12 15.75C9.55761 15.75 7.38789 16.9175 6.01846 18.7248M17.9815 18.7248C19.8335 17.0763 21 14.6744 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 14.6744 4.1665 17.0763 6.01846 18.7248M17.9815 18.7248C16.3915 20.1401 14.2962 21 12 21C9.70383 21 7.60851 20.1401 6.01846 18.7248M15 9.75C15 11.4069 13.6569 12.75 12 12.75C10.3431 12.75 9 11.4069 9 9.75C9 8.09315 10.3431 6.75 12 6.75C13.6569 6.75 15 8.09315 15 9.75Z"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="space-out"></div>
        <div className="flex items-center justify-between w-full gap-10">
          <div className="hidden lg:block uppercase text-white cursor-pointer min-w-max">
            Nos boutiques
          </div>
          <div className="w-full lg:hidden">
            <BarreRecherche></BarreRecherche>
          </div>
          <div className="hidden items-stretch text-white uppercase w-full lg:flex">
            <div className="p-1 px-2 border-l-[1px] border-white ">Femme</div>
            <div className="border-l-[1px] border-white text-white"></div>
          </div>
          <div className="hidden lg:block uppercase text-white cursor-pointer min-w-max">
            Nous contacter
          </div>
          <div className="hidden lg:block uppercase italic font-extrabold transition-shadow cursor-pointer bg-[#bd8e2a] p-1 px-2 text-white rounded-md hover:shadow-lg shadow-black">
            Promotion
          </div>
        </div>
      </div>
      <div className="container_header_slide relative skeleton aspect-video max-h-[60vh] w-full">
        <div className="scroll_anim hidden absolute md:flex flex-col bottom-10 left-1/2 translate-x-[-50%] items-center text-white z-10">
          scroll
          <svg
            width="18"
            height="41"
            viewBox="0 0 18 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_523_8213)">
              <path
                d="M17.9157 14.8605C17.9157 17.074 18.0601 19.3 17.8916 21.501C17.5547 25.9281 13.7887 29.4847 9.43308 29.6961C5.02933 29.9075 1.02265 26.7115 0.216499 22.3218C0.0841462 21.613 0.0119538 20.8793 0.0119538 20.1704C-7.83333e-05 16.589 -7.83333e-05 13.0076 0.0119538 9.41369C0.0119538 4.43947 3.52532 0.497405 8.36222 0.0372897C12.8141 -0.385519 16.9652 2.93477 17.8435 7.66028C17.9518 8.26962 17.9879 8.8914 17.9999 9.51318C18.024 11.2915 18.012 13.0822 18.012 14.8605C17.9759 14.8605 17.9398 14.8605 17.9157 14.8605ZM1.27532 14.7983C1.27532 16.7631 1.23923 18.7404 1.28735 20.7052C1.41971 25.7664 6.12425 29.4101 10.8769 28.1665C14.27 27.2836 16.6764 24.1996 16.7125 20.5808C16.7486 16.7755 16.7245 12.9578 16.7245 9.15254C16.7245 8.84166 16.7245 8.53077 16.6764 8.21988C16.0507 3.96692 12.5253 1.057 8.37425 1.35546C4.40366 1.62904 1.32345 5.09856 1.27532 9.32664C1.26329 11.1547 1.27532 12.9703 1.27532 14.7983Z"
                fill="white"
              />
              <path
                d="M15.4973 35.603C15.4251 35.7025 15.3169 35.9263 15.1364 36.0631C13.2714 37.63 11.3944 39.1969 9.54145 40.7637C9.16846 41.0746 8.84359 41.0746 8.47059 40.7637C6.60562 39.1969 4.74065 37.63 2.86364 36.0755C2.52674 35.7895 2.34626 35.4538 2.6591 35.0683C2.97193 34.6827 3.32086 34.7822 3.65776 35.0683C5.29412 36.4362 6.94252 37.7916 8.55482 39.1844C8.90375 39.4829 9.12033 39.4704 9.45722 39.1844C11.0214 37.8538 12.5976 36.5481 14.1738 35.2299C14.3182 35.118 14.4505 34.9812 14.607 34.9066C15.0281 34.6827 15.4973 34.9812 15.4973 35.603Z"
                fill="white"
              />
              <path
                d="M10.2271 8.53077C10.2271 9.02819 10.2391 9.52561 10.2271 10.023C10.203 10.7443 9.66159 11.2915 8.99982 11.279C8.35009 11.2666 7.80864 10.7567 7.79661 10.0603C7.77255 9.00332 7.77255 7.9463 7.79661 6.90171C7.80864 6.16801 8.37415 5.63328 9.02388 5.64572C9.68565 5.65816 10.203 6.19288 10.2391 6.92658C10.2391 7.46131 10.2271 7.99604 10.2271 8.53077Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_523_8213">
                <rect width="18" height="41" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="owl-carousel-header owl-carousel owl-theme lg:max-h-[60vh] h-full">
          <img
            src="/assets/images/backgrounds/bg-header.jpg"
            className="object-cover header-bg lg:max-h-[60vh] aspect-video w-full object-top"
            alt=""
          />
          <img
            src="/assets/images/backgrounds/bg-header.jpg"
            className="object-cover header-bg lg:max-h-[60vh] aspect-video w-full object-top"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
