import React, { useEffect } from 'react';
import ProfileItem from '../components/ProfileItem';
import { AuthState } from '../context/states/authContext';

function profiles() {
  const {
    state: { loading, profiles },
    getProfiles,
  } = AuthState();

  useEffect(() => {
    getProfiles();
  }, []);

  let profileItems;

  if (profiles === null || loading) {
    profileItems = (
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    );
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = (
        <>
          <h4>no profiles found</h4>
        </>
      );
    }
  }

  return (
    <div className='profiles'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4 text-center'>Developer Profiles</h1>
            <p className='lead text-center'>
              Browse and connect with developers
            </p>
            {profileItems}
          </div>
        </div>
      </div>
    </div>
  );
}

export default profiles;
