'use client'

import { usePathname } from "next/navigation"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"
import StatusFilter from "./StatusFilter"

const Filter = () => {
  const pathName = usePathname()
  return (
    <div className=" xl:space-y-4 max-lg:flex max-lg:justify-between  max-lg:w-8/12 max-sm:w-full">
      {
        pathName.includes('package') ?
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