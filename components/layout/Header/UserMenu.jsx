import React from "react";
import { NavDropdown } from "react-bootstrap";
import NavDropdownItem from "../../UI/NavDropdownItem";

function UserMenu(props) {
  const { username } = props;
  const isAdmin = props.user.roles.includes('ADMIN')

  return (
    <>
      <NavDropdown className={props.className} title={username}>
        <NavDropdownItem href="/secure/settings" passHref>Настройки</NavDropdownItem>
        {isAdmin && <NavDropdownItem href="/admin">Администрирование</NavDropdownItem>}
        <NavDropdownItem href="/secure/profile" passHref>Профиль</NavDropdownItem>
      </NavDropdown>
    </>
  );
}

export default UserMenu;
