import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

const BTCTicker: React.FC = () => {
  const [price, setPrice] = useState<string>('Loading...');

  useEffect(() => { 
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const btcPrice = data.bitcoin.usd.toFixed(2);
        setPrice(`$${btcPrice}`);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
        setPrice('Error loading price');
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds to respect API rate limits

    return () => clearInterval(interval);
  }, []);

  return (
    
      <div className="ticker-container">
        <div className="ticker-decoration"></div>
        <div className="gear gear-left"></div>
        <div className="gear gear-right"></div>
        <div className="ticker-header">BTC Price</div>
        <div className="ticker-price">{price}</div>
      </div>    
   

  );
};

export default BTCTicker;
