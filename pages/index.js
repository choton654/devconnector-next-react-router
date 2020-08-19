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
      router.push('/users');
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
              <Link href='/register'>
                <a className='btn btn-lg btn-info mr-2'>Sign Up</a>
              </Link>
              <Link href='/login'>
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
