import CardPackageList from '@/components/package/CardPackageList'
import getBaseURL from '@/libs/getBaseURL';
import React from 'react'

const fetchData = async (keyword) => {
  try {
    const response = await fetch(getBaseURL('products', { title: keyword }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Page = async ({ params }) => {
  const { keyword } = params

  const data = await fetchData(keyword)

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-semibold text-rinjaniVisitor-green mb-4'>Searh result : {keyword}</h1>
      <CardPackageList data={data} />
    </div>
  )
}

export default Page