import { Routes, Route } from "react-router-dom";
import Migrante from "./Migrante";
import MigranteList from "./MigranteList";
import NotFound from "../404";

export default function UsuarioRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MigranteList />} />
      <Route path="/create" element={<Migrante />} />
      <Route path="/:id" element={<Migrante />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
