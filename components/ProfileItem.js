import Link from 'next/link';
import React from 'react';
import { isEmpty } from '../utils/validators';

function ProfileItem({ profile }) {
  return (
    <div className='card card-body bg-light mb-3'>
      <div className='row'>
        <div className='col-2'>
          <img src={profile.user.avatar} alt='' className='rounded-circle' />
        </div>
        <div className='col-lg-6 col-md-4 col-8'>
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}{' '}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
          <Link href={`/profile?handle=${profile.handle}`}>
            <a className='btn btn-info'>View Profile</a>
          </Link>
        </div>
        <div className='col-md-4 d-none d-md-block'>
          <h4>Skill Set</h4>
          <ul className='list-group'>
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className='list-group-item'>
                <i className='fa fa-check pr-1' />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileItem;
