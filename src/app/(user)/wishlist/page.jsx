import CardPackage from "@/components/package/CardPackage";
import getBaseURL from "@/libs/getBaseURL";
import { getCookie, hasCookie } from "cookies-next"
import { cookies } from 'next/headers';
import Image from "next/image"

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL('users/favorite/all'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('accessToken', { cookies })}`,
      },
    });

    const { data } = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Page = async () => {
  const favorite = await fetchData()

  const cookie = hasCookie("accessToken", { cookies })
  if (!cookie) {
    return (
      <div className="container">
        <div>
          <Image src={`/6184159_3094350.svg`} alt="..." width={500} height={500} className="mx-auto" />
          <h1 className="text-center text-5xl font-medium bg-clip-text text-rinjaniVisitor-green">You&apos;re not Login</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl">
      <h1 className="mb-4 font-semibold text-rinjaniVisitor-green text-3xl">Your Whish List Package at Here</h1>
      <div className='grid md:grid-cols-1 grid-cols-1 gap-4'>
        {favorite?.length > 0 ? (
          favorite?.map((item) => (
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
          <p>Your Whist Lis Unavailable</p>
        )}
      </div>
    </div>
  );
};

export default Page;
