import App from 'next/app';
import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import '../App.css';

const isServer = typeof window === 'undefined';

function MyApp({ Component, pageProps, router }) {
  if (isServer) {
    return (
      <StaticRouter location={router.asPath}>
        <Component {...pageProps} />
      </StaticRouter>
    );
  }
  return (
    <BrowserRouter>
      <Component {...pageProps} />
    </BrowserRouter>
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
