import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import TableComponent from "./table.component";

class ExportPdfComponent extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          content={() => this.componentRef}
          trigger={() => <button className="btn btn-primary">Imprimir </button>}
        />
        <div
          ref={(response) => (this.componentRef = response)}
          className="mx-12"
        >
          <div className=" flex flex-col">
            <h1 className="mx-auto">CASA DEL MIGRANTE - MI'N NPON B'AJ </h1>
            <h1 className="mx-auto  text-sm">
              0 AV. "C" DEL MIGRANTE 0-22 COLONIA OLGUITA
            </h1>
            <h1 className="mx-auto  text-sm">
              DE LEON, TECUN UMAN, SAN MARCOS,
            </h1>
            <h1 className="mx-auto  text-sm">GUATEMALA, C.A. </h1>
          </div>
          <TableComponent
            titulo="Migrantes por país de origen"
            data={this.props.dataServicio || []}
          />
        </div>
      </div>
    );
  }
}

import _ from "lodash";
import api from "api";
import { useDispatch } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { setLoading } from "@redux/loadingSlice";

const YEARS = _.range(2022, new Date().getFullYear() + 1);

const REPORTES = () => {
  const [dataServicio, setDataGrafica] = useState(false);
  const dispatch = useDispatch();
  const [anio, setAnio] = useState(new Date().getFullYear());

  const getDataGrafica = async (anio) => {
    console.log("anio", anio);
    dispatch(setLoading(true));
    try {
      const data = await api.get(`estadisticas/informacionReportes`, {
        params: { anio },
      });
      setDataGrafica(JSON.parse(data));
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
      {dataServicio && <ExportPdfComponent dataServicio={dataServicio} />}
    </>
  );
};

export default REPORTES;
