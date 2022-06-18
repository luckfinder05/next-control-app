import Link from "next/link";
import React from "react";
import { NavDropdown } from "react-bootstrap";

function NavDropdownItem(props) {
  return (
    <Link href={props.href} passHref>
      <NavDropdown.Item>{props.children}</NavDropdown.Item>
    </Link>
  );
}

export default NavDropdownItem;
