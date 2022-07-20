import { authOptions } from '../auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";
import dbConnect from '../../../lib/mongooseConnect';
import { getToken } from "next-auth/jwt"

import { addUser, getUsers, removeUser } from '../../../controllers/UserController';

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    await dbConnect();

    if (req.method === 'GET') {
        return res.status(405).json({ message: "Method is not allowed" });
    } else {
        const secret = process.env.SECRET
        const token = await getToken({ req, secret })
        if (!token) {
            // Not Signed in
            return res.status(401).json({ message: "Unauthorized user" });
        }
    }

    if (req.method === 'POST') {
        return await addUser(req, res);

    } else if ((req.method === 'DELETE')) {
        return await removeUser(req, res);
    }
}