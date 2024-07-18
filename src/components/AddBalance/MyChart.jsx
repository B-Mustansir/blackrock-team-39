import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Chatbot from 'components/Chatbot/Chatbot';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StockChart = () => {

    const [histData, sethistData] = useState([]);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
      setIsChatbotOpen(!isChatbotOpen);
    };

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
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
          {
            label: 'High',
            data: highPrices,
            borderColor: 'green',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Low',
            data: lowPrices,
            borderColor: 'red',
            fill: false
          },
          {
            label: 'Close',
            data: closePrices,
            borderColor: 'purple',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Apple Inc. Stock Prices',
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Value'
            },
            suggestedMin: -10,
            suggestedMax: 200
          }
        }
      };

  return (
    <div>
      <h2>Stock Prices Chart</h2>
      <Line data={data} options={options} />
      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
      </div>
    </div>
  );
};

export default StockChart;

