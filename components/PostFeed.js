import React from 'react';
import PostItem from './PostItem';

function PostFeed({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostFeed;
