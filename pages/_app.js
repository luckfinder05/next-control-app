import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

import { SSRProvider } from 'react-bootstrap';
import { Provider } from 'react-redux';
import Layout from '../components/layout/Layout';
import { store } from '../store';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css';


import App from 'next/app'

export default MyApp;

function MyApp({ data, Component, appProps, pageProps }) {
  return (
    <>
      <Head>
        <title>Control App</title>
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
