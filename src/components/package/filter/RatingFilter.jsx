'use client'
import { useState } from "react";

const RatingFilter = () => {
  const [selectedRating, setSelectedRating] = useState('');

  const handlePriceChange = (event) => {
    setSelectedRating(event.target.value);
  };

  console.log(selectedRating)

  return (
    <div className="flex flex-col">
      <h3>Rating</h3>
      {
        [
          ["1 Star"],
          ["2 Star"],
          ["3 Star"],
          ["4 Star"],
          ["5 Star"],
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

export default RatingFilter