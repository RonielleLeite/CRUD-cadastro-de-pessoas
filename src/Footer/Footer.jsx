import { Link } from "react-router-dom";
import "./Styles.css";

const Footer = ({ historico }) => {
  const excluidos = (historico || [])
    .filter((u) => u.excluidoEm)
    .sort((a, b) => new Date(b.excluidoEm) - new Date(a.excluidoEm));

  return (
    <footer className="footer">
      <p>
        © 2026 Sistema de Cadastro de Pessoas — Todos os direitos reservados
      </p>
      <div className="footer-links">
        <Link to="/ajuda">Ajuda</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/privacidade">Privacidade</Link>
        <Link to="/mensagens">Mensagens</Link>
        <Link to="/excluidos">Usuários Excluídos</Link>
      </div>
    </footer>
  );
};

export default Footer;
