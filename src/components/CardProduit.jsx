import { useEffect } from "react";

export default function CardProduit(props) {
  useEffect(() => {
    $(document).ready(function () {
      $(".owl-carousel-produit").owlCarousel({
        margin: 10,
        dots: true,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          460: {
            items: 2,
          },
          767: {
            items: 3,
          },
          1024: {
            items: 4,
          },
          1380: {
            items: 5,
          },
        },
      });
    });
  });

  const skeleton = () => {
    return (
      <div className="card-produit w-full text-sm lg:text-[1.1em] flex flex-col gap-[5px]">
        <div className="w-full h-[275px] skeleton relative rounded-md overflow-hidden card-produit-img-container">
          <a href=""></a>
        </div>
        <div className="text flex items-center gap-4">
          <div className="text-[#CC9B6A] icon-size">
            <svg
              width="18"
              height="22"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7501 5C12.7501 7.07107 11.0712 8.75 9.00009 8.75C6.92902 8.75 5.25009 7.07107 5.25009 5C5.25009 2.92893 6.92902 1.25 9.00009 1.25C11.0712 1.25 12.7501 2.92893 12.7501 5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1.50122 19.1182C1.57153 15.0369 4.90196 11.75 9.00009 11.75C13.0983 11.75 16.4288 15.0371 16.499 19.1185C14.2162 20.166 11.6765 20.75 9.00041 20.75C6.32408 20.75 3.78418 20.1659 1.50122 19.1182Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="uppercase skeleton-text skeleton font-bold whitespace-nowrap overflow-ellipsis overflow-hidden"></p>
        </div>
        <p className="uppercase skeleton-text skeleton"></p>
        <p className="price uppercase flex items-center font-medium  text-[#CC9B6A] ">
          <span className="skeleton-text skeleton"></span>
        </p>

        {/* <button className="rounded-md p-2 font-medium bg-[#CC9B6A] text-center w-full text-white">
          Ajouter au panier
        </button> */}
      </div>
    );
  };
  return (
    <div className="owl-carousel-produit owl-carousel owl-theme">
      {[1, 2, 3, 4].map((el,index) => (
        <div key={index} className="card-produit lg:max-w-[250px] w-full text-sm lg:text-[1.1em] flex flex-col gap-[5px]">
          <div className="w-full h-[275px] relative rounded-md overflow-hidden card-produit-img-container">
            <a href="">
              <img
                src="/assets/images/img/img-produit.jpg"
                className="object-cover object-top w-full h-full"
              />
            </a>
            <div className="bg-[#D93345] w-[75px] aspect-square text-white font-medium -rotate-45 absolute -top-8 -right-8 rounded-full pointer-events-none">
              <span className="absolute top-1/2 translate-y-[-50%] left-1 text-[.8em]">
                -25%
              </span>
            </div>
            <div className="bg-[#CC9B6A] text-center leading-[40px] w-[40px] aspect-square text-white font-medium absolute top-2 left-2 rounded-full pointer-events-none">
              <span className=" text-[.8em]">New</span>
            </div>
            <div className="absolute z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex gap-2 items-center card-produit-call-action-container">
              <div className="bg-[#ffffff56] p-1 aspect-square rounded-full call-action">
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
              </div>
              <div className="bg-[#ffffff56] p-1 aspect-square rounded-full call-action">
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
              </div>
            </div>
          </div>
          <div className="text flex items-center gap-4">
            <div className="text-[#CC9B6A] icon-size">
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7501 5C12.7501 7.07107 11.0712 8.75 9.00009 8.75C6.92902 8.75 5.25009 7.07107 5.25009 5C5.25009 2.92893 6.92902 1.25 9.00009 1.25C11.0712 1.25 12.7501 2.92893 12.7501 5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.50122 19.1182C1.57153 15.0369 4.90196 11.75 9.00009 11.75C13.0983 11.75 16.4288 15.0371 16.499 19.1185C14.2162 20.166 11.6765 20.75 9.00041 20.75C6.32408 20.75 3.78418 20.1659 1.50122 19.1182Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="uppercase font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">
              Africa design
            </p>
          </div>
          <p className="uppercase">Ensemble ac</p>
          <p className="price uppercase flex items-center font-medium  text-[#CC9B6A] ">
            <span className="line-through text-[#D93345] text-[.7em]">
              25000 xof
            </span>
            <span className="ml-2">25000 xof</span>
          </p>
          {/* <button className="rounded-md p-2 font-medium bg-[#CC9B6A] text-center w-full text-white">
            Ajouter au panier
          </button> */}
        </div>
      ))}
    </div>
  );
}
