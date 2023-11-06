import { showFormattedDate } from "@/libs/formatDate"
import { Star } from "@phosphor-icons/react"
import imagePotrait from '/public/assets/potrait.jpg'
import Image from "next/image"

const CardReview = ({ author, body, timestamp }) => {
  const date = new Date()
  return (
    <div className="grid grid-cols-6 border-b-2 border-slate-300 py-6">
      <div className="aspect-square w-20 rounded-full bg-white overflow-hidden">
        <Image src={imagePotrait} alt="" widht={200} height={200} />
      </div>
      <div className="col-span-5">
        <h1 className="font-medium text-lg">Cristine Lie</h1>
        <p>Indonesia</p>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-0.5">
            <Star size={18} weight="fill" />
            <Star size={18} weight="fill" />
            <Star size={18} weight="fill" />
            <Star size={18} weight="fill" />
            <Star size={18} />
          </div>
          <p>4</p>
          <div className="h-4 w-0.5 bg-slate-400"></div>
          <p>{showFormattedDate(date)}</p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur. Convallis est blandit eget facilisis morbi ornare penatibus est. Enim arcu facilisis egestas felis. Feugiat massa tristique malesuada id ac diam. Consectetur id pharetra ac massa maecenas.</p>
      </div>
    </div>
  )
}

export default CardReview