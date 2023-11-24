'use client'

import HeaderPackage from "@/components/HeaderPackage";
import CardPackage from "@/components/package/CardPackage";
import Filter from "@/components/package/filter/Filter";
import { getRinjaniCultureAPI } from "@/libs/api";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/MOCK_DATA.json`)
      .then(response => response.json())
      .then(jsonData => {
        // console.log(jsonData.length)
        setData(jsonData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const fetchPackage = async () => {
    const response = await getRinjaniCultureAPI('products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  return (
    <div className="container">
      <HeaderPackage title={`Package List`} subtitle={`Let’s start your journey with us to explore the beatiful rinjani`} />
      <div className="grid grid-cols-5">
        <div className="">
          <Filter />
        </div>
        <div className="col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit">
          {
            data.map((data, index) => {
              return (
                <CardPackage
                  key={index} n
                  name={data.package_name}
                  price={data.price}
                  available={data.available}
                  rating={data.rating}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
