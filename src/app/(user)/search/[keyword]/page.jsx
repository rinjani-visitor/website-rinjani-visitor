import CardPackageList from '@/components/package/CardPackageList'
import React from 'react'

const page = ({ params }) => {
  const { keyword } = params

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-semibold text-rinjaniVisitor-green mb-4'>Hasil Pencarian : {keyword}</h1>
      <CardPackageList query={{ title: `${keyword}` }} />
    </div>
  )
}

export default page