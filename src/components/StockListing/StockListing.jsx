import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";

export function StockListing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FLASK_BACKEND_URL + '/get_score');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2>Stock Listing</h2>
      {data.length > 0 && (
        <ul className="list-none">
          {data.map((company, index) => (
            <li key={index} className="company-card mb-4">
              <br/>
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">{company.company_name}</h2>
                <Button className="text-gray-500" color="light" pill>{company.stock}</Button>
              </div>
              <ul className="list-disc pl-4 mt-2">
                <li className="text-gray-700">
                  <span className="text-gray-500 font-medium">ESG Score:</span> {company.esg_scores.total_esg_score}
                </li>
                <li className="text-gray-700">
                  <span className="text-gray-500 font-medium">Piotroski Score:</span> {company.pitroski}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      {data.length === 0 && <p>Loading data...</p>}
    </div>
  );
}

export default StockListing;