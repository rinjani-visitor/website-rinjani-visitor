"use client"

import getBaseURL from "@/libs/getBaseURL"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

const CancelBooking = ({ id }) => {
  const [isOpen, setisOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const router = useRouter()

  const cancelBooking = async () => {
    setIsLoad(true)
    try {
      const response = await fetch(getBaseURL(`booking/${id}`),
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })

      if (response.ok) {
        router.push('/notification')
        router.refresh()
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoad(false)
    }
  }

  return (
    <>
      <button type="button" className="text-red-600 text-sm hover:underline" onClick={() => setisOpen(!isOpen)}>Cancel this Booking</button>
      <div className={`absolute w-full h-screen left-0 top-0 z-[9999] justify-center items-center bg-black bg-opacity-80 ${isOpen ? "flex" : "hidden"}`}>
        <div className="bg-white p-4 max-w-md w-full rounded-md">
          <h1 className="text-center text-xl font-medium">Are You Sure to Cancel this Booking?</h1>
          <div className="flex justify-end space-x-4 mt-2">
            <button className="px-3 py-1 border-red-700 border text-red-700 rounded-md" onClick={() => setisOpen(false)} type="button">Cancel</button>
            <button className="px-3 py-1 w-24 bg-rinjaniVisitor-green text-white rounded-md" type="button" onClick={cancelBooking}>
              {
                isLoad ? (
                  <div className="custom-loader w-4 h-4 mx-auto"></div>
                ) : "Submit"
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CancelBooking