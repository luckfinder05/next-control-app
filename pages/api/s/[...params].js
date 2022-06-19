// path: /s/:params
import dbConnect from "../../../lib/mongooseConnect";
import { getToken } from "next-auth/jwt"
import LinkShortener from "../../../lib/linkShortener";

const ApiHandler = async (req, res) => {
  
  await dbConnect();
  
  if (req.method === 'GET') {
    return LinkShortener.getLink(req, res);
  }

  if (req.method === 'POST') {

    const secret = process.env.SECRET
    const token = await getToken({ req, secret })
    if (!token) {
      // Not Signed in
      return res.status(401).json({ message: "Unauthorized user" });
    }
    else {
      return LinkShortener.addLink(req, res);
    }  
  }
}

export default ApiHandler;


