import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import TextAreaFieldGroup from '../components/TextAreaFieldGroup';
import TextFieldGroup from '../components/TextFieldGroup';
import { AuthState } from '../context/states/authContext';

function AddEducation() {
  const [state, setstate] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    description: '',
    current: false,
    errors: {},
    disabled: false,
  });

  const {
    state: { errors },
    addEducation,
  } = AuthState();

  useEffect(() => {
    if (errors) {
      setstate({
        ...state,
        errors: errors,
      });
    }
  }, [errors]);

  const onSubmit = (e) => {
    e.preventDefault();

    const eduData = {
      school: state.school,
      degree: state.degree,
      fieldofstudy: state.fieldofstudy,
      from: state.from,
      to: state.to,
      description: state.description,
    };

    addEducation(eduData);
  };

  const onChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onCheck = (e) => {
    setstate({
      ...state,
      disabled: !state.disabled,
      current: !state.current,
    });
  };

  return (
    <div className='add-experience'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <Link href='/users'>
              <a className='btn btn-light'>Go Back</a>
            </Link>
            <h1 className='display-4 text-center'>Add Education</h1>
            <p className='lead text-center'>Add education qualification</p>
            <small className='d-block pb-3'>required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder='* School'
                name='school'
                value={state.school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder='* Degree'
                name='degree'
                value={state.degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder='Field of study'
                name='fieldofstudy'
                value={state.fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name='from'
                type='date'
                value={state.from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name='to'
                type='date'
                value={state.to}
                onChange={onChange}
                error={errors.to}
                disabled={state.disabled ? 'disabled' : ''}
              />
              <div className='form-check mb-4'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  name='current'
                  value={state.current}
                  checked={state.current}
                  onChange={onCheck}
                  id='current'
                />
                <label htmlFor='current' className='form-check-label'>
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder='Job Description'
                name='description'
                value={state.description}
                onChange={onChange}
                error={errors.description}
                info='Tell us about the the education programme'
              />
              <input
                type='submit'
                value='Submit'
                className='btn btn-info btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEducation;
