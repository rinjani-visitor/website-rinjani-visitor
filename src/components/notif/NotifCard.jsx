import Link from "next/link"
import BookingStatus from "../bookingStatus"

export default async function NotifCard({ bookingId, bookingDate, bookingStatus, bookingNote, title, rating, location }) {
  return (
    <div className='bg-green-700 p-4 rounded-lg text-white space-y-4 max-w-3xl mx-auto'>
      <div className='flex space-x-6 items-center justify-between'>
        <h2 className='font-semibold text-xl md:text-3xl'>Status Booking</h2>
        <BookingStatus status={bookingStatus}/>
      </div>
      <p className='font-normal max-sm:text-xs text-left'>{bookingNote}</p>
      <div className='text-slate-200 max-sm:text-xs text-left'>
        <p>Booking Id: {bookingId}</p>
        <p>Booking date: {bookingDate}</p>
      </div>
      <div className='md:flex max-sm:space-y-4 items-end justify-between'>
        <div>
          <h4 className='text-left font-semibold text-lg max-sm:text-sm'>{title}</h4>
          <div className='flex space-x-2 max-sm:text-xs'>
            <p>{rating}</p>
            <p>{location}</p>
          </div>
        </div>
        <div>
          <Link href={`/booking/${bookingId}`}>
            <button className='py-2 px-6 max-sm:text-[12px] text-black w-full text-sm bg-white rounded-md'>Booking detail</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
