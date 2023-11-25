'use client'

import HeaderPackage from "@/components/HeaderPackage";
import CardPackage from "@/components/package/CardPackage";
import Filter from "@/components/package/filter/Filter";
import { getRinjaniCultureAPI } from "@/libs/api";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState(getCookie('accessToken'))
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRinjaniCultureAPI('products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const { data } = await response.json();
        console.log(data);
        setData(data)
      } catch (error) {
        console.log('Error fetch package: ', error);
      }
    };

    fetchData()
  }, [])

  console.log(data);

  return (
    <div className="container">
      <HeaderPackage title={`Package List`} subtitle={`Let’s start your journey with us to explore the beatiful rinjani`} />
      <div className="grid grid-cols-5">
        <div className="">
          <Filter />
        </div>
        <div className="col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit">
          {/* {
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
          } */}

          {
            data?.map((data, index) => {
              return (
                // <p key={index}>{data.title}</p>
                <CardPackage
                  key={data.productId}
                  name={data.title}
                  price={data.lowestPrice}
                  rating={data.rating}
                  available={data.status}
                  thumbnail={data.thumbnail}
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
