import { useMatch, Link, LinkProps } from "react-router-dom";
import { ReactNode } from "react";

interface CustomLinkProps extends LinkProps {
  to: string;
  children: ReactNode;
  activeClass: string;
  inactiveClass?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  children,
  activeClass,
  inactiveClass,
  ...props
}) => {
  let match = useMatch(to);
  return (
    <Link to={to} className={match ? activeClass : inactiveClass} {...props}>
      {children}
    </Link>
  );
};

export default CustomLink;
