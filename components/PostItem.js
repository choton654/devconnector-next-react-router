import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { AuthState } from '../context/states/authContext';

function PostItem(props) {
  const {
    state: { user },
    deletePost,
    likePost,
    unlikePost,
  } = AuthState();

  const findUserLike = (likes) => {
    return likes.find((like) => like.user === user.id) ? true : false;
  };

  const { post, showAction } = props;

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={post.avatar}
              alt=''
            />
          </a>
          <br />
          <p className='text-center'>{post.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{post.text}</p>
          {showAction ? (
            <span>
              <button
                onClick={() => likePost(post._id)}
                type='button'
                className='btn btn-light mr-1'>
                <i
                  className={classNames('fas fa-thumbs-up', {
                    'text-info': findUserLike(post.likes),
                  })}
                />
                <span className='badge badge-light'>{post.likes.length}</span>
              </button>
              <button
                onClick={() => unlikePost(post._id)}
                type='button'
                className='btn btn-light mr-1'>
                <i className='text-secondary fas fa-thumbs-down' />
              </button>
              <Link href={`/post?postId=${post._id}`}>
                <a className='btn btn-info mr-1'>Comments</a>
              </Link>
              {post.user === user.id ? (
                <button
                  onClick={() => deletePost(post._id)}
                  type='button'
                  className='btn btn-danger mr-1'>
                  <i className='fas fa-times' />
                </button>
              ) : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  showAction: true,
};

PostItem.propTypes = {
  showAction: PropTypes.bool.isRequired,
};

export default PostItem;
