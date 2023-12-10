import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const SearchInput = () => {
  const searchRef = useRef()
  const router = useRouter()

  const hanldeSeacrh = (event) => {
    event.preventDefault()
    const keyword = searchRef.current.value.trim()
    if (keyword) {
      router.push(`/search/${keyword}`)
    } else {
      alert('isi dulu dong')
    }
  }

  return (
    <div className="flex items-center h-10 rounded-lg w-full border-rinjaniVisitor-green">
      <input
        ref={searchRef}
        placeholder='Search Package'
        type="search"
        className="px-4 h-10 focus:outline-none flex-1 border-y-2 border-s-2 border-rinjaniVisitor-green rounded-s-lg"
        onKeyPress={(event) => event.key === 'Enter' && hanldeSeacrh(event)}
      />
      <button className='cursor-pointer bg-rinjaniVisitor-green h-full px-2 rounded-e-lg' onClick={hanldeSeacrh}>
        <MagnifyingGlass size={24} weight='bold' color='white' />
      </button>
    </div>
  )
}

export default SearchInput