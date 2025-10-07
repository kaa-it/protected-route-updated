export function Input({ inputRef, error = '', value = '', ...props }) {
  return (
    <label>
      <input ref={inputRef} {...props} value={value} />
      <span className="error">{error || ''}</span>
    </label>
  );
}
