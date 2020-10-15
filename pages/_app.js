import Axios from "axios";
import cookie from "cookie";
import jwt_decode from "jwt-decode";
import App from "next/app";
import React from "react";
import "../App.css";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/states/authContext";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  // console.log(ctx);
  const appProps = await App.getInitialProps(appContext);

  const { token } = cookie.parse(
    ctx.req ? ctx.req.headers.cookie || "" : document.cookie
  );

  const redirectUser = (ctx, location) => {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: location });
      ctx.res.end();
    } else {
      Router.push(location);
    }
  };

  if (token) {
    try {
      const { data } = await Axios.get(
        "http://localhost:3000/api/users/current" ||
          "https://devconector-nextjs.choton654.vercel.app/api/users/current",
        {
          headers: { Authorization: token },
        }
      );
      const decode = jwt_decode(token);
      // const currentTime = Date.now() / 1000;
      // if (decode.exp < currentTime) {
      //   redirectUser(ctx, '/login');
      // }
      if (decode.id === data.id) {
        appProps.pageProps.authUser = data;
      } else {
        appProps.pageProps.authUser = {};
      }
    } catch (error) {
      console.error(error.response.data);
      // redirectUser(ctx, '/login');
    }
  } else {
    const protectRoute =
      ctx.pathname === "/users" ||
      ctx.pathname === "/createProfile" ||
      ctx.pathname === "/editProfile" ||
      ctx.pathname === "/addEducation" ||
      ctx.pathname === "/addExperience" ||
      ctx.pathname === "/profile" ||
      ctx.pathname === "/profiles" ||
      ctx.pathname === "/posts" ||
      ctx.pathname === "/post";

    if (protectRoute) {
      redirectUser(ctx, "/login");
    }
  }
  return { ...appProps };
};

export default MyApp;
