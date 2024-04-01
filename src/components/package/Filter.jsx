"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categoryFilter = [
  { value: "rinjani", label: "Rinjani" },
  { value: "landscape", label: "Landscape" },
  { value: "culture", label: "Culture" },
];

const ratingFilter = [
  { value: 1, label: "1 Star" },
  { value: 2, label: "2 Star" },
  { value: 3, label: "3 Star" },
  { value: 4, label: "4 Star" },
  { value: 5, label: "5 Star" },
];

const statusFilter = [
  { value: true, label: "Available" },
  { value: false, label: "Unavailable" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const path = usePathname();
  const { replace } = useRouter();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  const handlerCategory = (e) => {
    const value = e.target.value;
    setCategory(value);

    value === "" ? params.delete("category") : params.set("category", value);

    const newPath = `${path}?${params.toString()}`;
    replace(newPath);
  };

  const handlerRating = (e) => {
    const value = e.target.value;
    setRating(value);
    value === "" ? params.delete("rating") : params.set("rating", value);
    const newPath = `${path}?${params.toString()}`;
    replace(newPath);
  };

  const handlerStatus = (e) => {
    const value = e.target.value;
    setStatus(value);

    value === "" ? params.delete("status") : params.set("status", value);
    const newPath = `${path}?${params.toString()}`;
    replace(newPath);
  };

  return (
    <div className="space-y-4 xl:w-56">
      <h1 className="text-lg font-medium text-rinjaniVisitor-green">
        Select Filter
      </h1>

      {path === "/packages" ? (
        <select
          className="w-full appearance-none py-1 px-2.5 rounded-md focus:outline-rinjaniVisitor-green md:text-base text-sm"
          value={category}
          onChange={handlerCategory}
        >
          <option value="" className="">
            All Category
          </option>
          {categoryFilter.map((item, index) => (
            <option className="" key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      ) : null}

      <select
        className="w-full appearance-none py-1 px-2.5 rounded-md focus:outline-rinjaniVisitor-green md:text-base text-sm"
        value={rating}
        onChange={handlerRating}
      >
        <option value="">All Rating</option>
        {ratingFilter.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <select
        className="w-full appearance-none py-1 px-2.5 rounded-md focus:outline-rinjaniVisitor-green md:text-base text-sm"
        value={status}
        onChange={handlerStatus}
      >
        <option value="">All Status</option>
        {statusFilter.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
