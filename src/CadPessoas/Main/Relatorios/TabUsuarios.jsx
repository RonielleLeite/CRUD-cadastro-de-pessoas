
function TabUsuarios({
  usuariosPaginados,
  totalPaginas,
  paginaAtual,
  setPaginaAtual,
}) {
  return (
    <div className="card usuarios">
      <h3>Usuários Ativos Filtrados</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data de Nascimento</th>
            <th>Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          {usuariosPaginados.map((u, i) => (
            <tr key={i}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.telefone}</td>
              <td>{u.dataNascimento}</td>
              <td>{new Date(u.dataCadastro).toLocaleDateString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPaginas > 1 && (
        <div className="paginacao">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              className={paginaAtual === i + 1 ? "ativo" : ""}
              onClick={() => setPaginaAtual(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TabUsuarios;
