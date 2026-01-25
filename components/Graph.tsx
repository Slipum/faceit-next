import { Chart, registerables } from "chart.js";
import { useEffect, useRef, useState, useCallback } from "react";

Chart.register(...registerables);

type GraphProps = {
  listElo: number[];
};

export function Graph({ listElo }: GraphProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const eloChartRef = useRef<Chart | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [maxPoints, setMaxPoints] = useState(50);

  const calculateMaxPoints = useCallback(
    (containerWidth: number) => {
      if (containerWidth < 400) return 20; // мобильные: 20 матчей
      if (containerWidth < 768) return 30; // планшеты: 30 матчей
      if (containerWidth < 1024) return 50; // ноутбуки: 50 матчей
      return Math.min(listElo.length, 100); // десктоп: до 100
    },
    [listElo.length],
  );

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const newMaxPoints = calculateMaxPoints(width);
        setMaxPoints(newMaxPoints);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMaxPoints]);

  useEffect(() => {
    if (!chartRef.current || listElo.length === 0) return;

    if (eloChartRef.current) {
      eloChartRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const visibleData = listElo.slice(-maxPoints);
    const labels = visibleData
      .map((_, index) => `${visibleData.length - index}`)
      .reverse();

    const minElo = Math.min(...visibleData);
    const maxElo = Math.max(...visibleData);
    const minYAxis = Math.floor(minElo / 100) * 100;
    const maxYAxis = Math.ceil(maxElo / 100) * 100;

    eloChartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "ELO",
            data: visibleData,
            borderColor: "red",
            backgroundColor: "red",
            borderWidth: 2,
            fill: false,
            pointHoverBackgroundColor: "white",
            pointRadius: maxPoints < 30 ? 3 : 5,
            pointHoverRadius: maxPoints < 30 ? 6 : 10,
            pointHitRadius: 20,
            hoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: "nearest",
          intersect: false,
        },
        scales: {
          y: {
            beginAtZero: false,
            min: minYAxis,
            max: maxYAxis,
            ticks: {
              stepSize: 200,
            },
          },
          x: {
            beginAtZero: true,
            ticks: {
              maxTicksLimit: maxPoints < 30 ? 10 : 15,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Elo: ${context.raw}`,
              title: (context) => {
                const realIndex =
                  listElo.length - visibleData.length + context[0].dataIndex;
                return `Match #${realIndex + 1}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (eloChartRef.current) {
        eloChartRef.current.destroy();
        eloChartRef.current = null;
      }
    };
  }, [listElo, maxPoints]);

  if (!listElo?.length) return <></>;

  return (
    <>
      <h3 id="title-list-games" className="title-list-game">
        Graph elo ({Math.min(listElo.length, maxPoints)} out of {listElo.length}
        )
      </h3>
      <div className="list-games">
        <div id="li-game"></div>
        <div className="chart-container" ref={containerRef}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </>
  );
}
