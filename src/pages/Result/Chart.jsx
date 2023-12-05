import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const InferenceGraph = ({ startPoint, length, inference }) => {

  // Prepare the data for the chart
  const data = {
    labels: Array.from({ length: length }, (_, i) => i + startPoint),
    datasets: [
      {
        label: 'Inference',
        data: inference.slice(startPoint, startPoint + length),
        // data: inference,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};


const Chart = ()=> {
    
    const ecg = localStorage.getItem('result');
    const ecgData = JSON.parse(ecg);

    console.log(ecgData.ecg)

    

    return <InferenceGraph startPoint={0} length={ecgData.ecg.length} inference={ecgData.ecg} />;

}
export default Chart;