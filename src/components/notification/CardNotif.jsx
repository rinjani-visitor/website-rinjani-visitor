import { MapPin, Star } from "@phosphor-icons/react";

const CardNotif = () => {
  return (
    <div className="border max-w-3xl mx-auto p-6 rounded-3xl">
      <div>
        <h1 className="text-3xl font-semibold text-rinjaniVisitor-green">Status Order</h1>
      </div>
      <p>Thank you for the journey. Let’s find out another journey</p>
      <p>Order no:</p>
      <p>Booking Date:</p>
      <p>Rinjani Trip, Sembalun, East Lombok</p>
      <div className="flex space-x-4 text-gray-800 font-normal">
        <div className="flex items-center space-x-2"><Star size={24} weight="fill" /></div>
        <div className="flex items-center space-x-2"><MapPin size={24} weight="fill" /></div>
      </div>
    </div>
  )
}

export default CardNotif