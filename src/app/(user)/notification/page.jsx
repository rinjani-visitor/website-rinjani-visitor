"use client"

import { useEffect, useState } from 'react';
import NotifCard from "@/components/notif/NotifCard";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL('booking'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('accessToken')}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch data:', response.status, response.statusText);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw error to propagate it to the caller
  }
};

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        // Handle error, if needed
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <div className="mb-12 text-center">
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="font-semibold text-3xl text-[green]">Notification</h1>
          <p className="font-normal">Heres your update</p>
        </div>
        <div className="space-y-4">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <NotifCard key={index} {...item} />
            ))
          ) : (
            <p>Data masih kosong</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Page;
