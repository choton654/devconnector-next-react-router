import router from 'next/router';
import React, { useEffect, useState } from 'react';
import TextFieldGroup from '../components/TextFieldGroup';
import { AuthState } from '../context/states/authContext';

function Register(props) {
  const [state, setstate] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  });

  const {
    state: { errors, isAuthenticated },
    registerUser,
  } = AuthState();

  useEffect(() => {
    if (errors) {
      setstate({
        ...state,
        errors: errors,
      });
    }
    if (isAuthenticated) {
      router.push('/Users');
    }
  }, [errors, isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };

    registerUser(newUser);
  };

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='register'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form action='create-profile.html' onSubmit={onSubmit}>
              <TextFieldGroup
                type='name'
                name='name'
                value={state.name}
                placeholder='Name'
                onChange={onChange}
                error={state.errors.name}
              />
              <TextFieldGroup
                type='email'
                name='email'
                value={state.email}
                placeholder='Email Address'
                info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
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
              <TextFieldGroup
                type='password'
                name='password2'
                value={state.password2}
                placeholder='Confirm Password'
                onChange={onChange}
                error={state.errors.password2}
              />
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
