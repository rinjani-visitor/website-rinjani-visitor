const HeaderPackage = ({title, subtitle}) => {
  return (
    <div className="mb-4 space-y-1">
      <h1 className="text-3xl">{title}</h1>
      <p className="text-lg">{subtitle}</p>
    </div>
  )
}

export default HeaderPackage