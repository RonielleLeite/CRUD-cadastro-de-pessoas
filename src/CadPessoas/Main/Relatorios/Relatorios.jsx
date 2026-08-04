import { useState } from "react";
import "./Styles.css";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import ResumoEstatisticas from "./ResumoEstatisticas";
import TabUsuarios from "./TabUsuarios";
import GrafRelatorios from "./GrafRelatorios";
import GrafEvolucao from "./GrafEvolucao";
import ExportRelatorio from "./ExportRelatorio";

function Relatorios({ usuarios }) {
  // 🔹 ESTADOS DE FILTRO
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroNascimento, setFiltroNascimento] = useState("");
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [tipoGrafico, setTipoGrafico] = useState("barra");

  const itensPorPagina = 5;

  // 🔹 FILTROS (apenas ativos)
  const usuariosFiltrados = usuarios.filter((u) => {
    const nomeMatch = u.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const emailMatch = u.email
      .toLowerCase()
      .includes(filtroEmail.toLowerCase());
    const nascimentoMatch = u.dataNascimento.includes(filtroNascimento);

    const dataCadastro = new Date(u.dataCadastro);
    const inicioOk = filtroDataInicio
      ? dataCadastro >= new Date(filtroDataInicio)
      : true;
    const fimOk = filtroDataFim
      ? dataCadastro <= new Date(filtroDataFim)
      : true;

    return nomeMatch && emailMatch && nascimentoMatch && inicioOk && fimOk;
  });

  // 🔹 PAGINAÇÃO
  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(indexPrimeiro, indexUltimo);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);

  // 🔹 HISTÓRICO
  const historico = JSON.parse(localStorage.getItem("historico")) || [];

  // Estatísticas baseadas no histórico
  const total = historico.length;
  const excluidos = historico.filter((u) => u.excluidoEm).length;
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
  const novosNoMes = historico.filter((u) => {
    const data = new Date(u.dataCadastro || "");
    return data.getMonth() === mesAtual && data.getFullYear() === anoAtual;
  }).length;

  // 🔹 Evolução mensal
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const cadastrosPorMes = Array(12).fill(0);
  historico.forEach((u) => {
    const data = new Date(u.dataCadastro);
    if (!isNaN(data)) cadastrosPorMes[data.getMonth()]++;
  });

  // 🔹 LIMPAR FILTROS
  const limparFiltros = () => {
    setFiltroNome("");
    setFiltroEmail("");
    setFiltroNascimento("");
    setFiltroDataInicio("");
    setFiltroDataFim("");
    setPaginaAtual(1);
  };

  // 🔹 EXPORTAR PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(0, 255, 153);
    doc.text("Relatório de Usuários", 14, 16);

    doc.setFontSize(10);
    doc.setTextColor(0, 255, 255);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, 22);

    doc.text(`Total de Pessoas: ${total}`, 14, 30);
    doc.text(`Novos no Mês: ${novosNoMes}`, 14, 36);
    doc.text(`Excluídos: ${excluidos}`, 14, 42);

    autoTable(doc, {
      startY: 50,
      head: [["Nome", "Email", "Telefone", "Nascimento", "Cadastro"]],
      body: usuariosFiltrados.map((u) => [
        u.nome,
        u.email,
        u.telefone,
        u.dataNascimento,
        new Date(u.dataCadastro).toLocaleDateString("pt-BR"),
      ]),
      styles: { textColor: [224, 224, 224], fillColor: [17, 17, 17] },
      headStyles: { fillColor: [0, 255, 255], textColor: [0, 0, 0] },
    });

    const canvas = document.getElementById("graficoRelatorio");
    if (canvas) {
      const chartImage = canvas.toDataURL("image/png");
      doc.addImage(
        chartImage,
        "PNG",
        14,
        doc.lastAutoTable.finalY + 10,
        180,
        100,
      );
    }

    doc.setFontSize(9);
    doc.text(
      "Sistema de Cadastro de Pessoas",
      14,
      doc.internal.pageSize.height - 10,
    );
    doc.save("relatorio.pdf");
  };

  // 🔹 EXPORTAR EXCEL
  const exportarExcel = () => {
    const dados = [
      { Relatorio: "Sistema de Cadastro de Pessoas" },
      { Total: total, "Novos no Mês": novosNoMes, Excluídos: excluidos },
      {},
      ...usuariosFiltrados.map((u) => ({
        Nome: u.nome,
        Email: u.email,
        Telefone: u.telefone,
        Nascimento: u.dataNascimento,
        Cadastro: new Date(u.dataCadastro).toLocaleDateString("pt-BR"),
      })),
    ];

    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");
    ws["!freeze"] = { xSplit: 0, ySplit: 3 };
    XLSX.writeFile(wb, "relatorio.xlsx");
  };

  // 🔹 DADOS PARA GRÁFICO
  const dadosGrafico = {
    labels: ["Total", "Novos no Mês", "Excluídos"],
    datasets: [
      {
        label: "Estatísticas",
        data: [total, novosNoMes, excluidos],
        backgroundColor: ["#00ffff", "#00ff99", "#ff0066"],
        borderColor: "#111",
        borderWidth: 1,
      },
    ],
  };

  const dadosEvolucao = {
    labels: meses,
    datasets: [
      {
        label: "Cadastros por Mês",
        data: cadastrosPorMes,
        borderColor: "#00ff99",
        backgroundColor: "#00ff99",
        fill: false,
      },
    ],
  };

  return (
    <main className="relatorio-container">
      <h2>Relatórios do Sistema</h2>

      {/* 🔹 FILTROS */}
      <section className="card filtros-simples">
        <h3>Filtros Rápidos</h3>
        <form className="filtros-simples-form">
          <input
            type="text"
            placeholder="Nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={filtroEmail}
            onChange={(e) => setFiltroEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Data de Nascimento (aaaa-mm-dd)"
            value={filtroNascimento}
            onChange={(e) => setFiltroNascimento(e.target.value)}
          />
        </form>
        <div className="filtro-actions-simples">
          <button type="button" onClick={limparFiltros}>
            Limpar
          </button>
        </div>
      </section>

      {/* 🔹 RESUMO E TABELA */}
      <section className="linha-relatorio">
        <ResumoEstatisticas
          total={total}
          novosNoMes={novosNoMes}
          excluidos={excluidos}
        />
        <TabUsuarios
          usuariosPaginados={usuariosPaginados}
          totalPaginas={totalPaginas}
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
        />
      </section>

      {/* 🔹 GRÁFICO PRINCIPAL */}
      <GrafRelatorios
        dadosGrafico={dadosGrafico}
        tipoGrafico={tipoGrafico}
        setTipoGrafico={setTipoGrafico}
      />

      {/* 🔹 GRÁFICO DE EVOLUÇÃO MENSAL */}
      <GrafEvolucao dadosEvolucao={dadosEvolucao} />

      {/* 🔹 EXPORTAR */}
      <ExportRelatorio
        exportarPDF={exportarPDF}
        exportarExcel={exportarExcel}
      />
    </main>
  );
}

export default Relatorios;
