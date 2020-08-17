import Axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
function Register() {
  const [state, setstate] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };

    Axios.post('/api/users/register', newUser)
      .then((res) => console.log(res.data))
      .catch((err) => setstate({ errors: err.response.data }));
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
              <div className='form-group'>
                <input
                  type='text'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': state.errors.name,
                  })}
                  placeholder='Name'
                  name='name'
                  value={state.name || ''}
                  onChange={onChange}
                />
                {state.errors.name && (
                  <div className='invalid-feedback'>{state.errors.name}</div>
                )}
              </div>
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
                {state.errors.email ? (
                  <div className='invalid-feedback'>{state.errors.email}</div>
                ) : (
                  <small className='form-text text-muted'>
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
              <div className='form-group'>
                <input
                  type='password'
                  className={classNames('form-control form-control-lg', {
                    'is-invalid': state.errors.password2,
                  })}
                  placeholder='Confirm Password'
                  name='password2'
                  value={state.password2}
                  onChange={onChange}
                />
                {state.errors.password2 && (
                  <div className='invalid-feedback'>
                    {state.errors.password2}
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

export default Register;
