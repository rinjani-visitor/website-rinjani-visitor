import { useEffect, useState } from 'react';
import { getRinjaniCultureAPI } from '@/libs/api';
import CardPackage from './CardPackage';

const CardPackageList = () => {
  const [data, setData] = useState([])

  // useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await getRinjaniCultureAPI('products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { data } = await response.json();
      setData(data)
    } catch (error) {
      console.log('Error fetch package: ', error);
    }
  };

  fetchData()
  // }, [])

  return (
    <div className='col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 h-fit'>
      {data && data.length > 0 ? (
        data?.map((data, index) => {
          return (
            // <p key={index}>{data.title}</p>
            <CardPackage
              key={data.productId}
              name={data.title}
              price={data.lowestPrice}
              rating={data.rating}
              available={data.status}
              thumbnail={data.thumbnail}
              productId={data.productId}
            />
          )
        })
      ) : (
        <p className='text-center'>No data available</p>
      )}
    </div>
  );
};

export default CardPackageList;
