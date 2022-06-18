// import jsonwebtoken from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
// import { setUserCookie, verifyAuth } from '../lib/auth'
import { JWT_SECRET_KEY, USER_TOKEN } from "../lib/constants";



const middlewares = [first, second, third]
const useMiddleware = () => { middlewares.reduce((res, mddlwr, i, arr) => mddlwr(req, res), '') }


const verifyToken = (req, res) => {
  const token = req?.cookies['user-token'];
  if (token) {
    console.log('verifyToken');
    try {
      /* const decodedToken = (jsonwebtoken.verify(token, JWT_SECRET_KEY, {}))
      // res.json({ userId: decodedToken.id });
      return decodedToken.id; */
    } catch (err) {
      console.log('err: ', err);
      let message;
      if (err.name === 'JsonWebTokenError') {
        message = 'Invalid Token';
      }
      else if (err.name === 'TokenExpiredError') {
        message = 'Token Expired';
      }
      res.json({ message, err })
    }
  }
  return false;
}

const verifyUser = () => { };



export async function middleware(req, ev) {
  console.log('=========== MIDDLEWARE ==========');
  const url = req.nextUrl;
  const res = NextResponse.next();
  // req.cookies
  console.log('req.cookies: ', req.cookies);

  // console.log('url: ', `'${url}'`);
  // if (url.pathname === '/') return res
  console.log('url.pathname: ', url.pathname);
  const params = [...url.pathname.split('/')];
  console.log('params: ', params);



  verifyToken(req, res);
  // console.log('res: ', res);
  // console.log('res.body: ', res.body);

  return res

  // const result = await verifyAuth(req);
  // console.log('verifyAuth result: ', result);
  // console.log('result: ', result.body);

  // console.log(useMiddleware)

  // console.log('verifyAuth(req): ', result);

  // return setUserCookie(req, NextResponse.next())


  // console.log('req.cookies: ', req.cookies);
  // Trying to access the /blocked page manually is disallowed
  /* if (url.pathname === '/blocked') {
    const res = new Response;
    // return setUserCookie(req, NextResponse.next())


    return new Response(`It's a blocked url`, { status: 404 })
  }
  if (url.pathname !== '/') {
    const response = await verifyAuth(req);
    response.someField = `It's a protected page`;
    return response;
    // return new Response(`It's a protected page`, { status: 401 })

    // return (await blockedIp(req))
    //   ? NextResponse.rewrite('/blocked')
    //   : NextResponse.next()
  } */
  // NextResponse.next()
}

function first(req, res) {
  // console.log('first');
  return 'auth ';
}

function second(req, res) {
  // console.log('second');
  return res + 'middlewares'
}

function third(req, res) {
  // console.log('second');
  return res + ' connected'
}