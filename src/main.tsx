import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, } from "react-router";

import Login from "./pages/Login/Login";
import Pets from "./pages/Pets/Pets";

import "./reset.css"
import "./index.css";
import Form from "./pages/FormPet/Form";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/Pets" element={<Pets />} />
         <Route path="/Pets/Cadastro" element={<Form/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
