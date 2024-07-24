export default function BarreRecherche(){
    return(
        <div className="bg-white py-2 px-4 rounded-md md:flex md:justify-between w-full">
            <div className="flex items-center w-full">
              <input
                type="text"
                className="w-full h-max outline-none pr-2 md:w-full"
                placeholder="Bienvenu, que voulez vous ?  "
              />
              <span className="icon-container bg-gray-100 shadow-inner shadow-gray-300 lg:shadow-none p-1 rounded-md md:hidden">
                <svg
                  className="icon-size icon-navbar w-[15px] h-max"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_50_6402)">
                    <path
                      d="M17.6151 0C7.90242 0 0 7.90242 0 17.6151C0 27.3284 7.90242 35.2303 17.6151 35.2303C27.3284 35.2303 35.2303 27.3284 35.2303 17.6151C35.2303 7.90242 27.3284 0 17.6151 0ZM17.6151 31.9783C9.69539 31.9783 3.25203 25.535 3.25203 17.6152C3.25203 9.69547 9.69539 3.25203 17.6151 3.25203C25.535 3.25203 31.9783 9.69539 31.9783 17.6151C31.9783 25.535 25.535 31.9783 17.6151 31.9783Z"
                      fill="#CC9B6A"
                    />
                    <path
                      d="M39.5236 37.2244L30.201 27.9019C29.5658 27.2666 28.537 27.2666 27.9018 27.9019C27.2665 28.5365 27.2665 29.5664 27.9018 30.201L37.2244 39.5236C37.5419 39.8412 37.9576 40 38.3739 40C38.7896 40 39.2059 39.8412 39.5236 39.5236C40.1588 38.8889 40.1588 37.8591 39.5236 37.2244Z"
                      fill="#CC9B6A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_6402">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
            <div className="border-[.5px] border-dashed my-2 mb-4 md:border-none md:w-1 md:bg-gray-200 h-15px md:m-0 md:mr-4 "></div>
            <div className="flex items-center gap-2 mb-1 md:mb-0">
              <span className="icon-container md:hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="icon-size w-[20px] h-max"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C16.1926 21 19.7156 18.1332 20.7157 14.2529M12 21C7.80742 21 4.28442 18.1332 3.2843 14.2529M12 21C14.4853 21 16.5 16.9706 16.5 12C16.5 7.02944 14.4853 3 12 3M12 21C9.51472 21 7.5 16.9706 7.5 12C7.5 7.02944 9.51472 3 12 3M12 3C15.3652 3 18.299 4.84694 19.8431 7.58245M12 3C8.63481 3 5.70099 4.84694 4.15692 7.58245M19.8431 7.58245C17.7397 9.40039 14.9983 10.5 12 10.5C9.00172 10.5 6.26027 9.40039 4.15692 7.58245M19.8431 7.58245C20.5797 8.88743 21 10.3946 21 12C21 12.778 20.9013 13.5329 20.7157 14.2529M20.7157 14.2529C18.1334 15.6847 15.1619 16.5 12 16.5C8.8381 16.5 5.86662 15.6847 3.2843 14.2529M3.2843 14.2529C3.09871 13.5329 3 12.778 3 12C3 10.3946 3.42032 8.88743 4.15692 7.58245"
                    stroke="#CC9B6A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <select
                name=""
                id=""
                className="w-full outline-none text-gray-400 font-medium uppercase text-[.8em] bg-gray-100 shadow-inner shadow-gray-200 p-1 rounded-md md:w-[200px] md:shadow-none  md:bg-transparent"
              >
                <option value="0">Choisir un créateur</option>
                <option value="1">Créateur 1</option>
                <option value="1">Créateur 2</option>
              </select>
              <span className="hidden icon-container bg-gray-100 shadow-inner shadow-gray-300 lg:shadow-none p-1 rounded-md md:block md:shadow-none md:bg-transparent lg:p-0">
                <svg
                  className="icon-size icon-navbar w-[15px] md:w-[24px] h-max"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_50_6402)">
                    <path
                      d="M17.6151 0C7.90242 0 0 7.90242 0 17.6151C0 27.3284 7.90242 35.2303 17.6151 35.2303C27.3284 35.2303 35.2303 27.3284 35.2303 17.6151C35.2303 7.90242 27.3284 0 17.6151 0ZM17.6151 31.9783C9.69539 31.9783 3.25203 25.535 3.25203 17.6152C3.25203 9.69547 9.69539 3.25203 17.6151 3.25203C25.535 3.25203 31.9783 9.69539 31.9783 17.6151C31.9783 25.535 25.535 31.9783 17.6151 31.9783Z"
                      fill="#CC9B6A"
                    />
                    <path
                      d="M39.5236 37.2244L30.201 27.9019C29.5658 27.2666 28.537 27.2666 27.9018 27.9019C27.2665 28.5365 27.2665 29.5664 27.9018 30.201L37.2244 39.5236C37.5419 39.8412 37.9576 40 38.3739 40C38.7896 40 39.2059 39.8412 39.5236 39.5236C40.1588 38.8889 40.1588 37.8591 39.5236 37.2244Z"
                      fill="#CC9B6A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_6402">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
    )
}