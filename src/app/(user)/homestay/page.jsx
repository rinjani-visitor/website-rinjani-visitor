"use client";

import HeaderPackage from "@/components/HeaderPackage";
import CardPackage from "@/components/package/CardPackage";
import Filter from "@/components/package/Filter";
import getBaseURL from "@/libs/getBaseURL";
import { useEffect, useState } from "react";

const Page = ({ searchParams }) => {
  const rating = searchParams?.rating || "";
  const status = searchParams?.status || "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          getBaseURL("products", {
            category: "homestay",
            rating: rating,
            status: status,
          })
        );

        const res = await response.json();
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rating, status]);

  return (
    <div className="container">
      <div className="w-7/12 max-sm:w-full">
        <HeaderPackage
          title={`Homestay`}
          subtitle={`Rinjani Visitor is a service to accommodate tourists in enjoying the beauty of Mount Rinjani and the culture of Lombok`}
        />
      </div>
      <div className="xl:flex xl:space-x-6 max-xl:space-y-6">
        <Filter />
        <div className="xl:flex-1">
          {/* Conditionally render loading indicator */}
          {loading ? (
            <div className="shadow-md rounded-xl bg-gray-200 animate-pulse w-full h-40"></div>
          ) : (
            // <p>Loading...</p>
            <div className="grid md:grid-cols-1 grid-cols-1 gap-4">
              {data?.length > 0 ? (
                data.map((item) => (
                  <CardPackage
                    key={item.productId}
                    name={item.title}
                    price={item.lowestPrice}
                    rating={item.rating}
                    available={item.status}
                    thumbnail={item.thumbnail}
                    productId={item.productId}
                    location={item.location}
                    {...item}
                  />
                ))
              ) : (
                <p>Package Unavailable</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
