import Head from "next/head";
import UserList from "../../components/UserList";
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
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Fault on creating user')
        }
      })
      .then(res => {
        setUsers([...users, res.user])
      })
      .catch(err => console.error(err))
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
          {users && (<UserList users={users} setUsers={setUsers} />)}
          {!users &&
            <div className="spinner-border spinner-border-sm"></div>
          }
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
  )
}

export default SettingsPage;

export async function getServerSideProps(context) {
  const users = JSON.parse(JSON.stringify(await getUsers()));
  return {
    props: { users }, // will be passed to the page component as props

  }
}
