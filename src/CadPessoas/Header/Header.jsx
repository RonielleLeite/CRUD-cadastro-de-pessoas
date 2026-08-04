import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import "./Styles.css";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <h1 className="titulo">Sistema de Cadastro de Pessoas</h1>
      <div className="usuario" ref={menuRef} onClick={toggleMenu}>
        <FaUserCircle size={28} />
        <span>Administrador</span>
        {menuAberto && (
          <ul className="dropdown">
            <li>
              <a href="/perfil">Perfil</a>
            </li>
            <li>
              <a href="/configuracoes">Configurações</a>
            </li>
            <li>
              <a href="/logout">Sair</a>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
