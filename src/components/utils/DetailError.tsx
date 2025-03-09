import { FunctionComponent, ReactNode, useContext } from "react";
import { themeContext } from "../../context/ThemeContext";

interface DetailErrorProps {
  children: ReactNode;
}
/**
 * A detail error component that renders children inside a themed floating container.
 * It positions itself absolutely relative to its parent, appearing as a tooltip.
 * @Component
 * @example
 * ```
 * <DetailError>
 *  <p>Tooltip content here</p>
 * </DetailError>
 * ```
 * @returns {JSX.Element} - A Jsx element.
 * @param {ReactNode} props.children - Content to display inside the detail container.
 * @see {@link DetailErrorProps} - Component props interface.
 */
export const DetailError: FunctionComponent<DetailErrorProps> = ({
  children,
}: DetailErrorProps): JSX.Element => {
  const { theme } = useContext(themeContext);
  return (
    <div
      className={`z-20 rounded-md p-2 min-w-36 border-red-500 border outline ${
        theme == "dark"
          ? "bg-third outline-third"
          : "bg-light-100 outline-light-100"
      } absolute top-10 left-1/2 transform -translate-x-1/2`}
    >
      {children}
    </div>
  );
};
