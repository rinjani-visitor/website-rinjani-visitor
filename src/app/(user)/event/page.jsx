import React from 'react'
import HeaderPackage from "@/components/HeaderPackage";
import CardPackageList from "@/components/package/CardPackageList";
import Filter from '@/components/package/Filter';

export default function page() {
  return (
    <div className="container">
      <div className='w-7/12 max-sm:w-full'>
        <HeaderPackage title={`Events`} subtitle={`Rinjani Visitor is a service to accommodate tourists in enjoying the beauty of Mount Rinjani and the culture of Lombok`} />
      </div>
      <div className='xl:flex xl:space-x-6 max-xl:space-y-6'>
        <div className="space-y-4 xl:w-56">
          <Filter />
        </div>
        <div className="xl:flex-1">
          <CardPackageList />
        </div>
      </div>
    </div>
  )
}
