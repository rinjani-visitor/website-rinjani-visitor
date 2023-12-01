import CarouselPicture from "@/components/package/CarouselPicture";
import CardReview from "@/components/review/CardReview";
import getBaseURL from "@/libs/getBaseURL";
import { DotsThree, Heart, MapPin, ShareNetwork, Star } from "@phosphor-icons/react";
import axios from "axios"
import { useEffect, useState } from "react";

const DetailPackage = ({ id }) => {
  const [person, setPerson] = useState(0)
  const [data, setData] = useState([])
  const [like, setLike] = useState(data.userFavorited)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        getBaseURL(`products/${id}`),
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
          <h1 className="font-semibold text-3xl text-gray-800">{data.title}</h1>
          <div className="flex space-x-4 text-gray-800 font-normal">
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
        <div>
          <CarouselPicture images={data.Fotos} />
        </div>
        <form className="space-y-4">
          <div>
            <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">Price</h1>
            <p className="text-2xl font-semibold text-rinjaniVisitor-green">Start from ${data.lowestPrice}/person</p>
          </div>
          <div className="flex flex-wrap">
            {
              data.addOns?.map((item, index) => (
                <div key={index}>
                  <input type="checkbox" id={`${item}`} className="checked:bg-black peer" hidden />
                  <label htmlFor={`${item}`} className="mr-2 mb-2 peer-checked:bg-black border px-4 py-2">{item}</label>
                </div>
              ))
            }
          </div>
          <div>
            <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">Person</h1>
            <div className="flex space-x-4 w-fit overflow-hidden justify-center rounded-md">
              <button onClick={handlerReducePerson} className="w-10 bg-green-500 hover:bg-green-700 text-white"> - </button>
              <p className="w-7 text-center">{person}</p>
              <button onClick={handlerAddPerson} className="w-10 bg-green-500 hover:bg-green-700 text-white"> + </button>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-medium text-rinjaniVisitor-green/70">Offering Price</h1>
            <input type="text" className="border bg-transparent py-2 px-3 w-1/2 focus:outline-none rounded-md" placeholder="Input price ($40-$90/person)" />
          </div>
          <button type="submit" className="font-medium text-base w-full bg-green-500 hover:bg-green-600 h-10 transition rounded-lg text-white">Book Now</button>
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
            {
              data.Reviews && data.Reviews.length > 0 ?
                (
                  data.Reviews.map((item) => <CardReview key={item.id} name={item.name} body={item.messageReview} country={item.country} rating={item.rating} imageProfile={item.profilPicture} />)
                )
                : (<p>tidak ada review</p>)
            }
            {/* <CardReview />
            <CardReview />
            <CardReview /> */}
          </div>
        </div>
      </section>
    </div >
  )
}

export default DetailPackage