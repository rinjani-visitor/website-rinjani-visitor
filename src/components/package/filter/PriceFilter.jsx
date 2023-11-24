'use client'
import { useState } from "react";
import RadioButton from "./RadioButton";

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
            <RadioButton key={index} title={title} name={`price`} method={handlePriceChange} />
          )
        })
      }
    </div>
  )
}

export default PriceFilter