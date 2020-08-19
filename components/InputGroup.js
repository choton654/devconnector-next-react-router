import classNames from 'classnames';
import React from 'react';

function InputGroup({ type, placeholder, name, value, onChange, error, icon }) {
  return (
    <div className='input-group'>
      <div className='input-group-prepend'>
        <span className='input-group-text'>
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classNames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
}

export default InputGroup;
