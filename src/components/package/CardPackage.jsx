import Link from "next/link"
import Available from "./available/Available"
import Unavailable from "./available/Unavailable"
import Image from "next/image"

const CardPackage = ({ name, price, rating, available, thumbnail, productId }) => {
  return (
    <div className="p-3 border rounded-xl bg-green-500">
      <div className="aspect-square rounded-lg overflow-hidden">
        <Image src={thumbnail} alt="Rinjani" width={500} height={500} className="h-full object-cover"/>
      </div>
      <div className="flex items-center justify-between mt-2 mb-1 text-white">
        <h2 className="font-medium truncate w-2/3">{name}</h2>
        <p className="text-xs">{rating}</p>
      </div>
      <div className="flex justify-between items-center mb-2 text-white">
        <p className="text-xs">Start from ${price}/Person</p>
        {
          available ?
            <Available />
            : <Unavailable />
        }
      </div>
      <div>
        <Link href={`/packages/${productId}`} className="bg-white rounded-md w-full py-1 text-xs text-center block font-medium text-green-600">
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default CardPackage