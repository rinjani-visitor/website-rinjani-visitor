import { Star } from "@phosphor-icons/react"
import Image from "next/image"
import ReactStars from 'react-stars'
const CardReview = ({ name, body, country, imageProfile, timestamp, rating }) => {

  return (
    <div className=" p-4 rounded-md bg-green-700 text-white space-y-4">
      <div className="flex space-x-2 items-center">
        <div className="aspect-square w-20 rounded-full bg-white overflow-hidden">
          <Image src={imageProfile} alt="" width={1000} height={1000} />
        </div>
        <div className=" w-full">
          <h4 className="text-xl font-bold">{name}</h4>
          <p className="text-sm">{country}</p>
          <div className="flex  space-x-2">
            <ReactStars
              edit={false}
              value={rating}
              count={5}
              size={16}
              color1={'#ffffff'}
              color2={'#ffd700'} />
            <p>|</p>
            <p>{timestamp}</p>
          </div>
          
        </div>
      </div>
      <div>
        <p>{body}</p>
      </div>
      

    </div>
    // <div className="grid grid-cols-6 border-b-2 border-slate-300 border py-6 ">
    //   <div className="aspect-square w-20 rounded-full bg-white overflow-hidden">
    //     <Image src={imageProfile} alt="" width={1000} height={1000} />
    //   </div>
    //   <div className="col-span-5">
    //     <h1 className="font-medium text-lg">{name}</h1>
    //     <p>{country}</p>
    //     <div className="flex items-center space-x-2">
    //       <div className="flex space-x-0.5">
    //         {[...Array(rating)].map((_, index) => (
    //           <Star color="#232323" key={index} size={18} weight="fill" />
    //         ))}
    //         {[...Array(5 - rating)].map((_, index) => (
    //           <Star color="#232323" key={rating + index} size={18} />
    //         ))}
    //       </div>
    //       <p>{rating}</p>
    //       <div className="h-4 w-0.5 bg-slate-400"></div>
    //       <p>{timestamp}</p>
    //     </div>
    //     <p>{body}</p>
    //   </div>
    // </div>
  )
}

export default CardReview