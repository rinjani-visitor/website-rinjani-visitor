'use client'

import InputFormSign from "@/components/InputFormSign"
import { useState } from "react"

const Page = () => {
  const [userName, setUsername] = useState('shafaio')

  const handlerUserName = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p>My Avatar (max. 2MB)</p>
        <div className="rounded-full aspect-square h-24 bg-slate-400"></div>
        <input
          accept=".jpg, .jpeg, .png"
          type="file"
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-100 hover:file:bg-green-200"
        />
        <p className="text-xs text-slate-400">*format file jpg, jpeg, png.</p>
      </div>
      <form className="space-y-4">
        <InputFormSign
          title={`Username`}
          type={`text`}
          value={userName}
          method={handlerUserName}
        />
        <InputFormSign title={`Email`} type={`email`} />
        <InputFormSign title={`Phone Number`} type={`tel`} />
        <InputFormSign title={`Country`} type={`text`} />
        <div className="flex justify-between space-x-2">
          <button className="border w-full font-medium rounded-md h-10 text-red-500">Cancel</button>
          <button className="border w-full font-medium rounded-md h-10 text-white bg-green-500 hover:bg-green-600">Save My Profile</button>
        </div>
      </form>
    </div>
  )
}

export default Page