import Link from "next/link"
import Available from "./available/Available"
import Unavailable from "./available/Unavailable"
import Image from "next/image"
import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';

const CardPackage = ({ name, price, rating, available, thumbnail, productId, location }) => {
  return (
    <div className="shadow-md rounded-xl bg-white md:flex h-max select-none">
      <div className="w-5/12 max-sm:w-full max-sm:rounded-t-lg  md:rounded-l-lg overflow-hidden">
        <Image src={thumbnail} alt="Rinjani" width={500} height={500} className="h-full max-h-56 object-cover"/>
      </div>

      <div className="w-full p-4 space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>

        <div className="space-y-3">
          <div className="">
            {
              available ?
                <Available />
                : <Unavailable />
            }
          </div>
          
          <div className="flex">
            <p>Rating: {rating}</p>
            <StarIcon className=" text-yellow-400"/>
          </div>
          
          <div className="flex text-slate-500 text-[14px] items-center">
            <PlaceIcon />
            <p>{location}</p>
          </div>
          
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/packages/${productId}`} className="bg-green-700 rounded-md px-4 py-2 text-xs font-medium text-white">
            Book Now
          </Link>
          <p className="">Start from <span className="font-semibold text-lg text-green-600">${price}</span>/Person</p>
        </div>
      </div>
      {/* <div className="p-4">
        <div className="items-center justify-between mt-2 mb-1">
          <h2 className="font-semibold text-xl">{name}</h2>
          <p className="text-xs">{rating}</p>
        </div>
        <div className="justify-between items-center mb-2">
          <p className="text-xs">Start from ${price}/Person</p>
          {
            available ?
              <Available />
              : <Unavailable />
          }
        </div>
        
      </div> */}
      
    </div>
  )
}

export default CardPackage