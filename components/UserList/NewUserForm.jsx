import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import useInput from "../../hooks/useInput";

function NewUserForm(props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [username, setUserName, resetUserName] = useInput('')
  const [email, setEmail, resetEmail] = useInput('')
  const [userRole, setUserRole, resetUserRole] = useInput('USER')
  const [userPassword, setUserPassword, resetUserPassword] = useInput('')

  function submitHandler(ev) {
    setIsSubmitting(true)
    ev.preventDefault();
    fetch('/api/users',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: userPassword, email, role: userRole })
      })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Fault on creating user')
        }
      })
      .then(res => {
        props.addUser(res.user)
        clearForm();
      })
      .catch(err => console.error(err))
      .finally(() => setIsSubmitting(false))
  }

  function clearForm() {
    resetUserName();
    resetEmail();
    resetUserRole();
    resetUserPassword();
  }

  return (
    <section className={props.className}>
      <h2>Add user</h2>
      <Form>
        <InputGroup>
          <InputGroup.Text >
            User name
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            onChange={setUserName}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text >
            password
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="password"
            value={userPassword}
            onChange={setUserPassword}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text >
            email
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={setEmail}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>
            user role
          </InputGroup.Text>
          <Form.Select
            aria-label="Роль пользователя"
            value={userRole}
            onChange={setUserRole}
          >
            <option key="USER" value="USER">
              USER
            </option>
            <option key="ADMIN" value="ADMIN">
              ADMIN
            </option>
          </Form.Select>
        </InputGroup>
        <Button
          variant="primary"
          // disabled={isDataPosting}
          type="submit"
          disabled={isSubmitting}
          onClick={submitHandler}
          value="Add user"
        >
          Add user
        </Button>
      </Form>
    </section>
  )
}

export default NewUserForm