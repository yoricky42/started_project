"Use Client"
import React from "react";

export default function CardCategorie(props) {
  return (
    <>
      {props.data == null || props.data == []
        ? [1, 2, 3, 4].map((el,index) => (
            <div key={index} className="flex min-w-[250px] w-full shadow-md h-[60px] items-center justify-start bg-[#F4E4D4] rounded-md overflow-hidden">
              <div className="w-20 h-full skeleton"></div>
              <div className="px-5 w-[160px]">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis skeleton skeleton-text"></div>
              </div>
            </div>
          ))
        : props.data.map((el,index) => (
            <div key={index} className="flex min-w-[250px] shadow-md h-[60px] items-center justify-start bg-[#F4E4D4] rounded-md overflow-hidden">
              <div className="w-20 h-full skeleton">
                <img
                  src={el.img}
                  className="w-full h-full object-fill"
                  alt=""
                />
              </div>
              <div className="px-5 w-[160px]">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {el.designation}
                </div>
              </div>
            </div>
          ))}
    </>
  );
}
