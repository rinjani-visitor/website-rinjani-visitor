'use client'

import InputFormSign from "@/components/InputFormSign"
import getBaseURL from "@/libs/getBaseURL"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import Image from "next/image"

const Page = () => {
  const [data, setData] = useState(null)
  const [userName, setUsername] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getBaseURL('users'), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('accessToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data.data)
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, [])

  const handlerUserName = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p>My Avatar (max. 2MB)</p>
        <div className="rounded-full aspect-square h-28 bg-white mb-6 overflow-hidden">
          <Image src={data?.profilPicture} width={200} height={200} alt='...' />
        </div>
        <input
          accept=".jpg, .jpeg, .png"
          type="file"
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-100 hover:file:bg-green-200"
        />
        <p className="text-xs text-slate-400">*format file jpg, jpeg, png.</p>
      </div>
      <form className="space-y-4">
        <InputFormSign
          title={`Username`}
          type={`text`}
          value={data?.name}
          method={handlerUserName}
        />
        <InputFormSign title={`Email`} type={`email`} value={data?.email} />
        <InputFormSign title={`Phone Number`} type={`tel`} value={data?.phoneNumber} />
        <InputFormSign title={`Country`} type={`text`} value={data?.country}/>
        <div className="flex justify-between space-x-2">
          <button className="border w-full font-medium rounded-md h-10 text-red-500">Cancel</button>
          <button className="border w-full font-medium rounded-md h-10 text-white bg-green-700 hover:bg-green-800">Save My Profile</button>
        </div>
      </form>
    </div>
  )
}

export default Page