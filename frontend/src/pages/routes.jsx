import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import PrivateRoute from "./PrivateRoute";
import Login from "./login";
import NotFound from "./404";

// Pages
import UserRoutes from "./user";

// Styles
import "react-toastify/dist/ReactToastify.min.css";
import MigranteRoutes from "./migrante";
import PaginaPublica from "./publico";
import ReportesRoutes from "./reportes";
import useAccount from "../hooks/useAccount";

export default function App() {
  const { user } = useAccount();
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PaginaPublica />} />
        {user.rol == 1 && (
          <>
            <Route
              path="/reportes"
              element={
                <PrivateRoute>
                  <ReportesRoutes />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/*"
              element={
                <PrivateRoute>
                  <UserRoutes />
                </PrivateRoute>
              }
            />
          </>
        )}
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/migrante/*"
          element={
            <PrivateRoute>
              <MigranteRoutes />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  );
}
