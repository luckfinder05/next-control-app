import Head from "next/head";
import { useEffect, useState } from "react";
import { userService } from "../../services/user.service";

function SettingsPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings</h1>
      <div className="card mt-4">
        <h4 className="card-header">
          You&amp;re logged in with Next.js 11 & JWT!!
        </h4>
        <div className="card-body">
          <h6>Users from secure api end point</h6>
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
    </>
  );
}

export default SettingsPage;
