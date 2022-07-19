import Head from "next/head";
import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getUsers } from "../../controllers/UserController";

function SettingsPage(props) {
  const [users, setUsers] = useState(props.users);
  console.log('users: ', users);


  function submitHandler() {
    

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
                <li key={user.id}>
                  {user.id} {user.username}
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
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text >
              pasword
            </InputGroup.Text>
            <Form.Control
              type="password"
            />
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
