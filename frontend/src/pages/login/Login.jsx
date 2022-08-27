import { useForm } from "react-hook-form";
import { InputText } from "../../components/CustomInputs";
import LoadMask from "../../components/LoadMask";
import { useSelector } from "react-redux";
import useAccount from "../../hooks/useAccount";
import ButtonUi from "../../components/UI/ButtonUi";
import logo from "../../assets/img/migrantes.jpeg";
export default function Login() {
  const { handleSubmit, control } = useForm();
  const loading = useSelector((state) => state.loading.loading);
  const { login } = useAccount();

  const onSubmit = (data) => {
    return login(data);
  };

  // estilos logo:
  const estilos_logo = {
    height: "260px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <LoadMask loading={loading}>
        <div className="h-screen flex flex-col items-center justify-center relative">
          <div className="flex md:flex-row flex-col items-center justify-center">
            <img src={logo} alt="" style={estilos_logo} />

            <div className="">
              <h2 className="text-center text-title text-[#296073] ">
                Bienvenido
              </h2>
              <br />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-100 sm:max-w-md m-auto mt-2"
              >
                <div className="flex flex-col mb-4">
                  <label htmlFor="test" className="label">
                    Usuario
                  </label>
                  <InputText
                    className="form-input rounded-xl"
                    control={control}
                    name="username"
                    rules={{ required: "Este campo es requerido." }}
                    placeholder={"Nombre de usuario"}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="test" className="label">
                    Contraseña
                  </label>
                  <InputText
                    className="form-input rounded-xl"
                    control={control}
                    name="password"
                    type="password"
                    rules={{ required: "Este campo es requerido." }}
                    placeholder={"Contraseña"}
                  />
                </div>
                <div className="flex justify-center mt-10 flex-1">
                  <ButtonUi type="submit" button="primary">
                    Iniciar sesión
                  </ButtonUi>
                  {/* <button className="btn btn-primary" type="submit"></button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </LoadMask>
    </>
  );
}
