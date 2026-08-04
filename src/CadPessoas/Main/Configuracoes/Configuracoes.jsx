import { useState } from "react";
import "./Styles.css";

const Configuracoes = () => {
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);

  const handleSalvar = () => {
    alert("Configurações salvas com sucesso!");
    // Aqui você pode salvar no localStorage se quiser
    localStorage.setItem("temaEscuro", JSON.stringify(temaEscuro));
    localStorage.setItem("notifEmail", JSON.stringify(notifEmail));
    localStorage.setItem("notifSms", JSON.stringify(notifSms));
  };

  return (
    <div className="configuracoes">
      <h1>Configurações do Sistema</h1>

      <div className="secao">
        <h2>Preferências de Exibição</h2>
        <label>
          Usar tema escuro
          <input
            type="checkbox"
            checked={temaEscuro}
            onChange={() => setTemaEscuro(!temaEscuro)}
          />
        </label>
      </div>

      <div className="secao">
        <h2>Preferências de Notificação</h2>
        <label>
          Receber notificações por Email
          <input
            type="checkbox"
            checked={notifEmail}
            onChange={() => setNotifEmail(!notifEmail)}
          />
        </label>
        <label>
          Receber notificações por SMS
          <input
            type="checkbox"
            checked={notifSms}
            onChange={() => setNotifSms(!notifSms)}
          />
        </label>
      </div>

      <button className="btn-salvar" onClick={handleSalvar}>
        Salvar Configurações
      </button>
    </div>
  );
};

export default Configuracoes;
