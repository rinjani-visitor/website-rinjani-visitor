"use client"

import getBaseURL from "@/libs/getBaseURL"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toast'


export const CancelOrder = ({ id }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoad, setisLoad] = useState(false)

  const handlerModal = () => {
    setisLoad(false)
    setIsOpen(!isOpen)
  }

  const cancelOrder = async () => {
    setisLoad(true)
    try {
      const response = await fetch(getBaseURL(`order/${id}`), {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${getCookie('accessToken')}`
        },
      })

      const result = await response.json()
      console.log(result);

      if (!response.ok) {
        throw new Error('Failed to Cancel Order')
      }

    } catch (error) {
      toast.error(error.message);
    } finally {
      router.refresh()
      setIsOpen(false)
    }
  }

  return (
    <>
      <ToastContainer delay={5000} />
      <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-md" onClick={handlerModal}>Cancel</button>
      <div className={`w-full h-full bg-black/80 fixed -left-4 top-0 z-[9999999] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="bg-white text-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-md p-4">
          <h1 className="text-center text-xl font-semibold mb-4">Are You Sure to Cancel this Order?</h1>
          <div className="flex w-1/2 ms-auto space-x-4 text-white ">
            <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-md" onClick={handlerModal}>Cancel</button>
            <button onClick={cancelOrder} className="w-full bg-rinjaniVisitor-green py-2 rounded-md hover:bg-green-800">
              {
                isLoad ? (
                  <div className="custom-loader w-5 h-5 mx-auto"></div>
                ) : "Submit"
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
