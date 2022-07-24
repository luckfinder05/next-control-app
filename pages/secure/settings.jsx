import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

import Head from "next/head";
import UserList from "../../components/UserList";
import { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { getUsers } from "../../controllers/UserController";
import useInput from "../../hooks/useInput";
import NewUserForm from "../../components/UserList/NewUserForm";

export default function SettingsPage(props) {
  const [users, setUsers] = useState(props.users);
  const isAdmin = props.session.user.roles.includes('ADMIN')

  function addUser(userdata) {
    setUsers([...users, userdata])
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings</h1>

      {isAdmin && (
        <>
          <div className="card mt-4">
            <h4 className="card-header">
              Userlist from DB
            </h4>
            <div className="card-body">
              {users && (<UserList users={users} setUsers={setUsers} />)}
              {!users && <div className="spinner-border spinner-border-sm"></div>}
            </div>
          </div>

          <NewUserForm addUser={addUser} />
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if (session.user.roles.includes('ADMIN')) {
    const users = JSON.parse(JSON.stringify(await getUsers()));
    return {
      props: { session, users }, // will be passed to the page component as props
    }
  }
  return {
    props: { session }
  }

}
