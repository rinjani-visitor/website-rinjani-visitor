'use client'

import { CurrencyDollar, Handshake, Leaf, ShieldCheck } from "@phosphor-icons/react"

const CardField = ({ title, body, order }) => {
  let iconField

  if (order === 1) {
    iconField = <ShieldCheck size={48} weight="fill" color="#32823a" />
  } else if (order === 2) {
    iconField = <CurrencyDollar  size={48} color="#32823a" weight="fill" />
  } else if (order === 3) {
    iconField = <Handshake size={48} weight="fill" color="#32823a" />
  } else if (order === 4) {
    iconField = <Leaf size={48} color="#32823a" weight="fill" />
  }

  return (
    <div className="bg-white p-6 space-y-4 hover:text-white group transition duration-200 rounded-xl hover:bg-green-600 shadow">
      <div className="aspect-square w-20 bg-[#C2E2C6] group-hover:bg-white rounded-md flex items-center justify-center">
        {iconField}
      </div>
      <h1 className="font-medium text-lg">{title}</h1>
      <p className="text-sm">
        {body}
      </p>
    </div>
  )
}

export default CardField