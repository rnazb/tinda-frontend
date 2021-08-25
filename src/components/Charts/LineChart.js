import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
  const lineChartDisplay = {
    labels: props.labels,
    datasets: props.data
  };

  const lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return (
    <Line
      data={lineChartDisplay}
      options={lineChartOptions}
      height={150}
    />
  );
};

export default LineChart;