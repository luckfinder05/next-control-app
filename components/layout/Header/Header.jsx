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

function Header(props) {
  const router = useRouter();
  const authCtx = useSelector((state) => state.auth);
  console.log('authCtx: ', authCtx);
  const dispatch = useDispatch();

  const isLoggedIn = authCtx.isLoggedIn;
  if (!isLoggedIn) return null;

  const username = authCtx.username;
  console.log("username: ", username);

  // useEffect(() => {
  //   setheaderLoggedIn(isLoggedIn);
  // }, [isLoggedIn]);

  // const [modalIsVisible, setmodalIsVisible] = useState(null);

  // const modalCloseHandler = (props) => {
  //   setmodalIsVisible(null);
  // };


  function signOut() {
    fetch("/auth/signout");
    dispatch(logout());
    router.push("/auth/login");
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
                <UserMenu className="ms-lg-auto" user={username} />
                <Nav.Item className="">
                  <Button variant="light" onClick={signOut}>
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
