const RadioButton = ({ title, name, method }) => {
  return (
    <label className="flex items-center space-x-1">
      <input
        type="radio"
        name={name}
        value={title}
        onChange={method}
      />
      <p>
        {title}
      </p>
    </label>
  )
}

export default RadioButton