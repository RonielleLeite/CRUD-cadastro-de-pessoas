import { useState } from "react";
import "./Styles.css";

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push(formData);
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    alert("Mensagem enviada com sucesso!");
    setFormData({ nome: "", email: "", mensagem: "" });
  };

  return (
    <div className="contato-container">
      <h1>Contato</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Mensagem:</label>
        <textarea
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contato;
