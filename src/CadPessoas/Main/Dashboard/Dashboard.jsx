import "./Styles.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard({ usuarios, excluidos }) {
  const total = usuarios.length;

  // Novos cadastros hoje
  const hoje = new Date().toISOString().slice(0, 10); // formato YYYY-MM-DD
  const novosHoje = usuarios.filter(
    (u) => u.dataCadastro && u.dataCadastro.slice(0, 10) === hoje,
  ).length;

  // Últimos cadastros (pega os 5 mais recentes)
  const ultimosCadastros = [...usuarios]
    .sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro))
    .slice(0, 5);

  // Cadastros por mês (conta quantos em cada mês)
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const cadastrosPorMes = new Array(12).fill(0);
  usuarios.forEach((u) => {
    if (u.dataCadastro) {
      const data = new Date(u.dataCadastro);
      cadastrosPorMes[data.getMonth()]++;
    }
  });

  return (
    <div className="main">
      <h2 className="bem-vindo">Bem-vindo ao Sistema de Cadastro de Pessoas</h2>
      <div className="dashboard">
        <div className="card">
          <h2>Cadastro por Mês</h2>
          <Bar
            data={{
              labels: meses,
              datasets: [
                {
                  label: "Pessoas Cadastradas",
                  data: cadastrosPorMes,
                  backgroundColor: "#00ffff",
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        <div className="card">
          <h2>Estatísticas</h2>
          <ul>
            <li>
              Total de Pessoas Cadastradas: <span>{total}</span>
            </li>
            <li>
              Novos Cadastros Hoje: <span>{novosHoje}</span>
            </li>
            <li>
              Cadastros Excluídos: <span>{excluidos}</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>Últimos Cadastros</h2>
          <ul>
            {ultimosCadastros.map((u, i) => (
              <li key={i}>
                {u.nome} -{" "}
                {new Date(u.dataCadastro).toLocaleDateString("pt-BR")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
