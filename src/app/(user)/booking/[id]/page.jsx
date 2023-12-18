
const page = ({ params }) => {
  const { id } = params
  return (
    <div className="container">
      {id}
    </div>
  )
}

export default page