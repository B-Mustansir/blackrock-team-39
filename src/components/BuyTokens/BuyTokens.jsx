import React, { useEffect, useState, useNavigate } from 'react';
import axios from 'axios';
import TokenCard from './TokenCard';

const BuyToken = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/tokens')
            .then((response) => {
                setData(response.data);
                console.log(response.data)
            }
            )
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="TokenCreation container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tokens with Asset Images</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((item) => (
                    <TokenCard
                        key={item.tokenId}
                        imgSrc={item.asset.imageOfCrop}  // default or placeholder image
                        imgAlt="Token Image"
                        title={`Token ID: ${item.tokenId}`}
                        value={item.currentValue}
                        tokenCount={item.tokenCount}
                        maturityDate={item.maturityDate}
                        assetId={item.asset.assetId}
                    />
                ))}
            </div>
        </div>
    );
};

export default BuyToken;
