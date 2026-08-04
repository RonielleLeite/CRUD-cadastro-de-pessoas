import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Styles.css";

const Sidebar = () => {
  return (
    <nav className="menulateral">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cadastro"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaUser />
            <span>Cadastros</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/relatorios"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaChartBar />
            <span>Relatórios</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/configuracoes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaCog />
            <span>Configurações</span>
          </NavLink>
        </li>
      </ul>
      
    </nav>
  );
};

export default Sidebar;
