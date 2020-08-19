import classNames from 'classnames';
import React from 'react';

function SelectListGroup({ name, value, onChange, error, info, options }) {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className='form-group'>
      <select
        className={classNames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onChange={onChange}>
        {selectOptions}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
      {info && <small className='form-text text-muted'>{info}</small>}
    </div>
  );
}

export default SelectListGroup;
