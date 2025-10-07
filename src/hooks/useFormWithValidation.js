import { useState } from 'react';

import { validators } from '@utils/validators.js';

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initErrors(initialValues));
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const input = event.target;
    const value = input.value;
    const name = input.name;

    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);

    const fieldIsValid = validators[name]?.validator(value) ?? true;

    const newErrors = {
      ...errors,
      [name]: !fieldIsValid ? validators[name]?.message : '',
    };
    setErrors(newErrors);

    const formIsNotValid = Object.values(newErrors).some((x) => x !== '');

    setIsValid(!formIsNotValid);
  }

  return { values, handleChange, errors, isValid };
}

function initErrors(formValues) {
  return Object.keys(formValues).reduce((errors, fieldName) => {
    errors[fieldName] = '';
    return errors;
  }, {});
}
