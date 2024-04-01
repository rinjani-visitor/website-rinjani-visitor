"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Prms = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const path = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState(searchParams.get("a"));
  const handlerValue = (e) => {
    setValue(e.target.value);
    params.set("a", e.target.value);
    replace(`${path}?${params.toString()}`);
  };
  return (
    <div>
      <select
        defaultValue={value}
        onChange={handlerValue}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/4"
      >
        <option value={""}>Choose a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
  );
};

export default Prms;
