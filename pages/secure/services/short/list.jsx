import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]"

import React from 'react'
import Head from "next/head";
import { Button } from 'react-bootstrap';
import linkShortener from '../../../../lib/linkShortener';

export default function list(props) {
	const isAdmin = props.session.user.roles.includes('ADMIN')

	function removeHandler(ev, id) {
		console.log('id: ', id);
		fetch('/api/s/delete',
			{
				method: 'DELETE',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id })
			})
			.then((res) => {
				return res.json();
			}).then((res => { console.log(res) }))
			.catch(err => console.error(err));
	}

	return (
		<>
			<Head>
				<title>Shortlinks List</title>
			</Head>
			<h1>Shortlinks List</h1>
			{isAdmin && (
				<table style={{
					width: "100%",
					textWrap: "normal",
					wordWrap: "break-word",
					border: "1px solid black",
					borderCollapse: "collapse"
				}}>
					<thead>
						<tr style={{ border: "1px solid black", textAlign: "center" }}>
							<td>ShortlinkID</td>
							<td>Original link</td>
						</tr>
					</thead>
					<tbody>
						{
							props.shortLinks.map((link, index) => {
								return (
									<tr key={index} style={{ border: "1px solid black" }}>
										<td style={{ textAlign: "center" }}>
											<a
												href={`/s/${link.shortLinkId}`}
												target="_blank"
												rel="noreferrer"
											>
												{link.shortLinkId}
											</a>

										</td>
										<td style={{ maxWidth: "500px" }}>{link.originalLink}</td>
										<td>
											<Button
												variant="danger"
												type="submit"
												onClick={(ev) => removeHandler(ev, link._id)}
												value="Remove user"
											>
												Remove link
											</Button>
										</td>

									</tr>
								)
							})
						}
					</tbody>
				</table >)
			}
		</>
	)
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)
	if (session.user.roles.includes('ADMIN')) {
		const shortLinks = JSON.parse(JSON.stringify(await linkShortener.listAllLinks()));
		return {
			props: { session, shortLinks }, // will be passed to the page component as props
		}
	}
	return {
		props: { session }
	}
}