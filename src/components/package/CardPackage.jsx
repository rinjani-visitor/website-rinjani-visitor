import Link from "next/link"

const CardPackage = ({ availabe = true }) => {
  return (
    <div className="p-3 border rounded-xl">
      <div className="aspect-square border rounded-lg">
      </div>
      <div className="flex justify-between mt-2">
        <h2 className="font-semibold">Rinjani Trip</h2>
        <p>4,9</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs">Start from $20/Night</p>
        {
          availabe ?
            <p>Avaible</p>
            : <p>Unavailable</p>
        }
      </div>
      <Link href={`/packages/asd`}>
        <button className="border w-full">
          asd
        </button>
      </Link>
    </div>
  )
}

export default CardPackage