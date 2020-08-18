import App from 'next/app';
import React from 'react';
import '../App.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/states/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  const { ctx } = appContext;
  const appProps = await App.getInitialProps(appContext);
  // appProps.pageProps.ctx = ctx;
  // console.log(appProps);
  return { ...appProps };
};

export default MyApp;

// import { BrowserRouter, StaticRouter } from 'react-router-dom';
// const isServer = typeof window === 'undefined';

// function MyApp({ Component, pageProps, router }) {
//   if (isServer) {
//     return (
//       <StaticRouter location={router.asPath}>
//         <Component {...pageProps} />
//       </StaticRouter>
//     );
//   } else {
//     return (
//       <BrowserRouter>
//         <Component {...pageProps} />
//       </BrowserRouter>
//     );
//   }
// }
