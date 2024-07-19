import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import Chatbot from 'components/Chatbot/Chatbot';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

Chart.register(zoomPlugin);

const StockChart = () => {
  const [histData, setHistData] = useState([]);
  const [notification, setNotification] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    const fetchNotification = async () => {
      const response = await fetch(process.env.REACT_APP_FLASK_BACKEND_URL + '/notify' + '/AAPL'); // Replace with your API endpoint
      const data = await response.json();
      setNotification(data['final_score']);
    };

    const fetchData = async () => {
      const apiResponse = await fetch(process.env.REACT_APP_FLASK_BACKEND_URL + '/stock' + '/AAPL'); // Replace with your API endpoint
      const data = await apiResponse.json();
      setHistData(JSON.parse(data['hist_data']));
    };

    fetchNotification();
    fetchData();
  }, []);

  const displayDays = 125; // Number of days to display
  const slicedHistData = histData.slice(-displayDays);

  const dates = slicedHistData.map((_, index) => `${index + 1}`);
  const openPrices = slicedHistData.map(data => data.Open);
  const highPrices = slicedHistData.map(data => data.High);
  const lowPrices = slicedHistData.map(data => data.Low);
  const closePrices = slicedHistData.map(data => data.Close);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Open',
        data: openPrices,
        borderColor: 'rgba(0, 0, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        pointBackgroundColor: 'rgba(0, 0, 255, 1)',
        pointBorderColor: 'rgba(0, 0, 255, 1)',
        pointRadius: 3,
        borderWidth: 1,
        fill: false,
        tension: 0.4
      },
      {
        label: 'High',
        data: highPrices,
        borderColor: 'rgba(0, 255, 0, 0.5)',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        pointBackgroundColor: 'rgba(0, 255, 0, 1)',
        pointBorderColor: 'rgba(0, 255, 0, 1)',
        pointRadius: 3,
        borderWidth: 1,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Low',
        data: lowPrices,
        borderColor: 'rgba(255, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: 'rgba(255, 0, 0, 1)',
        pointRadius: 3,
        borderWidth: 1,
        fill: false,
        tension: 0.4
      },
      {
        label: 'Close',
        data: closePrices,
        borderColor: 'rgba(128, 0, 128, 0.5)',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        pointBackgroundColor: 'rgba(128, 0, 128, 1)',
        pointBorderColor: 'rgba(128, 0, 128, 1)',
        pointRadius: 3,
        borderWidth: 1,
        fill: false,
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
      legend: {
        display: true,
        position: 'top',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        },
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
        grid: {
          display: true,
        },
        suggestedMin: 150,
        suggestedMax: 200,
      },
    },
    elements: {
      point: {
        radius: 2,
      },
    },
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
                &nbsp; AAPL
                </a>
              </span>
            </p>
          </div>
          <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton>
        </div>
      </Banner>
      <h2 className="text-2xl pt-4">Stock Prices Chart</h2>
      <Line data={data} options={options} />
      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faCommentDots} size="2x" />
      </div>
    </div>
  );
};

export default StockChart;
