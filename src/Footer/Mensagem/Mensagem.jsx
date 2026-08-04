import { useEffect, useState } from "react";
import "./Styles.css";

const Mensagens = () => {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("mensagens")) || [];
    setMensagens(saved);
  }, []);

  // Excluir uma mensagem específica com confirmação
  const excluirMensagem = (index) => {
    if (window.confirm("Tem certeza que deseja excluir esta mensagem?")) {
      const novas = mensagens.filter((_, i) => i !== index);
      setMensagens(novas);
      localStorage.setItem("mensagens", JSON.stringify(novas));
    }
  };

  // Excluir todas as mensagens com confirmação
  const excluirTodas = () => {
    if (window.confirm("Tem certeza que deseja excluir TODAS as mensagens?")) {
      setMensagens([]);
      localStorage.removeItem("mensagens");
    }
  };

  return (
    <div className="mensagens-container">
      <h1>Mensagens Recebidas</h1>

      {mensagens.length === 0 ? (
        <p>Nenhuma mensagem enviada ainda.</p>
      ) : (
        <>
          <button onClick={excluirTodas} className="btn-excluir-todas">
            Excluir Todas
          </button>
          <ul>
            {mensagens.map((msg, index) => (
              <li key={index} className="mensagem-item">
                <p>
                  <strong>Nome:</strong> {msg.nome}
                </p>
                <p>
                  <strong>Email:</strong> {msg.email}
                </p>
                <p>
                  <strong>Mensagem:</strong> {msg.mensagem}
                </p>
                <button
                  onClick={() => excluirMensagem(index)}
                  className="btn-excluir"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Mensagens;
