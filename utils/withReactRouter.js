import React from 'react';
import { BrowserRouter } from 'react-router-dom';
const isServer = typeof window === 'undefined';

const withReactRouter = (App) => {
  return class AppWithReactRouter extends React.Component {
    static async getInitialProps(appContext) {
      return {};
    }

    render() {
      if (isServer) {
        const { StaticRouter } = require('react-router-dom');
        return (
          <StaticRouter
            location={this.props.router.asPath}
            context={this.props.ctx}>
            <App {...this.props} />
          </StaticRouter>
        );
      }
      return (
        <BrowserRouter>
          <App {...this.props} />
        </BrowserRouter>
      );
    }
  };
};

export default withReactRouter;
