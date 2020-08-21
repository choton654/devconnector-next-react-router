import React, { useEffect, useState } from 'react';
import { AuthState } from '../context/states/authContext';
import TextAreaFieldGroup from './TextAreaFieldGroup';

function PostForm() {
  const [state, setstate] = useState({
    text: '',
    errors: {},
  });

  const {
    state: { user, errors },
    addPost,
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
    console.log(state.text);
    const postData = {
      text: state.text,
      name: user.name,
      avatar: user.avatar,
    };
    addPost(postData);
  };

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Say Somthing...</div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextAreaFieldGroup
                placeholder='Create a post'
                name='text'
                value={state.text}
                onChange={onChange}
                error={state.errors.text || state.errors.handle}
              />
            </div>
            <button type='submit' className='btn btn-dark'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
