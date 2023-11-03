const getRinjaniCultureAPI = async (resource, query) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
  const result = await response.json()

  return result
}

export {getRinjaniCultureAPI}