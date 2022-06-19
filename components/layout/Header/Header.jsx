import Container from "react-bootstrap/Container";
import { Navbar, Nav, NavDropdown, Button, Modal } from "react-bootstrap";
import Link from "next/link";

import classes from "../Layout.module.css";
import NavLink from "../../UI/NavLink";

import ServicesMenu from "./ServicesMenu";

import { logout } from "../../../store/auth-slice";
import { useSelector, useDispatch } from "react-redux";

import UserMenu from "./UserMenu";
import { SignOut } from "../../UI/icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

function Header(props) {
  const router = useRouter();
  const authCtx = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  if (!isLoggedIn) return null;

  const username = session.user.name;

  function signOutHandler() {
    signOut();
    router.push("api/auth/signin");
    dispatch(logout());
  }

  return (
    <header className={classes.header}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>Контроль</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Container>
              <Nav className="justify-content-start offset-md-2">
                <ServicesMenu />
                <NavLink href="/secure/editor">Editor</NavLink>
                <UserMenu className="ms-lg-auto" username={username} />
                <Nav.Item className="">
                  <Button variant="light" onClick={signOutHandler}>
                    <SignOut /> Logout
                  </Button>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
