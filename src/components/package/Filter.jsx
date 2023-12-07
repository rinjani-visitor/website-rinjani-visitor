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

export default function Filter() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={category}
        placeholder={`Select Category`}
        isSearchable={true}
      />
      {/* <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={price}
        placeholder={`Select Price`}
      /> */}
    </div>
  );
}