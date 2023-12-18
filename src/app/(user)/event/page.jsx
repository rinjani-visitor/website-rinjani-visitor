"use client"

import HeaderPackage from "@/components/HeaderPackage";
import CardPackageList from "@/components/package/CardPackageList";
import Filter from "@/components/package/Filter";
import getBaseURL from "@/libs/getBaseURL";
import axios from 'axios'
import { useEffect, useState } from "react";

const fetchData = async (category, rating, status, setData) => {
  try {
    const response = await axios.get(getBaseURL('products'), {
      params: { category, rating, status },
    });
    const { data } = response;
    setData(data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Page = () => {
  const [data, setData] = useState([])
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedStatus, setSelectedStatus] = useState(true)

  const handleRating = (event) => {
    setSelectedRating(event.target.value);
    fetchData("event", event.target.value, selectedStatus, setData);
  }

  const handleStatus = (event) => {
    setSelectedStatus(event.target.value);
    fetchData("event", selectedRating, event.target.value, setData);
  }

  useEffect(() => {
    fetchData("event", selectedRating, selectedStatus, setData);
  }, []); 

  return (
    <div className="container">
      <div className='w-7/12 max-sm:w-full'>
        <HeaderPackage title={`Homestay`} subtitle={`Rinjani Visitor is a service to accommodate tourists in enjoying the beauty of Mount Rinjani and the culture of Lombok`} />
      </div>
      <div className='xl:flex xl:space-x-6 max-xl:space-y-6'>
        <Filter rating={selectedRating} onRatingChange={handleRating} status={selectedStatus} onStatusChange={handleStatus} >
        </Filter>
        <div className="xl:flex-1">
          <CardPackageList data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
