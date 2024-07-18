import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimateSharedLayout } from 'framer-motion';
import Chart from 'react-apexcharts';
import { UilTimes } from '@iconscout/react-unicons';

const AddBalance = () => {

  return (
    <div className="App">
      <Cards />
    </div>
  );
};

const Cards = () => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get(process.env.REACT_APP_FLASK_BACKEND_URL+'/stock'+'/AAPL'); // Replace with your actual API endpoint
            setStockData(response.data);
            console.log(response.data);
            console.log(stockData);
            } catch (error) {
            console.error('Error fetching stock data', error);
            }
        };
        
        fetchData();
        }, []);

  return (
    <div className="Cards">
      {stockData && stockData.map((data, id) => (
        <div className="parentContainer" key={id}>
          <Card
            title={data.title}
            color={data.color}
            barValue={data.barValue}
            value={data.value}
            png={data.png}
            series={data.series}
          />
        </div>
      ))}
    </div>
  );
};

const Card = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

const CompactCard = ({ param, setExpanded }) => {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
};

const ExpandedCard = ({ param, setExpanded }) => {
  const data = {
    options: {
      chart: {
        type: 'area',
        height: 'auto',
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: '#000',
        opacity: 0.35,
      },
      fill: {
        colors: ['#fff'],
        type: 'gradient',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        colors: ['white'],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: 'datetime',
        categories: param.series[0].data.map(item => item.date),
      },
    },
    series: param.series,
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'white' }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={data.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
};

export default AddBalance;