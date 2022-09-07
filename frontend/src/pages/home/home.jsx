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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Migrantes por País de Origen",
    },
  },
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

export default function Home() {
  const [dataServicio, setDataGrafica] = useState([]);
  const dispatch = useDispatch();

  const getDataGrafica = async () => {
    dispatch(setLoading(true));
    try {
      const data = await api.get(`migrante/graficas`);
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
    getDataGrafica();
  }, []);

  return (
    <>
      <div className="flex mb-2 sm:mb-0">
        <h1 className="text-title">Migrantes</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-20 mt-4">
        <div>
          <Bar
            options={options}
            data={{ labels: meses, datasets: dataServicio }}
          />
        </div>
      </div>
    </>
  );
}
