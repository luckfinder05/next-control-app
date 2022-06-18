import Container from "react-bootstrap/Container";
import { Navbar, Nav, Row, Col } from "react-bootstrap";

import classes from "./Layout.module.css";
import Link from "next/link";
import NavLink from "../UI/NavLink";

function Footer() {
  return (
    <footer className={classes.footer}>
      <Navbar bg="light">
        <Container>
          <Nav className="justify-content-between flex-column flex-md-row w-100">
            <NavLink href="/">Personal Web-App</NavLink>
            {/*    <NavLink href="/">Главная</NavLink>
            <NavLink href="/services">Сервисы</NavLink>
            <NavLink href="/profile">Профиль</NavLink>
            <NavLink href="/settings">Настройки</NavLink>
            */}
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;
