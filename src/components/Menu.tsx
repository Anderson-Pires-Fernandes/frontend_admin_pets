import { NavLink } from "react-router";
import logo from "../assets/logo_cat_dog.webp";

function Menu() {
  return (
    <div className="menu">
      <div className="container_esquerda_menu">
        <img src={logo} width={90} alt="imagem-de-logo" />
        <h1 className="logo_menu">PetAdopt Admin</h1>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink
              end
              className={({ isActive }) =>
                `menu_item ${isActive ? "menu_ativo" : "menu_inativo"}`
              }
              to="/Pets"
            >
              Pets
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `menu_item ${isActive ? "menu_ativo" : "menu_inativo"}`
              }
              to="/Pets/Cadastro"
            >
              Novo
            </NavLink>
          </li>
          <li>
            <NavLink className="sair_menu" to="/">
              Sair
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
