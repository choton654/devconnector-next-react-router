import App from 'next/app';
import React from 'react';
import withReactRouter from '../utils/withReactRouter';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withReactRouter(MyApp);
