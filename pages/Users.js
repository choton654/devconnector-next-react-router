import Link from 'next/link';
import React, { useEffect } from 'react';
import ProfileActions from '../components/ProfileActions';
import { AuthState } from '../context/states/authContext';

export default function Users({ authUser }) {
  console.log(authUser);
  // const {
  //   state: { loading, profile },
  //   getProfile,
  //   deleteProfile,
  // } = ProfileState();
  const {
    state: { user, loading, profile },
    getProfile,
    deleteProfile,
  } = AuthState();

  useEffect(() => {
    getProfile();
  }, []);

  const onDeleteClick = () => {
    deleteProfile();
  };

  let dashBoard;

  if (profile === null || loading) {
    dashBoard = (
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    );
  } else {
    if (Object.keys(profile).length > 0) {
      dashBoard = (
        <div>
          <p className='lead text-muted'>
            Welcome{' '}
            <Link href={`/profile/${profile.handle}`}>
              <a>{user.name}</a>
            </Link>
          </p>
          <ProfileActions />
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}
          <div style={{ marginBottom: '60px' }} />
          <button onClick={onDeleteClick} className='btn btn-danger'>
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashBoard = (
        <>
          <p className='lead text-muted'>Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <Link href='/createProfile'>
            <a className='btn btn-lg btn-info'>Create</a>
          </Link>
        </>
      );
    }
  }

  return <div>{dashBoard}</div>;
}
