import React, { useEffect, useState } from "react";
import Cardas from "./AssetsCard";
import "./Assets.css";

const Assets = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(""); //apiendpoint
        const data = await response.json();
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-page">
      {cards.map((card) => (
        <Cardas
          key={card.id}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default Assets;
