import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function ProfileGithub({ username }) {
  const [repos, setrepos] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created: asc&client_id=34571514e9e5228adaa2&client_secret=8f0cc9b224381d6340e89aef3ba78bc09b056196`,
    )
      .then((res) => res.json())
      .then((data) => setrepos(data))
      .catch((err) => console.error(err));
  }, []);

  const repoItems = repos.map((repo) => (
    <div key={repo.id} className='card card-body mb-2'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>
            <Link href={repo.html_url}>
              <a className='text-info' target='_blank'>
                {repo.name}
              </a>
            </Link>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className='col-md-6'>
          <span className='badge badge-info mr-1'>
            Stars: {repo.stargazers_count}
          </span>
          <span className='badge badge-secondary mr-1'>
            Watchers: {repo.watchers_count}
          </span>
          <span className='badge badge-success'>Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <hr />
      <h3 className='mb-4'>Latest Github Repos</h3>
      {repoItems}
    </div>
  );
}

export default ProfileGithub;
