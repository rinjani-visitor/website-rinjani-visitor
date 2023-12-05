// import { useEffect, useState } from 'react';
// import { getRinjaniCultureAPI } from '@/libs/api';
import CardPackage from './CardPackage';

import React from 'react'
import axios from 'axios'

async function fetchData(){
  try {
    const res = await axios.get('https://test.rinjanivisitor.com/api/products')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default async function CardPackageList() {
  const fetchProducts = await fetchData()
  const data = fetchProducts.data
  
  return (
    <div className='col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit'>
      {data.map((item)=>(
        <CardPackage
        key={item.productId}
        name={item.title}
        price={item.lowestPrice}
        rating={item.rating}
        available={item.status}
        thumbnail={item.thumbnail}
        productId={item.productId}
      />
      ))}
    </div>
  )
}


// const CardPackageList = () => {
//   const [data, setData] = useState([])

//   // useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await getRinjaniCultureAPI('products', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       const { data } = await response.json();
//       setData(data)
//     } catch (error) {
//       console.log('Error fetch package: ', error);
//     }
//   };

//   fetchData()
//   // }, [])

//   return (
//     <div className='col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit'>
//       {data && data.length > 0 ? (
//         data?.map((data, index) => {
//           return (
//             // <p key={index}>{data.title}</p>
//             <CardPackage
//               key={data.productId}
//               name={data.title}
//               price={data.lowestPrice}
//               rating={data.rating}
//               available={data.status}
//               thumbnail={data.thumbnail}
//               productId={data.productId}
//             />
//           )
//         })
//       ) : (
//         <p className='text-center'>No data available</p>
//       )}
//     </div>
//   );
// };

// export default CardPackageList;
