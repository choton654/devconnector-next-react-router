import React, { useEffect, useState } from 'react';
import TextFieldGroup from '../components/TextFieldGroup';
import { AuthState } from '../context/states/authContext';
function Login() {
  const [state, setstate] = useState({
    email: '',
    password: '',
    errors: {},
  });

  const {
    state: { errors, isAuthenticated },
    loginUser,
  } = AuthState();

  useEffect(() => {
    if (errors) {
      setstate({
        ...state,
        errors: errors,
      });
    }
    // if (isAuthenticated) {
    //   router.push('/users');
    // }
  }, [errors, isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({ email: state.email, password: state.password });
  };

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>
              Sign in to your DevConnector account
            </p>
            <form action='dashboard.html' onSubmit={onSubmit}>
              <TextFieldGroup
                type='email'
                name='email'
                value={state.email}
                placeholder='Email Address'
                onChange={onChange}
                error={state.errors.email}
              />
              <TextFieldGroup
                type='password'
                name='password'
                value={state.password}
                placeholder='Password'
                onChange={onChange}
                error={state.errors.password}
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
