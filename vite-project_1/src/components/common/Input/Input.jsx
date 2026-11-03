import "./Input.css";

function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  min,
  max,
  className = ""
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      min={min}
      max={max}
      className={`common-input ${className}`}
    />
  );
}

export default Input;
