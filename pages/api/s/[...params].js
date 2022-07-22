// path: /s/:params
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import LinkShortener from "../../../lib/linkShortener";

const ApiHandler = async (req, res) => {

  if (req.method === 'GET') {
    return LinkShortener.getLink(req, res);
  }
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    // Not Signed in
    return res.status(401).json({ message: "Unauthorized user" });
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


