import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

import { SSRProvider } from 'react-bootstrap';
import { Provider } from 'react-redux';
import Layout from '../components/layout/Layout';
import { store } from '../store';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css';

export default MyApp;

function MyApp({ data, Component, appProps, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <title>Control App</title>
      </Head>

      <SSRProvider>
        <Provider store={store}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SSRProvider>
    </SessionProvider>
  );
}
