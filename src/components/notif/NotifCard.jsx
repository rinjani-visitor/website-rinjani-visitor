import React from 'react'

export default function NotifCard() {
  return (
    <div className='bg-green-700 p-4 rounded-lg text-white space-y-4'>
        <div className='flex space-x-6 items-center'>
            <h2 className='font-semibold text-2xl'>Status order</h2>
            <p className='bg-slate-600 rounded-lg py-1 px-2 text-sm'>Status</p>
        </div>
        <h3 className='font-semibold max-sm:text-xs'>Your offer has been approved by admin and please complete your payment to complete this booking.</h3>
        <div className='text-slate-200 max-sm:text-xs'>
            <p>Booking no: 12BVUSU3991</p>
            <p>Booking date: 12-3-2023</p>
        </div>
        <div className='md:flex max-sm:space-y-4 items-end justify-between'>
            <div>
                <h4 className=' font-semibold text-lg max-sm:text-sm'>Rinjani Trip, Sembalun, East Lombok</h4>
                <div className='flex space-x-2 max-sm:text-xs'>
                    <p>4.9</p>
                    <p>Lombok, Indonesia</p>
                </div>
            </div>
            <div>
                <button className='py-2 px-6 max-sm:text-[12px] text-black text-sm bg-white rounded-md'>Booking detail</button>
            </div>
        </div>
        
    </div>
  )
}
