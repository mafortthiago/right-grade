import { FunctionComponent, ReactNode, useContext } from "react";
import { themeContext } from "../../context/ThemeContext";

interface DetailProps {
  children: ReactNode;
}
/**
 * A detail component that renders children inside a themed floating container.
 * It positions itself absolutely relative to its parent, appearing as a tooltip.
 * @Component
 * @example
 * ```
 * <Detail>
 *  <p>Tooltip content here</p>
 * </Detail>
 * ```
 * @returns {JSX.Element} - A Jsx element.
 * @param {ReactNode} props.children - Content to display inside the detail container.
 * @see {@link DetailProps} - Component props interface.
 */
export const Detail: FunctionComponent<DetailProps> = ({
  children,
}: DetailProps): JSX.Element => {
  const { theme } = useContext(themeContext);
  return (
    <div
      className={`z-20 rounded-md p-2 text-sm ${
        theme == "dark" ? "bg-third" : "bg-light-100"
      } absolute top-8 left-1/2 transform -translate-x-1/2`}
    >
      {children}
    </div>
  );
};
