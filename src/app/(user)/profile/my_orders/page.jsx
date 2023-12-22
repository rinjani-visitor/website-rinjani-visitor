import { OrderCard } from "@/components/orderCard"
import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers"


const fetchData = async (id) => {
  try {
    const response = await fetch(getBaseURL(`order`),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('accessToken', { cookies })}`,
        },
      })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { data } = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

const Page = async () => {
  const data = await fetchData()

  return (
    <div className="col-span-2 max-w-xl space-y-4">
      {
        data?.map((item, index) => (
          <OrderCard {...item} key={index} />
        ))
      }
    </div>
  )
}

export default Page