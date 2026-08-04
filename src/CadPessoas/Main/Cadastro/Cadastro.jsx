import { useState } from "react";
import "./Styles.css";

const Cadastro = ({ usuarios, setUsuarios }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // 🔹 Função para aplicar máscara manual
  const formatTelefone = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      setFormData({ ...formData, [name]: formatTelefone(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Validações
    if (!formData.nome.trim()) {
      setMensagem("Erro: Nome é obrigatório.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.nome.trim())) {
      setMensagem("Erro: Nome deve conter apenas letras.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMensagem("Erro: Email inválido.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }
    if (
      !formData.telefone ||
      formData.telefone.replace(/\D/g, "").length < 10
    ) {
      setMensagem("Erro: Telefone deve ter ao menos 10 dígitos.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }
    if (!formData.dataNascimento) {
      setMensagem("Erro: Data de nascimento é obrigatória.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    // 🔹 Verificação de duplicidade
    const existe = usuarios.some(
      (user, index) =>
        user.email === formData.email &&
        (editIndex === null || index !== editIndex),
    );
    if (existe && editIndex === null) {
      setMensagem("Erro: já existe um cadastro com este email.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    // 🔹 Novo usuário
    const novoUsuario = {
      ...formData,
      dataCadastro: new Date().toISOString(),
    };

    if (editIndex !== null) {
      const novosUsuarios = [...usuarios];
      novosUsuarios[editIndex] = novoUsuario;
      setUsuarios(novosUsuarios);
      setEditIndex(null);
      setMensagem("Cadastro atualizado com sucesso!");
    } else {
      setUsuarios([...usuarios, novoUsuario]);
      setMensagem("Pessoa cadastrada com sucesso!");
    }

    // 🔹 Atualiza histórico
    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push(novoUsuario);
    localStorage.setItem("historico", JSON.stringify(historico));

    setFormData({ nome: "", email: "", telefone: "", dataNascimento: "" });
    setTimeout(() => setMensagem(""), 3000);
  };

  const handleEdit = (index) => {
    setFormData(usuarios[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este cadastro?")) {
      const usuarioExcluido = usuarios[index];
      const novosUsuarios = usuarios.filter((_, i) => i !== index);
      setUsuarios(novosUsuarios);

      // 🔹 Atualiza histórico com marcação de exclusão
      const historico = JSON.parse(localStorage.getItem("historico")) || [];
      const atualizado = historico.map((u) =>
        u.email === usuarioExcluido.email
          ? { ...u, excluidoEm: new Date().toISOString() }
          : u,
      );
      localStorage.setItem("historico", JSON.stringify(atualizado));

      setMensagem("Cadastro excluído com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    }
  };

  return (
    <div className="cadastro">
      <div className="cadastro-form">
        <h2>{editIndex !== null ? "Editar Cadastro" : "Novo Cadastro"}</h2>
        {mensagem && <div className="mensagem-feedback">{mensagem}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {editIndex !== null ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </form>
      </div>

      <div className="usuarios-cadastrados">
        <h3>Pessoas Cadastradas</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user, index) => (
              <tr key={index}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td>{user.dataNascimento}</td>
                <td>
                  <button
                    className="btn-editar"
                    onClick={() => handleEdit(index)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-excluir"
                    onClick={() => handleDelete(index)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cadastro;
