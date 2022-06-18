import React from "react";
import { NavDropdown } from "react-bootstrap";
import NavDropdownItem from "../../UI/NavDropdownItem";

function UserMenu(props) {
  return (
    <>
      <NavDropdown className={props.className} title={props.username}>
        <NavDropdownItem href="/secure/settings" passHref>
          Настройки
        </NavDropdownItem>
        <NavDropdownItem href="/secure/profile" passHref>
          Профиль
        </NavDropdownItem>
      </NavDropdown>
    </>
  );
}

export default UserMenu;
