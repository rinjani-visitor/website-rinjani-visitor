'use client'

import { usePathname } from "next/navigation"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"
import StatusFilter from "./StatusFilter"

const Filter = () => {
  const pathName = usePathname() === '/packages'
  console.log(pathName)
  return (
    <div className="space-y-4">
      {
        pathName ?
          <CategoryFilter />
          : ''
      }
      <PriceFilter />
      <RatingFilter />
      <StatusFilter />
    </div>
  )
}

export default Filter