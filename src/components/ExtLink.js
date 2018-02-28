import React from "react";
import theme from "../styles/theme";

type Props = {
  href: string,
  children?: React.ElementType<*>
};

/* Meant to be used with external links,
 * it opens a new tab on click
 */
const ExtLink = ({ href, children }: Props) => (
  <a
    style={theme.extLink}
    rel="noreferrer noopener"
    target="_blank"
    href={href}
  >
    {children}
  </a>
);

export default ExtLink;
