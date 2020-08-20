import Link from 'next/link';
import React from 'react';
// import { Link } from 'react-router-dom';
import { AuthState } from '../context/states/authContext';

function Navbar() {
  const {
    state: { isAuthenticated, user },
    logoutUser,
  } = AuthState();

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>DevConnector</a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                {user.name}
              </a>
            </li>
          </ul>
          {isAuthenticated ? (
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <a className='nav-link' onClick={logoutUser}>
                  <img
                    className='rounded-circle'
                    style={{
                      width: '25px',
                      marginRight: '5px',
                    }}
                    src={user.avatar}
                    alt={user.name}
                  />
                  Logout
                </a>
              </li>
              <li className='nav-item'>
                <Link href='/About'>
                  <a className='nav-link'>About</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/users'>
                  <a className='nav-link'>Users</a>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link href='/register'>
                  <a className='nav-link'>Sign up</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/login'>
                  <a className='nav-link'>Login</a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
