const InputFormSign = ({ title, type, placeholder, method = null, value}) => {
  return (
    <div className="space-y-4">
      <p className="font-medium">{title}</p>
      <input type={type} name="" className="bg-green-100 px-4 rounded-lg w-full h-10 outline outline-green-300 focus:ring focus:ring-green-500 focus:outline-none text-lg font-normal" onChange={method} placeholder={placeholder} value={value}/>
    </div>
  )
}

export default InputFormSign 