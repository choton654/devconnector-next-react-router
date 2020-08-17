import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { AuthState } from '../../context/states/authContext';

function Login() {
  const [state, setstate] = useState({
    email: '',
    password: '',
    errors: {},
  });

  const {
    state: { errors },
    loginUser,
  } = AuthState();

  useEffect(() => {
    if (errors) {
      setstate({
        ...state,
        errors: errors,
      });
    }
  }, [errors]);

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
              <div className='form-group'>
                <input
                  type='email'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': state.errors.email,
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={state.email}
                  onChange={onChange}
                />
                {state.errors.email && (
                  <div className='invalid-feedback'>{state.errors.email}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': state.errors.password,
                  })}
                  placeholder='Password'
                  name='password'
                  value={state.password}
                  onChange={onChange}
                />
                {state.errors.password && (
                  <div className='invalid-feedback'>
                    {state.errors.password}
                  </div>
                )}
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
