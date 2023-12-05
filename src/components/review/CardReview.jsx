import { Star } from "@phosphor-icons/react"
import moment from "moment/moment"
import Image from "next/image"

const CardReview = ({ name, body, country, imageProfile, timestamp, rating }) => {
  const utcTimestamp = moment(timestamp, "YYYY-MM-DD HH:mm:ss").utc().format('YYYY-MM-DD HH:mm:ss');

  return (
    <div className="grid grid-cols-6 border-b-2 border-slate-300 py-6">
      <div className="aspect-square w-20 rounded-full bg-white overflow-hidden">
        <Image src={imageProfile} alt="" width={1000} height={1000} />
      </div>
      <div className="col-span-5">
        <h1 className="font-medium text-lg">{name}</h1>
        <p>{country}</p>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-0.5">
            {[...Array(rating)].map((_, index) => (
              <Star color="#232323" key={index} size={18} weight="fill" />
            ))}
            {[...Array(5 - rating)].map((_, index) => (
              <Star color="#232323" key={rating + index} size={18} />
            ))}
          </div>
          <p>{rating}</p>
          <div className="h-4 w-0.5 bg-slate-400"></div>
          <p>{utcTimestamp}</p>
        </div>
        <p>{body}</p>
      </div>
    </div>
  )
}

export default CardReview