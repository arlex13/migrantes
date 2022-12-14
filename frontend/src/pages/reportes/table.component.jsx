import React, { useEffect, useState } from "react";

const Head = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
  "Total",
  "Porcentaje",
];

const TableComponent = ({ categoria = "-", data: datos = [], titulo }) => {
  const getRangoFecha = () => {
    const date = new Date();
    const year = date.getFullYear();
    const firstDay = new Date(year, 1, 1);
    const lastDay = new Date(year, 12, 0);
    return ` ${firstDay.toLocaleDateString()} al ${lastDay.toLocaleDateString()}`;
  };

  return (
    <div class="overflow-x-auto relative mb-10">
      <h3>{titulo}</h3>
      <h1 className="mx-auto  text-sm my-0 mb-0">
        Correspondiente al periodo comprendido
        {getRangoFecha()}
      </h1>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {[categoria, ...Head].map((item, index) => (
              <th key={index} class="py-1 px-2">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr
              key={index}
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                key={`${index}${item.titulo}`}
                scope="row"
                class="py-1 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.titulo}
              </th>
              <td class="py-1 px-2">{item["Enero"] || "0"}</td>
              <td class="py-1 px-2">{item["Febrero"] || "0"}</td>
              <td class="py-1 px-2">{item["Marzo"] || "0"}</td>
              <td class="py-1 px-2">{item["Abril"] || "0"}</td>
              <td class="py-1 px-2">{item["Mayo"] || "0"}</td>
              <td class="py-1 px-2">{item["Junio"] || "0"}</td>
              <td class="py-1 px-2">{item["Julio"] || "0"}</td>
              <td class="py-1 px-2">{item["Agosto"] || "0"}</td>
              <td class="py-1 px-2">{item["Septiembre"] || "0"}</td>
              <td class="py-1 px-2">{item["Octubre"] || "0"}</td>
              <td class="py-1 px-2">{item["Noviembre"] || "0"}</td>
              <td class="py-1 px-2">{item["Diciembre"] || "0"}</td>
              <td class="py-1 px-2">{item["total"] || "0"}</td>
              <td class="py-1 px-2">{item["porcentaje"] || "0"} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableComponent;
