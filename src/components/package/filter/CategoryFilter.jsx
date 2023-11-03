'use client'
import { useState } from "react";
import RadioButton from "./RadioButton";

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <h3>Category</h3>
      {
        [
          ["All"],
          ["Rinjani"],
          ["Lanscape"],
          ["Culture"],
        ].map((title, index) => {
          return (
            <RadioButton key={index} title={title} name={`category`} method={handleCategoryChange} />
          )
        })
      }
    </div>
  )
}

export default CategoryFilter