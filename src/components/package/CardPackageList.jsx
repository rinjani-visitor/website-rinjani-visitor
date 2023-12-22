import CardPackage from './CardPackage';

export default async function CardPackageList({ data }) {
  return (
    <div className='grid md:grid-cols-1 grid-cols-1 gap-4'>
      {data?.length > 0 ? (
        data.map((item) => (
          <CardPackage
            key={item.productId}
            name={item.title}
            price={item.lowestPrice}
            rating={item.rating}
            available={item.status}
            thumbnail={item.thumbnail}
            productId={item.productId}
            location={item.location}
          />
        ))
      ) : (
        <p>Package Unavailable</p>
      )}
    </div>
  )
}