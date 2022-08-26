import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import { toast } from "react-toastify";
import { formatParams } from "./useAsyncOptions";
import api from "api";
import _, { isEmpty, isFinite } from "lodash";

const INITIAL_DATA = { results: [], count: 0 };

export const useList = (name_api, initial_params = {}) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const getData = async (page = 1, params = {}) => {
    dispatch(setLoading(true));
    const _params = formatParams({ ...initial_params, ...params });
    _params.page = page;

    try {
      const _data = await api.get(name_api, { params: _params });
      setData(_data);
      setPage(page);
    } catch (e) {
      let msj = "No se pudo obtener los registros";
      if (e && e.detail) msj = e.detail;
      else if (_.isArray(e)) msj = e[0];
      toast.error(msj);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getData(1, initial_params);
  }, []);

  return { data, page, getData };
};

export default useList;
