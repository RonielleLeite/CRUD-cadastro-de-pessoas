import { Line } from "react-chartjs-2";
import "./Styles.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);


function GrafEvolucao({ dadosEvolucao }) {
  return (
    <section className="card grafico">
      <h3>Evolução Mensal de Cadastros</h3>
      <div className="grafico-container">
        <Line id="graficoEvolucao" data={dadosEvolucao} options={{ maintainAspectRatio: false }} />
      </div>
    </section>
  );
}

export default GrafEvolucao;
