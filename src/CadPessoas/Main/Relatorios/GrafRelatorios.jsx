import { Bar, Pie } from "react-chartjs-2";

function GrafRelatorios({ dadosGrafico, tipoGrafico, setTipoGrafico }) {
  return (
    <section className="card grafico">
      <h3>Visualização Gráfica</h3>
      <div className="grafico-actions">
        <button onClick={() => setTipoGrafico("barra")}>📊 Barras</button>
        <button onClick={() => setTipoGrafico("pizza")}>🥧 Pizza</button>
      </div>
      <div className="grafico-container">
        {tipoGrafico === "barra" ? (
          <Bar id="graficoRelatorio" data={dadosGrafico} options={{ maintainAspectRatio: false }} />
        ) : (
          <Pie id="graficoRelatorio" data={dadosGrafico} options={{ maintainAspectRatio: false }} />
        )}
      </div>
    </section>
  );
}

export default GrafRelatorios;
