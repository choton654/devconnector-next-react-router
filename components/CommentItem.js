import React from 'react';
import { AuthState } from '../context/states/authContext';

const CommentItem = ({ comment, postId }) => {
  const {
    state: { user },
    deleteComment,
  } = AuthState();

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={comment.avatar}
              alt=''
            />
          </a>
          <br />
          <p className='text-center'>{comment.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{comment.text}</p>
          {comment.user === user.id ? (
            <button
              onClick={() => deleteComment(postId, comment._id)}
              type='button'
              className='btn btn-danger mr-1'>
              <i className='fas fa-times' />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
