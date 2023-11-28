'use client'

import CardReview from "@/components/review/CardReview";
import getBaseURL from "@/libs/getBaseURL";
import { DotsThree, Heart, MapPin, ShareNetwork, Star } from "@phosphor-icons/react";
import axios from "axios"
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = params
  const [person, setPerson] = useState(0)
  const [data, setData] = useState([])
  const [like, setLike] = useState(data.userFavorited)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        getBaseURL(`products/rinjani/${id}`),
        {
          headers: {
            'Content-Type': 'application/json',
            // Tambahkan header lainnya sesuai kebutuhan Anda
          },
        }
      )
      let { data } = response
      data = data.data
      console.log(data);
      setData(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handlerAddPerson = (event) => {
    event.preventDefault()
    setPerson(person + 1)
  }

  const handlerReducePerson = (event) => {
    event.preventDefault()
    person != 0 ?
      setPerson(person - 1)
      : setPerson(person)
  }

  return (
    <div className="container space-y-8">
      <section className="grid grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm capitalize">Packages/{data.category}/{data.subCategory}</p>
          <h1 className="font-semibold text-3xl">{data.title}</h1>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2"><Star size={24} weight="fill" /> <span>{data.rating}</span></div>
            <div className="flex items-center space-x-2"><MapPin size={24} weight="fill" /> <span>{data.location}</span></div>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <button onClick={() => setLike(!like)} className="transition-all ease-in-out">
            {
              like ?
                <Heart size={32} weight="fill" />
                : <Heart size={32} className="" />
            }
          </button>
          <ShareNetwork size={32} weight="fill" />
          <DotsThree size={32} weight="bold" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6">
        <div>foto</div>
        {/* <Carosel /> */}
        <form className="space-y-4">
          <div>
            <p>Price</p>
            <h1>$40-$55/Person</h1>
          </div>
          <div>
            {/* <p>Select Data & Time</p> */}
            <div className="grid grid-cols-2 space-x-4">
              <div
                className="relative"
                data-te-datepicker-init
                data-te-inline="true"
                data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Select a date" />
                <label
                  // for="floatingInput"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Select a date</label>
              </div>
              <div className="relative" data-te-timepicker-init data-te-input-wrapper-init>
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="form1" />
                <label
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Select a time</label>
              </div>
            </div>
          </div>
          <div className="select-none">
            <div>
              <input type="checkbox" id="1" className="checked:bg-black peer" hidden />
              <label htmlFor="1" className="peer-checked:bg-black">asd</label>
            </div>
          </div>
          <div>
            <p>Person</p>
            <div className="flex space-x-4 w-fit overflow-hidden justify-center rounded-md">
              <button onClick={handlerReducePerson} className="w-10 bg-green-500 hover:bg-green-700 text-white"> - </button>
              <p className="w-7 text-center">{person}</p>
              <button onClick={handlerAddPerson} className="w-10 bg-green-500 hover:bg-green-700 text-white"> + </button>
            </div>
          </div>
          <div>
            <p>Offering Price</p>
            <input type="text" className="border bg-transparent py-2 px-3 w-1/2 focus:outline-none rounded-md" placeholder="Input price ($40-$90/person)" />
          </div>
          <button className="font-medium text-base w-full bg-green-500 hover:bg-green-600 h-10 transition rounded-lg text-white">Book Now</button>
        </form>
      </section>

      <section className="grid grid-cols-2">
        <div className="space-y-4">
          <div>
            <h1 className="font-semibold text-2xl text-green-500">Description</h1>
            <p>{data.description}</p>
          </div>
          <div>
            <h1 className="font-semibold text-2xl text-green-500">Itenary</h1>
            <ul className="list-disc list-inside">
              <li>Lorem</li>
              <li>Lorem</li>
            </ul>
          </div>
          <div>
            <h1 className="font-semibold text-2xl text-green-500">Facility</h1>
            <ul className="list-disc list-inside">
              {
                data.facilities?.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))
              }
            </ul>
          </div>
          <div>
            <h1 className="font-semibold text-2xl text-green-500">Review</h1>
            <CardReview />
            <CardReview />
            <CardReview />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page