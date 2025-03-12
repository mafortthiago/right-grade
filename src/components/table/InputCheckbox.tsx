import { FunctionComponent } from "react";
import { useSelectedBox } from "./selectedBoxes";

interface InputCheckboxProps {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

/**
 * InputCheckbox component
 *
 * This component renders a custom checkbox input that can be controlled either by an external
 * handleChange function or by the internal Zustand store `useSelectedBox`.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the checkbox.
 * @param {Function} [props.handleChange] - Optional custom change handler function.
 *
 * @returns {JSX.Element} The rendered checkbox input element.
 */
const InputCheckbox: FunctionComponent<InputCheckboxProps> = ({
  handleChange,
  id,
}: InputCheckboxProps): JSX.Element => {
  const { set, selectedBoxes } = useSelectedBox();

  /**
   * Toggles the selected state of the checkbox in the Zustand store.
   */
  const handleAddSelected = () => {
    const newValue = !selectedBoxes[id];
    set({ [id]: newValue });
  };

  return (
    <input
      type="checkbox"
      name={`check-${id}`}
      id={`check-${id}`}
      className="custom-checkbox"
      checked={!!selectedBoxes[id]}
      onChange={handleChange || handleAddSelected}
    />
  );
};

export default InputCheckbox;
