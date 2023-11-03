'use client'
import { useState } from "react";

const PriceFilter = () => {
  const [selectedPrice, setSelectedPrice] = useState('');

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  console.log(selectedPrice)

  return (
    <div className="flex flex-col">
      <h3>Price</h3>
      {
        [
          ["Lowest"],
          ["Highest"],
        ].map((title, index) => {
          return (
            <label key={index} className="flex items-center space-x-1">
              <input
                type="radio"
                name="price"
                value={title}
                onChange={handlePriceChange}
              />
              <p>
                {title}
              </p>
            </label>
          )
        })
      }
    </div>
  )
}

export default PriceFilter