import App from 'next/app';
import React from 'react';
import '../App.css';
import Layout from '../components/Layout';
import withReactRouter from '../utils/withReactRouter';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default withReactRouter(MyApp);
