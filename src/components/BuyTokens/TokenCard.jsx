import React from 'react';
import BuyToken from './BuyTokens';
import axios from 'axios';

const TokenCard = ({ imgSrc, imgAlt, title, value, assetId, tokenCount, maturityDate }) => {
  const BuyTokens = async(assetId) => {
    try {
        const formData = {
          assetId,
          NumberOfTokens: 5
        };
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const headers = {
            'authorization': `Bearer ${token}`
        };
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/buytokens', formData, { headers });
        console.log('Buy Token:', response.data);
        // Optionally, handle success (e.g., show a success message or redirect)
    } catch (error) {
        console.error('Error buying token:', error);
        // Optionally, handle error (e.g., show an error message)
    }
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imgSrc} alt={imgAlt} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          Current Value: ₹{value}
        </p>
        <p className="text-gray-700 text-base">
          Token Count: {tokenCount}
        </p>
        <p className="text-gray-700 text-base">
          Maturity Date: {new Date(maturityDate).toLocaleDateString()}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          onClick={() => BuyTokens(assetId)}
        >
          Buy Tokens
        </a>
      </div>
    </div>
  );
};

export default TokenCard;
