import DropDownUser from "./DropDownUser"

const IsLogin = ({ name = "Daus" }) => {
  return (
    <div className="flex items-center space-x-4">
      <DropDownUser />
    </div>
  )
}

export default IsLogin