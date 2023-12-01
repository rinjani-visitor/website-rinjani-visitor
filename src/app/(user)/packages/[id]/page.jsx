"use client"

import DetailPackage from "@/components/package/DetailPackage"

const Page = ({ params }) => {
  const { id } = params

  return (
    <DetailPackage id={id} />
  )
}

export default Page