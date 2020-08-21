import React, { useEffect } from 'react';
import PostFeed from '../components/PostFeed';
import PostForm from '../components/PostForm';
import { AuthState } from '../context/states/authContext';

function posts({}) {
  // console.log(posts);

  const {
    state: { posts, loading },
    getPosts,
  } = AuthState();

  useEffect(() => {
    getPosts();
  }, []);

  let postContent;

  if (posts.length === null || loading) {
    postContent = (
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    );
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  return (
    <div className='feed'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default posts;
