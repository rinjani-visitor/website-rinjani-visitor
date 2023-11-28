'use client'

import DropDownUser from "./DropDownUser"

const IsLogin = ({ logoutCallBack }) => {
  return (
    <div className="flex items-center space-x-4">
      <DropDownUser logoutCallBack={logoutCallBack} />
    </div>
  )
}

export default IsLogin