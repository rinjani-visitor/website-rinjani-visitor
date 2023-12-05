import React from 'react'

const page = ({ params }) => {
  const { keyword } = params


  return (
    <div>{keyword}</div>
  )
}

export default page