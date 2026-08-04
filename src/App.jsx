import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./CadPessoas/Main/Dashboard/Dashboard.jsx";
import Cadastro from "./CadPessoas/Main/Cadastro/Cadastro.jsx";
import SideBar from "./CadPessoas/SideBar/SideBar.jsx";
import Header from "./CadPessoas/Header/Header.jsx";
import Relatorios from "./CadPessoas/Main/Relatorios/Relatorios.jsx";
import Configuracoes from "./CadPessoas/Main/Configuracoes/Configuracoes.jsx";
import "./App.css";
import "./Reset.css";
import { useState, useEffect } from "react";

import Mensagens from "./Footer/Mensagem/Mensagem.jsx";
import Ajuda from "./Footer/Ajuda/Ajuda.jsx";
import Contato from "./Footer/Contato/Contato.jsx";
import Privacidade from "./Footer/Privacidade/Privacidade.jsx";
import Footer from "./Footer/Footer.jsx";

// 🔹 Nova página para usuários excluídos
const Excluidos = () => {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const excluidos = historico
    .filter((u) => u.excluidoEm)
    .sort((a, b) => new Date(b.excluidoEm) - new Date(a.excluidoEm));

  return (
    <div className="excluidos-page">
      <h2>Usuários Excluídos</h2>
      {excluidos.length === 0 ? (
        <p>Nenhum usuário excluído até o momento.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de Exclusão</th>
            </tr>
          </thead>
          <tbody>
            {excluidos.map((u, i) => (
              <tr key={i}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.telefone}</td>
                <td>{new Date(u.excluidoEm).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

function App() {
  const [usuarios, setUsuarios] = useState(() => {
    const saved = localStorage.getItem("usuarios");
    return saved ? JSON.parse(saved) : [];
  });

  const [excluidos, setExcluidos] = useState(() => {
    const saved = localStorage.getItem("excluidos");
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem("excluidos", JSON.stringify(excluidos));
  }, [excluidos]);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="content">
          <SideBar />
          <div className="main-content">
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <Dashboard usuarios={usuarios} excluidos={excluidos} />
                }
              />
              <Route
                path="/cadastro"
                element={
                  <Cadastro
                    usuarios={usuarios}
                    setUsuarios={setUsuarios}
                    setExcluidos={setExcluidos}
                  />
                }
              />
              <Route
                path="/relatorios"
                element={
                  <Relatorios usuarios={usuarios} excluidos={excluidos} />
                }
              />
              <Route path="/configuracoes" element={<Configuracoes />} />

              {/* rotas do footer */}
              <Route path="/ajuda" element={<Ajuda />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/mensagens" element={<Mensagens />} />

              {/* 🔹 nova rota para usuários excluídos */}
              <Route path="/excluidos" element={<Excluidos />} />

              {/* fallback */}
              <Route
                path="*"
                element={
                  <Dashboard usuarios={usuarios} excluidos={excluidos} />
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
