import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './informes.css'

const Informes = ({ darkMode }) => {
  const [difficulty, setDifficulty] = useState("");
  const [heroType, setHeroType] = useState("");
  const [champions, setChampions] = useState([]); // Todos los campeones cargados desde el CSV
  const [filteredChampions, setFilteredChampions] = useState([]); // Campeones filtrados
  const [isFiltered, setIsFiltered] = useState(false); // Estado para controlar si se ha aplicado el filtro

  useEffect(() => {
    // Cargar el archivo CSV desde public/
    Papa.parse("/src/Informes/campeones.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        console.log("Datos cargados:", result.data); // Verificar los datos cargados
        setChampions(result.data); // Guardar los datos
      },
      error: (error) => console.error("Error cargando el CSV:", error),
    });
  }, []);

  const handleDifficultyChange = (e) => setDifficulty(e.target.value);
  const handleHeroTypeChange = (e) => setHeroType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    let filtered = champions;

    if (difficulty) {
      filtered = filtered.filter(champion => champion.difficulty === parseInt(difficulty));
    }

    if (heroType) {
      filtered = filtered.filter(champion => champion.herotype === heroType);
    }

    console.log("Campeones filtrados:", filtered); // Verificar los campeones filtrados
    setFilteredChampions(filtered);
    setIsFiltered(true); // Marcar que se ha aplicado el filtro
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del informe
    doc.setFontSize(18);
    doc.text('Informe de Campeones', 105, 20, { align: 'center' });

    // Encabezado
    doc.setFontSize(12);
    doc.text(
      'Este informe muestra información detallada sobre los campeones filtrados por dificultad y tipo de héroe.',
      10,
      30
    );

    // Cabecera de columna
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 255); // Color azul
    doc.text('Nombre', 10, 40);
    doc.text('Dificultad', 70, 40);
    doc.text('Tipo de Héroe', 110, 40);
    doc.text('Estadísticas', 150, 40);

    // Detalles de los campeones
    doc.setTextColor(0, 0, 0); // Color negro para el contenido
    let y = 50;
    filteredChampions.forEach((champion, index) => {
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
      doc.text(champion.apiname || 'Desconocido', 10, y);
      doc.text(champion.difficulty ? champion.difficulty.toString() : 'N/A', 70, y);
      doc.text(champion.herotype || 'N/A', 110, y);
      const stats = JSON.stringify(champion.stats, null, 2)
        .replace(/[{}"]/g, '')
        .replace(/,/g, ', ')
        .split('\n');
      stats.forEach((line) => {
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 150, y);
        y += 4;
      });
      y += 10;
    });

    // Pie de columnas
    doc.setTextColor(0, 0, 255);
    doc.text('Fin de la página', 10, 280);

    // Resumen al final
    const totalChampions = filteredChampions.length;
    doc.setTextColor(128, 0, 128); // Color morado para el resumen
    doc.text(
      `Resumen: Total de campeones filtrados: ${totalChampions} con la dificultad: ${difficulty} y el tipo de heroe: ${heroType}`,
      10,
      290
    );

    // Guardar el PDF
    doc.save('informe_campeones.pdf');
  };

  // Datos para el gráfico de barras
  const roles = filteredChampions.reduce((acc, champion) => {
    acc[champion.role] = (acc[champion.role] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(roles),
    datasets: [
      {
        label: 'Cantidad de personajes por rol',
        data: Object.values(roles),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico circular
  const positions = filteredChampions.reduce((acc, champion) => {
    acc[champion.client_positions] = (acc[champion.client_positions] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(positions),
    datasets: [
      {
        label: 'Cantidad de personajes por posición',
        data: Object.values(positions),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Formulario de Informes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dificultad:</label>
          <select className="select" value={difficulty} onChange={handleDifficultyChange}>
            <option value="">Seleccione dificultad</option>
            <option value="1">Fácil</option>
            <option value="2">Medio</option>
            <option value="3">Difícil</option>
          </select>
        </div>

        <div>
          <label>Tipo de Héroe:</label>
          <select className="select" value={heroType} onChange={handleHeroTypeChange}>
            <option value="">Seleccione tipo de héroe</option>
            <option value="Fighter">Fighter</option>
            <option value="Tank">Tank</option>
            <option value="Mage">Mage</option>
            <option value="Support">Support</option>
            <option value="Assassin">Assassin</option>
            <option value="Marksman">Marksman</option>
          </select>
        </div>

        <button type="submit">Filtrar</button>
        <button type="button" onClick={generatePDF}>Generar PDF</button>
      </form>

      {isFiltered && (
        <>
          <h2>Campeones Filtrados</h2>
          <ul>
            {filteredChampions.length > 0 ? (
              filteredChampions.map((champion, index) => (
                <li className={`text-filtro ${darkMode ? 'darkmode' : ''}`} key={index}>{champion.apiname} - {champion.difficulty} - {champion.herotype}</li>
              ))
            ) : (
              <p>No se encontraron campeones que coincidan con los filtros.</p>
            )}
          </ul>

          <div className="Graphics">
            <div>
              <h2>Gráfico de Barras: Cantidad de personajes por rol</h2>
              <Bar data={barData} width={300} height={100} />
            </div>
            <div>
              <h2>Gráfico Circular: Cantidad de personajes por posición</h2>
              <Pie data={pieData} width={300} height={100} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Informes;
