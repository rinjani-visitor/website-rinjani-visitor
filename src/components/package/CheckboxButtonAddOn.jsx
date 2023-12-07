import React, { useState } from 'react';

const CheckboxButtonAddOn = ({ id, label, selectedValues, setSelectedValues }) => {
  const isChecked = selectedValues.includes(id);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setSelectedValues((prevValues) => prevValues.filter((value) => value !== id));
    } else {
      setSelectedValues((prevValues) => [...prevValues, id]);
    }
  };

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-500"
        checked={isChecked}
        onChange={handleCheckboxChange}
        hidden
      />
      <span className={`select-none border-[3px] rounded mr-4 mb-2 w-[160px] text-center py-2 ${isChecked ? 'text-green-700 font-semibold border-green-700' : 'text-slate-400'}`}>{label}</span>
    </label>
  );
};

export default CheckboxButtonAddOn;
