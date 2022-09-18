import MigranteForm from "./MigranteForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Migrante() {
  const urlList = "/migrante";
  const { saveData } = useCreate("migrante", urlList);
  const { data, updateData, update, setData } = useUpdate("migrante", urlList);
  const loading = useSelector((state) => state.loading.loading);

  const onSubmit = async (data) => {
    const body = { ...data };
    setData(data);
    body.fecha_nacimiento = dayjs(data.fecha_nacimiento).format("YYYY-MM-DD");

    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div>
        <h1 className="text-title mb-4">Migrante</h1>
      </div>
      <LoadMask loading={loading}>
        <MigranteForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
          urlList={urlList}
          loading={loading}
        />
      </LoadMask>
    </>
  );
}
