import Link from "next/link";
import React from "react";
import { Nav } from "react-bootstrap";

function NavLink(props) {
  return (
    <Link href={props.href} passHref>
      <Nav.Link>{props.children}</Nav.Link>
    </Link>
  );
}

export default NavLink;
