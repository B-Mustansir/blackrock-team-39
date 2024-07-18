import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Chatbot from 'components/Chatbot/Chatbot';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

const StockChart = () => {

  const [histData, sethistData] = useState([]);
  const [notification, setNotification] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    const fetchNotification = async () => {
      const response = await fetch(process.env.REACT_APP_FLASK_BACKEND_URL + '/notify' + '/AAPL'); // Replace with your API endpoint
      const data = await response.json();
      console.log(data);
      setNotification(data['final_score']);
      console.log(notification);
    };
    const fetchData = async () => {
      const apiResponse = await fetch(process.env.REACT_APP_FLASK_BACKEND_URL + '/stock' + '/AAPL'); // Replace with your API endpoint
      const data = await apiResponse.json();
      console.log(data);
      sethistData(JSON.parse(data['hist_data']));
      console.log(histData);
    };
    
    fetchNotification();
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
      <Banner>
        <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <div className="mx-auto flex items-center">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <MdAnnouncement className="mr-4 h-4 w-4" />
              <span className="[&_p]:inline">
                {notification}
                <a
                  href="https://flowbite.com"
                  className="inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"
                >
                  AAPL
                </a>
              </span>
            </p>
          </div>
          <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton>
        </div>
      </Banner>
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

