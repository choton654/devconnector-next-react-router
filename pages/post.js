import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CommentFeed from '../components/CommentFeed';
import CommentForm from '../components/CommentForm';
import PostItem from '../components/PostItem';
import { AuthState } from '../context/states/authContext';

function post() {
  const {
    query: { postId },
  } = useRouter();

  const {
    state: { post, loading },
    getPost,
  } = AuthState();

  useEffect(() => {
    getPost(postId);
  }, []);

  return (
    <div className='feed'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Link href='/posts'>
              <a className='btn btn-light mb-3'>Go Back</a>
            </Link>
            {post === null || loading || Object.keys(post).length === 0 ? (
              <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              <PostItem post={post} showAction={false} />
            )}
            <CommentForm postId={postId} />
            <CommentFeed postId={postId} comments={post.comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default post;
