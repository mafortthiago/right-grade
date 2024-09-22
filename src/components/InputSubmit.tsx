import { FunctionComponent } from "react";
interface InputSubmitProps {
  value: string;
  handleSubmit: (e: any) => void;
}
const InputSubmit: FunctionComponent<InputSubmitProps> = ({
  value,
  handleSubmit,
}) => {
  return (
    <input
      type="submit"
      className={
        "font-medium p-1 mb-3 rounded bg-second hover:brightness-95 cursor-pointer text-white"
      }
      value={value}
      onClick={handleSubmit}
    />
  );
};

export default InputSubmit;
