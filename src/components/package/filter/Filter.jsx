'use client'

import { usePathname } from "next/navigation"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import RatingFilter from "./RatingFilter"
import StatusFilter from "./StatusFilter"

const Filter = () => {
  const pathName = usePathname()
  return (
    <div className="space-y-4">
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