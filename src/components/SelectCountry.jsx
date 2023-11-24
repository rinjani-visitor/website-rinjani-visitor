import { useState } from "react";
import { getDataCountry } from "@/utilities/Country";

const SelectCountry = ({value, method}) => {
  const countries = getDataCountry()

  return (
    <div className="space-y-4">
      <p className="font-medium">Select Country</p>
      <select value={value}
        onChange={method}
        className="bg-green-100 px-2.5 rounded-lg w-full h-10 outline outline-green-300 focus:ring focus:ring-green-500 focus:outline-none text-lg font-normal"
        id="basic-usage"
        required={true}
      >
        <option disabled value=''>Select Country</option>
        {
          countries.map((country, index) => {
            return (
              <option key={index}>
                {country.country}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

export default SelectCountry
