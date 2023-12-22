'use client'

import InputFormSign from "@/components/InputFormSign"
import getBaseURL from "@/libs/getBaseURL"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import Image from "next/image"
import SelectCountry from "@/components/SelectCountry"
import { analytics } from "@/app/firebase/firebase-config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toast'


const Page = () => {
  const [data, setData] = useState(null)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [country, setCountry] = useState("")
  const [file, setFile] = useState(null)

  const router = useRouter()

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

        const { data } = await response.json();
        setData(data)
        setName(data.name);
        setCountry(data.country);
        setPhoneNumber(data.phoneNumber);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, [])

  const handlerName = (event) => {
    setName(event.target.value)
  }

  const handlerCountry = (event) => {
    setCountry(event.target.value)
  }

  const handlerPhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const updateUser = async (event) => {
    event.preventDefault()
    console.log(file);
    if (file) {
      const fileRef = ref(analytics, `rinjanivisitor/${file.name}`);
      uploadBytes(fileRef, file).then((data) => {
        getDownloadURL(data.ref).then(async (url) => {
          console.log("url", url);

          const body = {
            name: name === data?.name ? undefined : name,
            phoneNumber: phoneNumber === data?.phoneNumber ? undefined : phoneNumber,
            country: country === data?.country ? undefined : country,
            profilPicture: url
          }

          console.log(body);

          try {
            const response = await fetch(getBaseURL('users'), {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('accessToken')}`
              },
              body: JSON.stringify(body)
            });

            console.log(response);

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

            router.refresh()
          } catch (error) {
            toast.error(error.message)
          }
        });
      });
    } else {
      const body = {
        name: name === data?.name ? undefined : name,
        phoneNumber: phoneNumber === data?.phoneNumber ? undefined : phoneNumber,
        country: country === data?.country ? undefined : country,
      }

      try {
        const response = await fetch(getBaseURL('users'), {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('accessToken')}`
          },
          body: JSON.stringify(body)
        });

        console.log(response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);

        router.refresh()
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="space-y-6">
      <ToastContainer delay={5000} />
      <div className="space-y-3">
        <p>My Avatar (max. 2MB)</p>
        <div className="rounded-full aspect-square h-28 bg-white mb-6 overflow-hidden">
          <Image src={data?.profilPicture} width={200} height={200} alt='...' />
        </div>
        <input
          accept=".jpg, .jpeg, .png"
          type="file"
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-100 hover:file:bg-green-200"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <p className="text-xs text-slate-400">*format file jpg, jpeg, png.</p>
      </div>
      <form className="space-y-4" onSubmit={updateUser}>
        <InputFormSign
          title={`Name`}
          type={`text`}
          value={name}
          method={handlerName}
        />
        <InputFormSign title={`Email`} type={`email`} value={data?.email} disabled={true} />
        <InputFormSign title={`Phone Number`} type={`tel`} value={phoneNumber} method={handlerPhoneNumber} />
        <SelectCountry value={country} method={handlerCountry} />
        <div className="flex justify-between space-x-2">
          <button className="border w-full font-medium rounded-md h-10 text-red-500">Cancel</button>
          <button type="submit" className="border w-full font-medium rounded-md h-10 text-white bg-green-700 hover:bg-green-800">Update</button>
        </div>
      </form>
    </div>
  )
}

export default Page