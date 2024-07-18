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
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl " >Stock Listing</h2>
      <br />
      {data.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {data.map((company, index) => (
            <li key={index} className="company-card bg-white p-6 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{company.company_name}</h2>
                <Button className="text-gray-500" color="light" pill>{company.stock}</Button>
              </div>
              <ul className="list-disc pl-4 mt-4">
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