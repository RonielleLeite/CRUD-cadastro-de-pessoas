
function ResumoEstatisticas({ total, novosNoMes, excluidos }) {
  return (
    <div className="card resumo">
      <h3>Resumo Geral</h3>
      <ul>
        <li>
          Total de Pessoas Cadastradas: <span>{total}</span>
        </li>
        <li>
          Novos Cadastros no Mês: <span>{novosNoMes}</span>
        </li>
        <li>
          Cadastros Excluídos: <span>{excluidos}</span>
        </li>
      </ul>
    </div>
  );
}

export default ResumoEstatisticas;
