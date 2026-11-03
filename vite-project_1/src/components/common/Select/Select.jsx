import "./Select.css";

function Select({
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  className = ""
}) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`common-select ${className}`}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;