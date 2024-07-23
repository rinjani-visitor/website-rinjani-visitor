import React, { useState } from "react";

const CheckboxButtonAddOn = ({
  id,
  label,
  value,
  selectedValues,
  setSelectedValues,
  setAddOnsPrice,
}) => {
  const isChecked = selectedValues.includes(id);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setSelectedValues((prevValues) =>
        prevValues.filter((value) => value !== id),
      );
      setAddOnsPrice((prevValue) => prevValue - value);
    } else {
      setSelectedValues((prevValues) => [...prevValues, id]);
      setAddOnsPrice((prevValue) => prevValue + value);
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
      <span
        className={`mb-2 mr-4 px-2 select-none rounded border-[3px] py-2 text-center ${isChecked ? "border-green-700 font-semibold text-green-700" : "text-slate-400"}`}
      >
        {label} (${value})
      </span>
    </label>
  );
};

export default CheckboxButtonAddOn;
