import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
// import { useEffect } from "react";
import { Button, Card, Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { SignIn } from "../../components/UI/icons";
import { login } from "../../store/auth-slice";
// import { userService } from "../services/user.service";

export default Login;

function Login() {
  const userCtx = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const returnUrl = router.query.returnUrl;

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, returnUrl }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const { id, username, isLoggedIn, returnUrl } = response;
        dispatch(login({ id, username, isLoggedIn }));
        router.replace(returnUrl || "/");
      })
      .catch((error) => {
        console.log(error);
        setError("apiError", { message: error });
      });
  }

  return (
    <Container className="col-md-6 offset-md-3 mt-5">
      <Card>
        <Card.Header>Login Page</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                {...register("username")}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <Form.Text className="text-muted invalid-feedback">
                {errors.username?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <Form.Text className="text-muted invalid-feedback">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              disabled={formState.isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              <SignIn /> Login
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </Button>
            {errors.apiError && (
              <div className="alert alert-danger mt-3 mb-0">
                {errors.apiError?.message}
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
