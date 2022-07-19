import { authOptions } from '../auth/[...nextauth]';
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(req, res) {
    console.log('authOptions: ', authOptions);
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    return res.status(200).send({ users: 'users' });
}