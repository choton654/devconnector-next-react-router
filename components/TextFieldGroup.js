import classNames from 'classnames';
import React from 'react';

function TextFieldGroup({
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  info,
}) {
  return (
    <div className='form-group'>
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
      {info && <small className='form-text text-muted'>{info}</small>}
    </div>
  );
}

export default TextFieldGroup;
