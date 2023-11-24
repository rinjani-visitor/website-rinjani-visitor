const getRinjaniCultureAPI = async (resource, options, query) => {
  try {
    let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`

    if (query) {
      const queryString = new URLSearchParams(query).toString();
      apiUrl = `${apiUrl}?${queryString}`;
    }

    const response = await fetch(apiUrl, {
      ...options,
    });

    if (!response.ok) {
      process.env.NEXT_PUBLIC_API_BASE_URL
    }

    return response
  } catch (error) {
    // Handle errors here, such as network errors or API errors
    console.error('Error fetching data:', error);
    // Rethrow the error for the caller to handle
    throw error;
  }
}

export { getRinjaniCultureAPI }