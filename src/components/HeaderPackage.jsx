const HeaderPackage = ({title, subtitle}) => {
  return (
    <div className="mb-4 space-y-1">
      <h1 className="text-3xl font-bold text-green-900 max-sm:text-xl">{title}</h1>
      <p className="text-lg text-slate-800 max-sm:text-sm">{subtitle}</p>
    </div>
  )
}

export default HeaderPackage