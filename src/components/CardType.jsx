export default function CardType(props) {
  return (
    <>
      {props.data == null || props.data == []
        ? [1, 2, 3, 4].map((el,index) => (
            <div key={index} className="rounded-md min-w-[265px] w-full h-[265px] bg-[#f0f0f0] relative text-[.9em] lg:text-[1em]">
              <div className="absolute top-0 h-full w-full p-2">
                <div className="border-white border-solid border-[.5px] rounded-md h-full aspect-auto w-full p-2 text-black flex items-end justify-center ">
                  <p className="text-center uppercase p-2 py-1 rounded-md w-full min-h-[2em] skeleton-gray whitespace-nowrap overflow-ellipsis overflow-hidden">
                    
                  </p>
                </div>
              </div>
            </div>
          ))
        : props.data.map((el,index) => (
            <div key={index} className="bg-black rounded-md aspect-auto min-w-[265px] w-[265px] lg:min-w-[280px] relative text-[.9em] lg:text-[1em]">
              <img
                src={el.img}
                className="w-full h-full opacity-70"
                alt=""
              />
              <div className="absolute top-0 h-full w-full p-2">
                <div className="border-white border-solid border-[.5px] rounded-md h-full aspect-auto w-full p-2 text-black flex items-end justify-center ">
                  <p className="text-center uppercase p-2 py-1 rounded-md bg-[#D9D9D9] whitespace-nowrap overflow-ellipsis overflow-hidden w-full">
                    {el.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </>
  );
}
