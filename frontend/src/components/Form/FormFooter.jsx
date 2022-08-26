import React from "react";
import ButtonUi from "../UI";

const FormFooter = ({
  errorData,
  isUpdating,
  loading,
  urlList,
  setOpen,
  onlyRead = false,
}) => {
  return (
    <div className="my-4 sm:mt-10">
      {errorData && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {errorData}
        </div>
      )}
      <div className="grid gap-2 sm:block text-center">
        <div className="mx-2 sm:px-4 sm:inline-block contents">
          <ButtonUi
            type="button"
            disabled={loading}
            urlList={urlList}
            button="secondary"
          >
            Salir
          </ButtonUi>
        </div>
        <div className="mx-2 sm:px-4 sm:inline-block contents">
          {!onlyRead && (
            <ButtonUi type="submit" disabled={loading} button="primary">
              {isUpdating ? "Editar" : "Registrar"}
            </ButtonUi>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormFooter;
