import React from 'react';
import Moment from 'react-moment';
import { AuthState } from '../context/states/authContext';

const Experience = ({ experience: profileExperience }) => {
  const { deleteExperience } = AuthState();

  const experience = profileExperience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className='btn btn-danger'>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
      <h4 className='mb-4'>Experience Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
          {experience}
        </thead>
      </table>
    </div>
  );
};

export default Experience;
