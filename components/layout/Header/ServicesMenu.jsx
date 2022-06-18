import { NavDropdown } from "react-bootstrap";
import NavDropdownItem from "../../UI/NavDropdownItem";

function ServicesMenu() {
  return (
    <NavDropdown title="Сервисы">
      <NavDropdownItem href="/secure/services/short/create" passHref>
        Укорачиватель ссылок
      </NavDropdownItem>
      <NavDropdown.Divider />
      <NavDropdownItem href="/secure/services/prescriptions" passHref>
        Предписания
      </NavDropdownItem>
      <NavDropdownItem href="/secure/services/prescriptions/data-grid" passHref>
        Таблица Предписаний
      </NavDropdownItem>
      <NavDropdownItem href="" passHref>
        Обновить предписание
      </NavDropdownItem>
      <NavDropdown.Divider />
      <NavDropdownItem href="" passHref>
        Испытания
      </NavDropdownItem>
      <NavDropdownItem href="" passHref>
        Отчёт
      </NavDropdownItem>
      <NavDropdownItem href="" passHref>
        Протокол совещания
      </NavDropdownItem>
      <NavDropdownItem href="" passHref>
        Дефектная ведомость
      </NavDropdownItem>
    </NavDropdown>
  );
}

export default ServicesMenu;
