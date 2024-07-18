import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';

const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your API key

function AddBalance() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
        );
        const timeSeries = response.data['Time Series (Intraday)'];
        const latestData = Object.values(timeSeries)[0];
        setData(latestData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSymbol(symbol.toUpperCase()); // Ensure uppercase for API compatibility
  };

  const labels = data ? Object.keys(data) : [];
  const prices = data ? Object.values(data).map(d => parseFloat(d['4. close'])) : [];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: prices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 1,
      },
    ],
  };

  const StockDetails = () => (
    !data ? (
      <p>Loading details...</p>
    ) : (
      <ul>
        <li>Open: ${data['1. open']}</li>
        <li>High: ${data['2. high']}</li>
        <li>Low: ${data['3. low']}</li>
        <li>Close: ${data['4. close']}</li>
      </ul>
    )
  );

  const StockChart = () => (
    !data ? (
      <p>Loading chart...</p>
    ) : (
      <Chart type="line" data={chartData} options={{}} />
    )
  );

  return (
    <div className="App">
      <h1>Stock Chart and Details</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">Stock Symbol:</label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">Get Data</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {loading ? (
        <p>Fetching data...</p>
      ) : (
        <>
          <StockChart />
          <StockDetails />
        </>
      )}
    </div>
  );
}

export default AddBalance;