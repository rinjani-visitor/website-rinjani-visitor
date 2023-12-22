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
import swal from 'sweetalert';


const Page = () => {
  const [data, setData] = useState(null)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [country, setCountry] = useState("")
  const [avatarUrl, setAvaterUrl] = useState("")
  const [file, setFile] = useState(null)
  const [isLoad, setIsLoad] = useState(false)
  const [message, setMessage] = useState('')

  const router = useRouter()

  const infoSuccess = message ? (
    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200" role="alert">
      {message}.
    </div>
  ) : null

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
        setAvaterUrl(data.profilPicture)
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
    setIsLoad(true)
    event.preventDefault()
    if (file) {
      const fileRef = ref(analytics, `rinjanivisitor/${file.name}`);
      uploadBytes(fileRef, file).then((data) => {
        getDownloadURL(data.ref).then(async (url) => {
          setAvaterUrl(url)

          const body = {
            name: name === data?.name ? undefined : name,
            phoneNumber: phoneNumber === data?.phoneNumber ? undefined : phoneNumber,
            country: country === data?.country ? undefined : country,
            profilPicture: url
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

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            setMessage("Success Updated Profile")
            router.refresh()
          } catch (error) {
            toast.error(error.message)
          } finally {
            setIsLoad(false)
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

        const data = await response.json()

        if (data.message === 'No data to update') {
          swal("No data change", "Yout data is up to date", "warning");
        }

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setMessage("Success Updated Profile")
        router.refresh()
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoad(false)
      }
    }

  }

  return (
    <div className="space-y-6">
      <ToastContainer delay={5000} />
      <div className="space-y-3">
        <p>My Avatar (max. 2MB)</p>
        <div className="rounded-full aspect-square h-28 bg-white mb-6 overflow-hidden">
          <Image src={avatarUrl} width={200} height={200} alt='...' />
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
        {infoSuccess}
        <button type="submit" className={`w-full font-medium rounded-md h-10 bg-rinjaniVisitor-green text-white `}>
          {
            isLoad ? (
              <div className="custom-loader w-6 h-6 mx-auto"></div>
            ) : "Update"
          }
        </button>
      </form>
    </div>
  )
}

export default Page