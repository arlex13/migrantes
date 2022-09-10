import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table, { tableActions } from "../../components/Table";
import LoadMask from "../../components/LoadMask";
import Button from "@mui/material/Button";
import useList from "../../hooks/useList";
import useDelete from "../../hooks/useDelete";
import Search from "../../components/Search/Search";
import ButtonUi from "../../components/UI";
import casa from "../../assets/img/casa_migrante.png";
import bandera from "../../assets/img/bandera.png";

const PaginaPublica = () => {
  const { data, page, getData } = useList("migrante/buscar");
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <nav
        className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded "
        style={{ backgroundColor: "#17527f" }}
      >
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center">
            <div className="mr-3 h-6 sm:h-9"></div>
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Casa del migrante
            </span>
          </div>

          <div>
            <span
              onClick={() => navigate("/login")}
              className=" cursor-pointer block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0  "
            >
              Iniciar sesión
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto m-10">
        <div className="grid mb-4 md:mb-4 md:grid-cols-2">
          <div className="flex flex-col justify-center items-center text-center rounded-t-lg md:rounded-t-none md:rounded-tl-lg row-span-1">
            <figcaption className="flex justify-center items-center space-x-3">
              <img className="w-full" src={casa} alt="profile picture" />
            </figcaption>
            <div className="mx-auto max-w-2xl text-gray-500">
              <p className="my-4 text-gray-900 text-base">
                Esta herramienta te permite averiguar si tu familiar ha pasado
                por alguna de las casas del migrante.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center text-center rounded-t-lg md:rounded-t-none md:rounded-tl-lg row-span-1">
            <figcaption className="flex justify-center items-center space-x-3">
              <img className="w-full" src={bandera} alt="profile picture" />
            </figcaption>
            <div className="mx-auto max-w-2xl text-gray-500 dark:text-gray-400">
              <p className="my-4 text-gray-900 text-base">
                Casa migrante Tecun Human
              </p>
              <p className="my-4 text-gray-900 text-base">Tel. 4455445454</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center m-12">
        Casas del migrante donde ha estado, para más información comunícate a
        los siguientes centros:
      </p>
      <div className="container mx-auto md:m-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8 md:m-4">
          <Search
            className="md:col-span-1"
            onSearch={(value) => {
              getData(1, {
                search: value,
              }).then();
              setSearch(value);
            }}
          />
          <button className="w-full md:w-40 md:justify-self-center bg-blue-500 rounded hover:bg-blue-700 text-white font-bold py-2">
            Buscar
          </button>
        </div>
      </div>
      <div className="container mx-auto m-10">
        <div className=" p-6 md:max-w-sm sm:m-10 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="font-normal text-gray-700 dark:text-gray-100">
            Tu familiar si estuvo en la casa del migrante, para más información
            comunícate directamente con ellos.
          </p>
        </div>
        {/* <div className=" p-6 md:max-w-sm sm:m-10 bg-white rounded-lg border border-red-100 shadow-md hover:bg-red-100 dark:bg-red-700 dark:border-red-700 dark:hover:bg-red-600">
          <p className="font-normal text-gray-700 dark:text-gray-100">
            Tu familiar si estuvo en la casa del migrante, para más información
            comunícate directamente con ellos.
          </p>
        </div> */}
      </div>
    </>
  );
};
export default PaginaPublica;
