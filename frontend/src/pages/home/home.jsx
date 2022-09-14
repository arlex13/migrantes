import { useEffect, useMemo, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import { setLoading } from "@redux/loadingSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _ from "lodash";
import api from "api";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
//constantes años desde 2022 hasta al año actual
const YEARS = _.range(2022, new Date().getFullYear() + 1);

export default function Home() {
  const [dataServicio, setDataGrafica] = useState([]);
  const dispatch = useDispatch();
  const [anio, setAnio] = useState(new Date().getFullYear());

  const getDataGrafica = async (anio) => {
    console.log("anio", anio);
    dispatch(setLoading(true));
    try {
      const data = await api.get(`estadisticas/informacion`, {
        params: { anio },
      });
      setDataGrafica(data);
    } catch (e) {
      let msj = "No se pudo obtener el registro";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e[0];
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getDataGrafica(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="flex mb-2 sm:mb-0">
        <h1 className="text-title">Migrantes</h1>
        <div className=" ml-auto">
          Filtro Año:{"  "}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={anio}
            onChange={(e) => {
              setAnio(e.target.value);
              getDataGrafica(e.target.value);
            }}
          >
            {YEARS.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
            <MenuItem value={2023}>2023</MenuItem>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-20 mt-4">
        <div>
          <Bar
            options={{
              plugins: {
                title: { display: true, text: "Migrantes por Genero" },
              },
              ...options,
            }}
            data={{ labels: meses, datasets: dataServicio?.genero || [] }}
          />
        </div>
        <div>
          <Bar
            options={{
              plugins: {
                title: { display: true, text: "Migrantes por Estado Civil" },
              },
              ...options,
            }}
            data={{ labels: meses, datasets: dataServicio?.estado_civil || [] }}
          />
        </div>
        <div>
          <Bar
            options={{
              plugins: {
                title: { display: true, text: "Migrantes por Escolaridad" },
              },
              ...options,
            }}
            data={{ labels: meses, datasets: dataServicio?.escolaridad || [] }}
          />
        </div>
        <div>
          <Bar
            options={{
              plugins: { title: { display: true, text: "titulo 12" } },
              ...options,
            }}
            data={{
              labels: meses,
              datasets: dataServicio?.pais_origen || [],
            }}
          />
        </div>
      </div>
    </>
  );
}
