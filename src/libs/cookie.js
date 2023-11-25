import { getCookie } from "cookies-next";

const getAccessToken = () => {
  try {
    const token = getCookie('accessToken')
    return token
  } catch (error) {
    console.log('Error get Token');
  }
}

export {getAccessToken}