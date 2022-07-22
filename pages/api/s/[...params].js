// path: /s/:params
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { getToken } from "next-auth/jwt"
import LinkShortener from "../../../lib/linkShortener";

const ApiHandler = async (req, res) => {

  if (req.method === 'GET') {
    return LinkShortener.getLink(req, res);
  }
  const session = await unstable_getServerSession(req, res, authOptions)
  // const token = await getToken({ req })
  if (!session) {
    console.error('session: ', session);
    // Not Signed in
    return res.status(401).json({ message: "Unauthorized user", token });
  }
  else {
    if (req.method === 'POST') {
      return LinkShortener.addLink(req, res);
    }
    if (req.method === 'DELETE') {
      return LinkShortener.remove(req, res);
    }
  }
}

export default ApiHandler;


