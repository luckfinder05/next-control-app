import Head from "next/head";
import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getUsers } from "../../controllers/UserController";
import useInput from "../../hooks/useInput";

function SettingsPage(props) {
  const [users, setUsers] = useState(props.users);
  const [username, setUserName] = useInput('')
  const [email, setEmail] = useInput('')
  const [userRole, setUserRole] = useInput('USER')
  const [userPassword, setUserPassword] = useInput('')


  function submitHandler(ev) {
    ev.preventDefault();
    fetch('/api/users',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: userPassword, email, role: userRole })
      })
  }

  function removeHandler(ev, id) {
    console.log('id: ', id);
    fetch('/api/users',
      {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      .then((res) => {
        return res.json();
      }).then((res => { console.log(res) }))
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings</h1>
      <div className="card mt-4">
        <h4 className="card-header">
          Userlist from DB
        </h4>
        <div className="card-body">
          <h6>Users in database</h6>
          {users && (
            <ul>
              {users.map((user) => (
                <li key={user._id}>

                  {user._id} {user.username} - {user.roles}
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={(ev) => removeHandler(ev, user._id)}
                    value="Remove user"
                  >
                    Remove user
                  </Button>
                </li>
              ))}
            </ul>
          )}
          {!users && <div className="spinner-border spinner-border-sm"></div>}
        </div>
      </div>

      <section>
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
            // disabled={formState.isSubmitting}
            onClick={submitHandler}
            value="Add user"
          >
            Add user
          </Button>
        </Form>
      </section>
    </>
  );
}

export default SettingsPage;

export async function getServerSideProps(context) {
  const users = JSON.parse(JSON.stringify(await getUsers()));
  return {
    props: { users }, // will be passed to the page component as props

  }
}
