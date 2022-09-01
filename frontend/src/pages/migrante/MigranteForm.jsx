import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleUnderline from "../../components/TitleUnderline";
import useAsyncOptions from "../../hooks/useAsyncOptions";
import {
  InputDate,
  InputText,
  InputSelect,
  InputPhoto,
  InputAsyncSelect,
} from "../../components/CustomInputs";
import Button from "@mui/material/Button";
import {
  email,
  composeValidators,
  alphanumeric,
  required,
  date,
  password,
} from "../../validations";
import ButtonUi from "../../components/UI";
import {
  InputMasterField,
  InputTextField,
  InputSelectField,
} from "../../components/Input";
import FormFooter from "../../components/Form/FormFooter";
import { convertToSelect, PAISES } from "../../utils";

const GENERO = convertToSelect(["Hombre", "Mujer", "LGBTI"]);
const ESTADO_CIVIL = convertToSelect([
  "Soltero",
  "Casado",
  "Union Libre",
  "D/S/V",
]);
const ESCOLARIDAD = convertToSelect([
  "Primaria",
  "Secundaria",
  "Superior",
  "Analfabeta",
]);
const FAMILIA_EN_EL_NORTE = convertToSelect([
  "México",
  "Canada",
  "Estados Unidos",
  "Ninguno",
]);
const RELIGION = convertToSelect(["Católica", "Evangélica", "Otra", "Ninguna"]);
const NO_DEPORTADOS = convertToSelect(["Paso", "1", "2", "3", "Más"]);
const CAUSA_MIGRACION = convertToSelect([
  "Escasez",
  "Reunificación",
  "Asilo",
  "Refugio",
  "Otra",
]);
const PLANES = convertToSelect(["Residir", "Cruzar", "Regresar"]);
const PAIS_VIOLACION = convertToSelect([
  "Guatemala",
  "México",
  "Estados Unidos",
  "Otra",
]);

export default function UsuarioForm({
  onSubmit,
  initialValues = {},
  isUpdating,
  urlList,
  loading,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-wrap">
        {[
          {
            name: "nombres",
            title: "Nombre",
            validations: ["required", "maxLength-250"],
          },
          {
            name: "apellidos",
            title: "Apellido",
            validations: ["required", "maxLength-250"],
          },
          {
            name: "no_identificacion",
            title: "No. Identificación",
            validations: ["required", "maxLength-20"],
          },
          {
            name: "fecha_nacimiento",
            title: "Fecha de Nacimiento",
            type: "date",
          },
          { name: "genero", title: "Género", options: GENERO },
          {
            name: "estado_civil",
            title: "Estado Civil",
            options: ESTADO_CIVIL,
          },
          { name: "escolaridad", title: "Escolaridad", options: ESCOLARIDAD },
          {
            name: "familia_en_el_norte",
            title: "Familia en el Norte",
            options: FAMILIA_EN_EL_NORTE,
          },
          { name: "religion", title: "Religión", options: RELIGION },
          {
            name: "no_deportados",
            title: "No. Deportados",
            options: NO_DEPORTADOS,
          },
          {
            name: "causa_migracion",
            title: "Causa de Migración",
            options: CAUSA_MIGRACION,
          },
          { name: "planes", title: "Planes", options: PLANES },
          {
            name: "pais_violacion",
            title: "Pais violación autoridad/particular",
            options: PAIS_VIOLACION,
          },

          {
            name: "ciudad_pueblo",
            title: "Ciudad/Pueblo",
            validations: ["required", "maxLength-250"],
          },
          {
            name: "departamento",
            title: "Departamento",
            validations: ["required", "maxLength-250"],
          },
          {
            name: "pais",
            title: "País",
            options: PAISES,
          },
          {
            name: "ocupacion",
            title: "Ocupación",
            validations: ["required", "maxLength-250"],
          },
        ].map((props, index) => {
          return (
            <InputMasterField
              key={props.name || index}
              control={control}
              {...props}
            />
          );
        })}
      </div>
      <FormFooter {...{ loading, isUpdating, urlList }} />
      <br />
    </form>
  );
}
