import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";
import Image from "next/image"

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL('users'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const Profile = async () => {
  const data = await fetchData()
  return (
    <div>
      <div className="rounded-full aspect-square h-28 bg-white mb-6 overflow-hidden">
        <Image src={data?.profilPicture} width={200} height={200} alt='...' />
      </div>
      <h1 className="text-xl font-semibold">{data?.name}</h1>
      <p className="mb-10">{data?.country}</p>
    </div>
  )
}

export default Profile