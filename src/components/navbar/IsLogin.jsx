import { Bell } from "@phosphor-icons/react"
import Link from "next/link"
import DropDownUser from "./DropDownUser"

const IsLogin = ({ name = "Daus" }) => {
  return (
    <div className="flex items-center space-x-4">
      <Link href={`/notification`} className="rounded-full p-2.5 bg-[#DBFFDE] "><Bell weight="bold" size={24} color="green" /></Link>
      <DropDownUser />
    </div>
  )
}

export default IsLogin