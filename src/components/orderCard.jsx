import BookingStatus from "./bookingStatus"
import { MapPin } from "@phosphor-icons/react/dist/ssr";


export const OrderCard = ({ title, location, status = "on jo", orderId, orderApproveDate }) => {
  return (
    <div className="p-4 space-y-4 rounded-md shadow">
      <div className="flex space-x-6 items-center">
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>
      <div className="flex space-x-4 text-gray-700 font-normal ">
        <div className="flex items-center space-x-2"><MapPin size={24} weight="fill" /> <span>{location}</span></div>
      </div>
      <div className='flex space-x-6 items-center justify-between'>
        <h2 className='font-semibold text-rinjaniVisitor-green text-xl md:text-3xl'>Status Order</h2>
        <BookingStatus status={status} />
      </div>
      <div className="text-sm text-slate-600 space-y-1">
        <p>Order Id: {orderId}</p>
        <p>Order Approve Date: {orderApproveDate}</p>
      </div>
    </div>
  )
}
