export const Textarea = ({
  placeholder,
  value,
  onChange,
  className = "",
  rows = 4,
  maxLength,
  ...props
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`textarea ${className}`}
      rows={rows}
      maxLength={maxLength}
      style={{
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        fontSize: "0.9rem",
        lineHeight: "1.6",
        resize: "vertical",
        outline: "none",
        fontFamily: "inherit",
        background: "var(--bg-secondary, #fff)",
        color: "var(--text-primary, #1a202c)",
        transition: "border-color 0.2s",
      }}
      onFocus={e => e.target.style.borderColor = "#6366f1"}
      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
      {...props}
    />
  );
};
