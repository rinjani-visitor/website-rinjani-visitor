import getBaseURL from "@/libs/getBaseURL";
import { getCookie } from "cookies-next";

const fetchData = async () => {
  try {
    const response = await fetch(getBaseURL('booking'), {
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
    console.log(data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

const NotifCardList = async () => {
  const data = await fetchData()

  return (
    <div>NotifCardList</div>
  )
}

export default NotifCardList