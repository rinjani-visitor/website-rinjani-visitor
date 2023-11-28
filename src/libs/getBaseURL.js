require('dotenv').config();

const getBaseURL = (endpoint, query) => {
  let url = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (endpoint) {
    url += `/${endpoint}`;
  }

  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }

  return url;
};

module.exports = getBaseURL;
