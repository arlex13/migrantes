import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@redux/loadingSlice";
import { setUser } from "@redux/loginSlice";
import api from "api";
import _ from "lodash"

export default function useAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);

  const login = (data = {}) => {
    dispatch(setLoading(true));
    api
      .post("user/login", data)
      .then((response) => {
        navigate("/migrante");
        dispatch(setUser(response));
      })
      .catch((e) => {
        let msj = "Credenciales incorrectas, vuelva a intentar";
        if (e && e.detail) msj = e.detail;
        else if (_.isArray(e)) msj = e[0];
        toast.error(msj, "ERROR", 6000);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getMe = () => {
    return api
      .get("/user/me")
      .then((me) => {
        dispatch(setUser(me));
      })
      .catch(() => {
        navigate("/");
      })
      .finally(() => { });
  };

  const logOut = () => {
    dispatch(setLoading(true));
    api
      .post("/user/logout")
      .then(() => {
        dispatch(setUser({}));
        navigate("/");
      })
      .catch(() => { })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const pwdRecovery = (data) => {
    dispatch(setLoading(true));
    return api
      .post("user/password_recovery", data)
      .then(() => {
        toast.success(
          "Te enviamos un enlace para restablecer tu contraseña. Este sólo es válido durante 6 horas."
        );
        navigate("/login");
      })
      .catch((e) => {
        let msj = "Intente de nuevamente.";
        if (e && e.detail) msj = e.detail;
        else if (_.isArray(e)) msj = e[0];
        toast.error(msj, "ERROR", 6000);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return { user, login, getMe, logOut, pwdRecovery };
}
