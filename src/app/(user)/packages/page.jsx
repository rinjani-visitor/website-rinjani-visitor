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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
    fetchData(event.target.value, selectedRating, selectedStatus, setData);
  };

  const handleRating = (event) => {
    setSelectedRating(event.target.value)
    fetchData(selectedCategory, event.target.value, selectedStatus, setData);
  }

  const handleStatus = (event) => {
    setSelectedStatus(event.target.value)
    fetchData(selectedCategory, selectedRating, event.target.value, setData);
  }

  useEffect(() => {
    fetchData(selectedCategory, selectedRating, selectedStatus, setData);
  }, []);

  return (
    <div className="container">
      <div className='w-7/12 max-sm:w-full'>
        <HeaderPackage title={`Package`} subtitle={`Rinjani Visitor is a service to accommodate tourists in enjoying the beauty of Mount Rinjani and the culture of Lombok`} />
      </div>
      <div className='xl:flex xl:space-x-6 max-xl:space-y-6'>
        <Filter category={selectedCategory} onCategoryChange={handleCategory} rating={selectedRating} onRatingChange={handleRating} status={selectedStatus} onStatusChange={handleStatus} />
        <div className="xl:flex-1">
          <CardPackageList data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
