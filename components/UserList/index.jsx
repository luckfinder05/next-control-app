import { Button } from "react-bootstrap";
import classes from './userList.module.scss'

function UserList(props) {
	const { users, setUsers } = props;

	function removeHandler(ev, id) {
		fetch('/api/users',
			{
				method: 'DELETE',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id })
			})
			.then((res) => {
				return res.json();
			}).then(res => {
				setUsers(users.filter(el => el._id !== id))
			}).catch(err => console.error(err))
	}

	return (
		<div className="card-body">
			<table className={classes.userList}>
				<thead>
					<tr className={classes.row}>
						<td>N</td>
						<td>userID</td>
						<td>username</td>
						<td>user roles</td>
						<td className={classes.centerText}>action</td>
					</tr>
				</thead>
				<tbody>
					{users.map((user, counter) => (
						<tr key={user._id}>
							<td>{counter}</td>
							<td>{user._id}</td>
							<td>{user.username}</td>
							<td>{user.roles}</td>
							<td className={classes.centerText}>
								{users.length > 1 &&
									(<Button
										variant="danger"
										type="submit"
										onClick={(ev) => removeHandler(ev, user._id)}
										value="Remove user"
									>
										Remove user
									</Button>)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default UserList;