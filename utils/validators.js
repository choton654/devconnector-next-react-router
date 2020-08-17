const validator = require('validator');

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

// register validation
const validateRegisterInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 to 30 characters';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password is required';
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// login validation
const validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid email';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// profile validation
const validateProfileInput = (data) => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 4 characters';
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!validator.isURL(data.website)) {
    errors.website = 'Not a valid URL';
  }

  if (!validator.isURL(data.twitter)) {
    errors.twitter = 'Not a valid URL';
  }

  if (!validator.isURL(data.facebook)) {
    errors.facebook = 'Not a valid URL';
  }

  if (data.youtube) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }
  if (data.linkedin) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }
  if (data.instagram) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// experience validation
const validateExpInput = (data) => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.title)) {
    errors.title = 'Job title is required';
  }

  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// education validation
const validateEduInput = (data) => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// post validation
const validatePostInput = (data) => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.handle = 'Text needs to between 10 and 300 characters';
  }

  if (validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = {
  isEmpty,
  validateRegisterInput,
  validateLoginInput,
  validateProfileInput,
  validateExpInput,
  validateEduInput,
  validatePostInput,
};
