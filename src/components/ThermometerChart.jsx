// React-ChartJS-2
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
// import { Chart as ChartJS, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);
// ChartJS.register(LinearScale, BarElement);

export default function ThermometerChart({ temp }) {
  //   let tempPercent = ((Number(temp) + 30) / 80) * 100;
  //   if (tempPercent < 0) {
  //     tempPercent = 0;
  //   } else if (tempPercent > 100) {
  //     tempPercent = 100;
  //   }

  let chartVal = Number(temp) + 30;

  const data = {
    labels: [""],
    datasets: [
      {
        label: "Filled",
        data: [chartVal],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        // borderColor: "red",
        borderRadius: "5",
        color: "red",
        borderWidth: 1,
        barThickness: 30,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    layout: {
      padding: {
        top: 45,
        bottom: 45,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 80,
        stacked: true,
        ticks: {
          callback: function (value) {
            return value - 30;
          },
          color: "white",
        },
        grid: {
          color: "white",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-grow w-[270px] h-[140px]">
      <Bar data={data} options={options} />
    </div>
  );
}
