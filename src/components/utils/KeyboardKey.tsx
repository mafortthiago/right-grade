import { FunctionComponent, ReactNode, useContext } from "react";
import { themeContext } from "../../context/ThemeContext";

interface KeyboardKeyProps {
  children: ReactNode;
}

/**
 * A component that represents a keyboard key.
 * @param {ReactNode} props.children - The content to display inside the key.
 * @example
 * ```
 * <KeyboardKey>Shift</KeyboardKey>
 * ```
 * @returns {JSX.Element} The KeyboardKey component.
 */
export const KeyboardKey: FunctionComponent<KeyboardKeyProps> = ({
  children,
}): JSX.Element => {
  const { theme } = useContext(themeContext);
  return (
    <kbd
      className={`px-2 py-1.5 text-xs font-semibold 
    border rounded-lg shadow-[0_1px_0_1px_rgba(0,0,0,0.1)] 
    ${theme == "dark" ? "bg-fourth border-dark" : ""}`}
    >
      {children}
    </kbd>
  );
};
