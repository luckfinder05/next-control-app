import { NavDropdown } from "react-bootstrap";
import NavDropdownItem from "../../UI/NavDropdownItem";

function ServicesMenu() {
  return (
    <NavDropdown title="Сервисы">
      <NavDropdownItem href="/secure/services/prescriptions" passHref>
        Предписания
      </NavDropdownItem>
      <NavDropdown.Divider />
      <NavDropdownItem href="/secure/services/short/create" passHref>
        Укорачиватель ссылок
      </NavDropdownItem>
      <NavDropdownItem href="/secure/services/short/list" passHref>
        Список коротких ссылок
      </NavDropdownItem>
    </NavDropdown>
  );
}

export default ServicesMenu;
