import React, { useEffect, useState } from "react";
import axios from "axios";
import TokenCard from "./TokenCard";
import "./buytoken.css";

const BuyToken = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/tokens")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="TokenCreation">
      <h1>Tokens with Asset Images</h1>
      <div className="token-container">
        {data.map((item) => (
          <div className="token-item" key={item.tokenId}>
            <TokenCard
              imgSrc={item.asset.imageOfCrop}
              imgAlt="Token Image"
              title={`Token ID: ${item.tokenId}`}
              value={item.currentValue}
              tokenCount={item.tokenCount}
              maturityDate={item.maturityDate}
              assetId={item.asset.assetId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyToken;
