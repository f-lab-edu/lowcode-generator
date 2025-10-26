type TableCellInputProps = {
  value: string;
  onChange: (value: string) => void;
  borderColor?: string;
};

const TableCellInput = ({
  value,
  onChange,
  borderColor = "#4CAF50",
}: TableCellInputProps) => {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        border: "1px solid transparent",
        background: "transparent",
        padding: "4px",
      }}
      onFocus={(e) => {
        e.target.style.border = `1px solid ${borderColor}`;
        e.target.style.background = "white";
      }}
      onBlur={(e) => {
        e.target.style.border = "1px solid transparent";
        e.target.style.background = "transparent";
      }}
    />
  );
};

export { TableCellInput };
