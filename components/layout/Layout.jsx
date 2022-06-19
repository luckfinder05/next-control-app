import classes from "./Layout.module.css";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";
import { login } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

function Layout(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    router.push("api/auth/signin");
    return null;
  }

  /*   useEffect(() => {
    console.log("Layout context dispatch");
    dispatch(login(props.user));
    console.log("props: ", props);
    console.log("props.user: ", props.user);

    return;
  }, [dispatch, props]); */

  return (
    <section className={classes.layout}>
      <Header className={classes.header} />
      <main className={classes.main}>
        <Container>{props.children}</Container>
      </main>
      <Footer className={classes.footer} />
    </section>
  );
}

export default Layout;
