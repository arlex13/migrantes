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

const PaginaPublica = () => {
  const { data, page, getData } = useList("migrante/buscar");
  const [search, setSearch] = useState(null);

  return (
    <>
      <div className="flex mb-2 sm:mb-0">
        <h1 className="text-title">Migrantes</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-20 mt-4">
        <Search
          className="w-full"
          onSearch={(value) => {
            getData(1, {
              search: value,
            }).then();
            setSearch(value);
          }}
        />
      </div>
      <br />
    </>
  );
};
export default PaginaPublica;
