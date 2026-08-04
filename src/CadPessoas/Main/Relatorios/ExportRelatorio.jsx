
function ExportRelatorio({ exportarPDF, exportarExcel }) {
  return (
    <section className="card exportar">
      <h3>Exportar Relatório</h3>
      <button className="btn-pdf" onClick={exportarPDF}>📄 Gerar PDF</button>
      <button className="btn-excel" onClick={exportarExcel}>📊 Gerar Excel</button>
    </section>
  );
}

export default ExportRelatorio;
