import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonUi({
  type = "submit",
  className = "",
  processing,
  children,
  onClick,
  btn,
  minWidth = 180,
  button,
  urlList = "",
}) {
  const navigate = useNavigate();
  if (urlList) {
    const _onclick = () => navigate(urlList);
    onClick = _onclick;
  }
  if (button === "primary") {
    return (
      <button
        onClick={onClick}
        type={type}
        style={{ minWidth }}
        className="relative px-5 py-3 overflow-hidden font-medium border-[#17527F]  text-[#17527F] bg-gray-100 border-2  rounded-lg shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#17527F] group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#17527F] group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#17527F] group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#17527F] group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#17527F] opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          {children}
        </span>
      </button>
    );
  } else if (button === "secondary") {
    return (
      <button
        onClick={onClick}
        type={type}
        style={{ minWidth }}
        className="relative px-5 py-3 overflow-hidden font-medium border-[#A04C4C]  text-[#A04C4C] bg-gray-100 border-2  rounded-lg shadow-inner group"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-[#A04C4C] group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-[#A04C4C] group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#A04C4C] group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-[#A04C4C] group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-[#A04C4C] opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          {children}
        </span>
      </button>
    );
  } else if (button === "danger") {
    return (
      <button
        onClick={onClick}
        type={type}
        style={{ minWidth }}
        className="relative inline-block px-4 py-2 my-2 font-medium group"
      >
        <span
          className={`absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0`}
        ></span>
        <span
          className={`absolute inset-0 w-full h-full bg-white border-2 border-red-600 group-hover:bg-red-600`}
        ></span>
        <span className={`relative text-red-600 group-hover:text-white`}>
          {children}
        </span>
      </button>
    );
  }
  return <div>Tipo de boton no valido</div>;
}
