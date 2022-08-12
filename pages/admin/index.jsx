import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { useState } from "react";

import NewUserForm from "../../components/UserList/NewUserForm";
import { getUsers } from "../../controllers/UserController";
import UserList from "../../components/UserList";


export default function Admin(props) {
  const [users, setUsers] = useState(props.users);
  const isAdmin = props.session.user.roles.includes('ADMIN')

  function addUser(userdata) {
    setUsers([...users, userdata])
  }

  return (
    <>
      <h2>Административная панель приложения</h2>
      <h3>Стройки</h3>
      <ul>
        <li>Николино, 99 участок</li>
        <li>Фили</li>
      </ul>
      <h3>Роли пользователей</h3>
      <ul>
        <li>GLOBAL Админстратор приложения</li>
        <li>GLOBAL Директор</li>
        <li>OBJECT Руководитель проекта</li>
        <li>OBJECT Инженер строительного контроля</li>
        <li>GLOBAL Viewer</li>
      </ul>

      {isAdmin && (
        <>
          <div className="card mt-4">
            <h4 className="card-header">
              Управление пользователями
            </h4>
            <div className="card-body">
              {users && (<UserList users={users} setUsers={setUsers} />)}
              {!users && <div className="spinner-border spinner-border-sm"></div>}
            </div>
            <NewUserForm className="m-4" addUser={addUser} />
          </div>

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
