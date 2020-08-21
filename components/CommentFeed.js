import React from 'react';
import CommentItem from './CommentItem';

function CommentFeed({ comments, postId }) {
  return (
    <div>
      {comments ? (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))
      ) : (
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </div>
  );
}

export default CommentFeed;
