import React from 'react'
import HeaderPackage from "@/components/HeaderPackage";
import CardPackageList from "@/components/package/CardPackageList";
import FilterPackage from "@/components/package/filter/Filter";

export default function page() {
  return (
    <div className="container">
        <div className='w-7/12 max-sm:w-full'>
            <HeaderPackage title={`Events`} subtitle={`Rinjani Visitor is a service to accommodate tourists in enjoying the beauty of Mount Rinjani and the culture of Lombok`} />
        </div>
        <div className='xl:flex xl:space-x-6 max-xl:space-y-6'>
            <div className="">
                <FilterPackage />
            </div>
            <div className="grid grid-cols-4 ">
                <div className="col-span-4 max-sm:col-span-6 max-lg:col-span-5 border border-red-600">
                <CardPackageList/>
                </div>
            </div>
        </div>
    </div>
  )
}
