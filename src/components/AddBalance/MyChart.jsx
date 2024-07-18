import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const StockChart = () => {

    const [histData, sethistData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const apiResponse = await fetch(process.env.REACT_APP_FLASK_BACKEND_URL+'/stock'+'/AAPL'); // Replace with your API endpoint
          const data = await apiResponse.json();
          console.log(data);
          sethistData(JSON.parse(data['hist_data']));
          console.log(histData);
        };
    
        fetchData();
      }, []);

    const dates = histData.map((_, index) => `Day ${index + 1}`);
    const openPrices = histData.map(data => data.Open);
    const highPrices = histData.map(data => data.High);
    const lowPrices = histData.map(data => data.Low);
    const closePrices = histData.map(data => data.Close);
    
    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Open',
          data: openPrices,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
        },
        {
          label: 'High',
          data: highPrices,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.1)',
        },
        {
          label: 'Low',
          data: lowPrices,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
        },
        {
          label: 'Close',
          data: closePrices,
          borderColor: 'purple',
          backgroundColor: 'rgba(128, 0, 128, 0.1)',
        },
      ],
    };
    
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Stock Prices',
        },
      },
    };

  return (
    <div>
      <h2>Stock Prices Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default StockChart;

