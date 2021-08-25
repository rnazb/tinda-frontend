import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  const pieChartDisplay = {
    labels: props.labels,
    datasets: props.data,
  };

  const pieChartOptions = {
    legend: {
      display: true,
      labels: {
        fontSize: 18,
        fontColor: "#6D7278",
        fontFamily: "kanit light"
      }
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30
      }
    },
    plugins: {
      title: {
        display: true,
        text: `Total Sales: ${props.salesTotal}`
      }
    },
    maintainAspectRatio: false
  };

  return (
    <Pie
      data={pieChartDisplay}
      options={pieChartOptions}
      height={50}
    />
  );
};

export default PieChart;