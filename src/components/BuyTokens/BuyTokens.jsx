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
        console.log("Data:", response.data[0].asset);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  // tokenId: token._id,
  // faceValue: token.faceValue,
  // currentValue: token.currentValue,
  // maturityDate: token.maturityDate,
  // createdAt: token.createdAt,
  // tokenCount: token.tokenCount,
  // asset: {
  //     assetId: asset._id,
  //     createdBy: asset.createdBy,
  //     plantType: asset.plantType,
  //     variety: asset.variety,
  //     plantingDate: asset.plantingDate,
  //     expectedHarvestDate: asset.expectedHarvestDate,
  //     cultivationMethod: asset.cultivationMethod,
  //     seedValue: asset.seedValue,
  //     numberOfSeeds: asset.numberOfSeeds,
  //     imageOfCrop: asset.imageOfCrop
  // }

  return (
    <div className="TokenCreation">
      <h1>Tokens with Asset Images</h1>
      <div className="token-container">
        {data.map((item) => (
          <div className="token-item" key={item.tokenId}>
            <TokenCard
              imgSrc={item.asset.imageOfCrop}
              imgAlt="Token Image"
              title={`Plant: ${item.asset.plantType}`}
              value={item.currentValue}
              tokenCount={item.tokenCount}
              maturityDate={item.maturityDate}
              assetId={item.asset.assetId}
              plantVariety={item.asset.variety}
              cultivationMethod={item.asset.cultivationMethod}
              baseValue={item.asset.seedValue}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyToken;
