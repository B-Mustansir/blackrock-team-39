import { React, useEffect, useState } from "react";
import BuyToken from "./BuyTokens";
import axios from "axios";
import { Button } from "flowbite-react";

const TokenCard = ({
  imgSrc,
  imgAlt,
  title,
  value,
  tokenCount,
  maturityDate,
  assetId,
  plantVariety,
  cultivationMethod,
  baseValue,
}) => {
  const BuyTokens = async (assetId) => {
    try {
      const formData = {
        assetId,
        NumberOfTokens: 5,
      };
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/buytokens",
        formData,
        { headers }
      );
      console.log("Buy Token:", response.data);

    } catch (error) {
      console.error("Error buying token:", error);

    }
  };

  return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
        <img className="w-full" src={imgSrc} alt={imgAlt} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p>Plant Varity: {plantVariety}</p>
          <p>Cultivation: {cultivationMethod}</p>
          <p>Base value: ₹{baseValue}</p>
          <p className="text-gray-700 text-base">Current Value: ₹{value}</p>
          <p className="text-gray-700 text-base">Token Count: {tokenCount}</p>
          <p className="text-gray-700 text-base"> Maturity Date: {new Date(maturityDate).toLocaleDateString()}</p>
        </div>
        <div className="px-6 pt-1 pb-6 flex items-center justify-between">
          <Button
            href="#"
            className="text-center text-sm font-medium text-white "
            onClick={() => BuyTokens(assetId)}
             outline gradientDuoTone="greenToBlue" pill
          >
            Buy Tokens
          </Button>
        </div>
      </div>
  );
};

export default TokenCard;
