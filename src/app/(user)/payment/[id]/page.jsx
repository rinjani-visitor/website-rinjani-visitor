"use client"

import InputFormSign from '@/components/InputFormSign'
import getBaseURL from '@/libs/getBaseURL'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toast'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { analytics } from '@/app/firebase/firebase-config'
import { useRouter } from 'next/navigation'

const Page = ({ params }) => {
  const { id } = params
  const router = useRouter()
  const [payment, setPayment] = useState('')
  const [message, setMessage] = useState('')
  const [accountName, setAccountName] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [isLoad, setIsLoad] = useState(false)
  const [isLoadPayment, setIsLoadPayment] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [data, setData] = useState([])

  const errorInfo = messageError ? (
    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 " role="alert">
      {messageError}
    </div>
  ) : null

  const handlerPaymentMethod = (event) => {
    setPayment(event.target.value)
  }

  const infoSuccess = message ? (
    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200" role="alert">
      {message}.
    </div>
  ) : null

  const updatePaymenMethod = async (event) => {
    event.preventDefault()
    const body = {
      bookingId: id,
      method: payment
    }

    try {
      setIsLoadPayment(true)
      const response = await fetch(getBaseURL(`payment`),
        {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
          body: JSON.stringify(body)
        })


      const data = await response.json()

      if (!response.ok) {
        throw new Error('Failed to update payment method')
      }

      if (response.ok) {
        const { message } = data
        setMessage(`${message} ${payment}`)
        setIsLoadPayment(false)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const submitPayment = async (event) => {
    setMessageError('')
    event.preventDefault()
    if (file) {
      setIsLoad(true)
      const fileRef = ref(analytics, `rinjanivisitor/${file.name}`);
      uploadBytes(fileRef, file).then((data) => {
        getDownloadURL(data.ref).then(async (url) => {
          const body = {
            bookingId: id,
            bankName: payment === 'Bank' ? accountName : undefined,
            bankAccountName: payment === 'Bank' ? name : undefined,
            wiseEmail: payment === 'Wise' ? accountName : undefined,
            wiseAccountName: payment === 'Wise' ? name : undefined,
            imageProofTransfer: url
          }
          try {
            const response = await fetch(getBaseURL(`payment/${payment.toLowerCase()}`), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('accessToken')}`
              },
              body: JSON.stringify(body)
            });


            if (!response.ok) {
              setMessageError('Please Update Payment Method!')
              return
            }

            router.push(`/booking/${id}`)
            setIsLoad(false)
          } catch (error) {
            toast.error(error.message)
          } finally {
            setIsLoad(false)
          }
        });
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getBaseURL(`payment/${id}`), {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${getCookie('accessToken')}`
          }
        })

        const { data } = await response.json()
        setData(data)
      } catch (error) {
        console.log('Error Fetching:', error.message);
      }
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 my-2">
      <ToastContainer delay={5000} />
      <h1 className="text-rinjaniVisitor-green text-center text-3xl font-semibold">Payment</h1>
      <p className="text-center">Kidly Follow the instructions below</p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <form className='' onSubmit={updatePaymenMethod}>
          <h1 className='text-center font-medium text-rinjaniVisitor-green text-lg'>Choice Payment Method</h1>
          <div className='my-2'>
            <p>Tax: {data?.tax}%</p>
            <p>Subtotal : ${data?.subTotal} USD</p>
            <p>Total: ${data?.total} USD</p>
          </div>
          <div className="flex flex-col mt-2 space-y-4">
            <label className="flex items-start space-x-4">
              <input
                required
                type="radio"
                value="Wise"
                name="payment"
                onChange={handlerPaymentMethod}
              />
              <Image src={'/assets/wise.png'} width={250} height={250} alt='wise logo' className='w-40' />
              <div className=''>
                <p className='text-sm'>Name</p>
                <p className='font-medium text-rinjaniVisitor-green'>Renadi</p>
                <p className='text-sm'>Wise Email</p>
                <p className='font-medium text-rinjaniVisitor-green'>jetsbudaya@gmail.com</p>
              </div>
            </label>
            <label className='flex items-start space-x-4'>
              <input
                required
                type="radio"
                value="Bank"
                name="payment"
                onChange={handlerPaymentMethod}
              />
              <Image src={'/assets/ntb.png'} width={250} height={250} alt='wise logo' className='w-40' />
              <div className=''>
                <p className='text-sm'>Name</p>
                <p className='font-medium text-rinjaniVisitor-green'>Renadi</p>
                <p className='text-sm'>Account Number</p>
                <p className='font-medium text-rinjaniVisitor-green'>0080200191280</p>
              </div>
            </label>
          </div>
          <p className='my-2 text-sm'>Please convert ${data?.total} USD to IDR using this tool <Link className='text-rinjaniVisitor-green underline font-medium' href={`https://wise.com/id/currency-converter/usd-to-idr-rate`}>wise-curreny-converter</Link> before transfer</p>
          {infoSuccess}
          <button className='mt-2 bg-rinjaniVisitor-green text-white w-full py-2 rounded-md hover:bg-green-800' type='submit'>
            {
              isLoadPayment ? (
                <div className='mx-auto w-6 h-6 custom-loader'></div>
              ) : "Update Payment Method"
            }
          </button>
        </form>

        <div className=''>
          <form className='space-y-4' onSubmit={submitPayment}>
            <p className='font-medium'>Upload Receipt Transfer</p>
            <input
              required
              accept=".jpg, .jpeg, .png"
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-100 hover:file:bg-green-200"
              onChange={(event) => setFile(event.target.files[0])}
            />
            <InputFormSign
              title={`${payment === 'Wise' ? 'Wise Email' : 'Bank Name'}`}
              type={`${payment === 'Wise' ? 'email' : 'text'}`}
              method={(event) => setAccountName(event.target.value)}
              placeholder={`${payment === 'Wise' ? 'dausnrt@gmail.com' : 'BNI, NTB, BCA'}`}
            />
            <InputFormSign
              title={`Name`}
              type={`text`}
              method={(event) => setName(event.target.value)}
              placeholder={`Your name wise or bank account`}
            />
            {errorInfo}
            <button className='mt-2 bg-rinjaniVisitor-green text-white w-full py-2 rounded-md hover:bg-green-800' type='submit'>
              {
                isLoad ? (
                  <div className='mx-auto w-6 h-6 custom-loader'></div>
                ) : "Submit"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page