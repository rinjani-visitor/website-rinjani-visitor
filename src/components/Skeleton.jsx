import React from "react";

const Skeleton = () => {
  return [...Array(3)].map((_, index) => (
    <div
      key={index}
      className="mb-4 h-40 w-full animate-pulse rounded-xl bg-gray-200 shadow-md"
    ></div>
  ));
};

export default Skeleton;
