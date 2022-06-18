import 'bootstrap/dist/css/bootstrap.min.css';
const jwt = require('jsonwebtoken');
import Head from 'next/head';

import { SSRProvider } from 'react-bootstrap';
import { Provider, useDispatch } from 'react-redux';
import Layout from '../components/layout/Layout';
import { store } from '../store';
import '../styles/globals.css';
import { USER_TOKEN } from "../lib/constants";

import { SessionProvider } from "next-auth/react"



import App from 'next/app'

export default MyApp;

function MyApp({ data, Component, appProps, pageProps }) {
  console.log('MyApp pageProps: ', pageProps);
  // console.log('MyApp appProps: ', appProps);
  // const dispatch = useDispatch();
  // const router = useRouter();

  return (
    <>
      <Head>
        <title>Authentication page</title>
      </Head>

      <SSRProvider>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Provider store={store}>
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </SessionProvider>
      </SSRProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {


  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const req = appContext.ctx.req
  // console.log('req: ', req);

  const token = appContext.ctx?.req?.cookies[USER_TOKEN];
  if (!token) {
    return {
      appProps,
      pageProps: {
        user: {
          id: null,
          username: '',
          isLoggedIn: false
        }
      },
    }
  }
  const decodedData = jwt.verify(token, process.env.NEXTAUTH_SECRET);
  console.log('decodedData: ', decodedData);

  return {
    pageProps: {
      ...appProps.pageProps,
      user: {
        id: decodedData.id || null,
        username: decodedData.username || null,
        isLoggedIn: !!decodedData?.username || false
      }
    },
  }
}