import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Search from "../../components/Search/Search";
import casa from "../../assets/img/casa_migrante.png";
import bandera from "../../assets/img/bandera.png";
import api from "api";

const PaginaPublica = () => {
  const navigate = useNavigate();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarMensaje(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mostrarMensaje]);

  const migranteEncontrado = () => {
    console.log("el emigrante se encuentra");
    setMostrarMensaje({
      mensaje:
        "Tu familiar si estuvo en la casa del migrante, para más información comunícate directamente con ellos.",
      tipo: "success",
    });
  };

  const migranteNoEncontrado = () => {
    setMostrarMensaje({
      mensaje:
        "Tu familiar no estuvo en la casa del migrante, para más información comunícate directamente con ellos.",
      tipo: "error",
    });
  };

  const realizarBusqueda = async (a) => {
    const response = await api.get(`migrante/buscar`, {
      params: { search: a },
    });
    if (response) {
      migranteEncontrado();
    } else {
      migranteNoEncontrado();
    }
  };

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
              <p className="my-4 text-gray-900 text-base">Tel. 77768416</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center m-12">
        Casas del migrante donde ha estado, para más información comunícate a
        los siguientes centros:
      </p>
      <div className="container mx-auto md:m-12">
        <div
          className="grid grid-cols-1 gap-6 sm:gap-8 md:m-4 mx-auto"
          style={{ maxWidth: 550, marginLeft: "auto", marginRight: "auto" }}
        >
          <Search
            className="md:col-span-1 mx-auto"
            onSearch={realizarBusqueda}
          />
        </div>
      </div>
      {mostrarMensaje && (
        <div
          className="container mx-auto md:m-12"
          style={{ maxWidth: 550, marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            className="grid grid-cols-1 gap-6 sm:gap-8 md:m-4 mx-auto"
            style={{ maxWidth: 550, marginLeft: "auto", marginRight: "auto" }}
          >
            <div
              className={`md:col-span-1 mx-auto border-solid border-2 border-gray-300 rounded-md p-5 text-white ${
                mostrarMensaje.tipo === "success"
                  ? "bg-[#3d7dad]"
                  : "bg-red-500"
              }`}
              title="Resultado de la busqueda"
            >
              <p>{mostrarMensaje?.mensaje}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PaginaPublica;
