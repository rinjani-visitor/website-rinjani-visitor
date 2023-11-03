'use client'
import { useState } from "react";

const StatusFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const handlePriceChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  console.log(selectedStatus)

  return (
    <div className="flex flex-col">
      <h3>Rating</h3>
      {
        [
          ["Availabel"],
          ["Unavailabel"],
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

export default StatusFilter