import "./TextArea.css";

function TextArea({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = ""
}) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`common-textarea ${className}`}
    />
  );
}

export default TextArea;