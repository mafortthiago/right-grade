import React, { ChangeEvent } from "react";

interface InputTableProps {
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputTable: React.FC<InputTableProps> = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

export default InputTable;
