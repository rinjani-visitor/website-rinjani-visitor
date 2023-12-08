"use client"

import React, { useState } from 'react';
import Select from 'react-select';

const category = [
  { value: 'rinjani', label: 'Rinjani' },
  { value: 'lanscape', label: 'Lanscape' },
  { value: 'culture', label: 'Culture' },
];

const price = [
  { value: 'asc', label: 'Lowest' },
  { value: 'desc', label: 'Highest' },
];

const rating = [
  { value: 1, label: '1 Star' },
  { value: 2, label: '2 Star' },
  { value: 3, label: '3 Star' },
  { value: 4, label: '4 Star' },
  { value: 5, label: '5 Star' },
];

export default function Filter() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  return (
    <div className="">
      <Select
        defaultValue={selectedCategory}
        onChange={setSelectedCategory}
        options={category}
        placeholder={`Select Category Filter`}
        isSearchable={false}
      />

      <Select
        defaultValue={selectedPrice}
        onChange={setSelectedPrice}
        options={price}
        placeholder={`Select Price Filter`}
        isSearchable={false}
      />

      <Select
        defaultValue={selectedRating}
        onChange={setSelectedRating}
        options={rating}
        placeholder={`Select Rating Filter`}
        isSearchable={false}
      />
    </div>
  );
}