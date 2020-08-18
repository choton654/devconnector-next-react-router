import Link from 'next/link';
import router from 'next/router';
import React, { useEffect } from 'react';
import { AuthState } from '../context/states/authContext';

function Home(props) {
  const {
    state: { isAuthenticated },
  } = AuthState();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/Users');
    }
  }, [isAuthenticated]);

  return (
    <div className='landing'>
      <div className='dark-overlay landing-inner text-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <h1 className='display-3 mb-4'>Developer Connector</h1>
              <p className='lead'>
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              <Link href='/Register'>
                <a className='btn btn-lg btn-info mr-2'>Sign Up</a>
              </Link>
              <Link href='/Login'>
                <a className='btn btn-lg btn-light'>Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// import { Redirect } from 'react-router';
// import { Route, Switch } from 'react-router-dom';
// import Login from '../components/auth/Login';
// import Register from '../components/auth/Register';
// import Layout from '../components/Layout';
// import { AuthProvider } from '../context/states/authContext';
// import About from './About';
// import Home from './Home';
// import { Link } from 'react-router-dom';
// import Users from './Users';

// function Status({ code, children }) {
//   return (
//     <Route
//       render={({ staticContext }) => {
//         if (staticContext) staticContext.status = code;
//         return children;
//       }}
//     />
//   );
// }

// function NotFound() {
//   return (
//     <>
//       <Status code={404} />
//       <h2>Not found</h2>;
//     </>
//   );
// }

// function App() {
//   return (
//     <div>
//       <AuthProvider>
//         <Layout>
//           <Switch>
//             <Route path='/' exact component={Home} />
//             <Route exact path='/about/' component={About} />
//             <Route exact path='/dashboard/' component={Users} />
//             <Route exact path='/login/' component={Login} />
//             <Route exact path='/register/' component={Register} />
//             <Redirect from='/people/' to='/dashboard/' />
//             <Route component={NotFound} />
//           </Switch>
//         </Layout>
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;
