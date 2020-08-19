import Link from 'next/link';
import React from 'react';

const ProfileActions = () => {
  return (
    <div className='btn-group mb-4' role='group'>
      <Link href='/edit-profile'>
        <a className='btn btn-light'>
          <i className='fas fa-user-circle text-info mr-1' /> Edit Profile
        </a>
      </Link>
      <Link href='/add-experience'>
        <a className='btn btn-light'>
          <i className='fab fa-black-tie text-info mr-1' />
          Add Experience
        </a>
      </Link>
      <Link href='/add-education'>
        <a className='btn btn-light'>
          <i className='fas fa-graduation-cap text-info mr-1' />
          Add Education
        </a>
      </Link>
    </div>
  );
};

export default ProfileActions;
