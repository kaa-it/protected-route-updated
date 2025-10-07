import { useState } from 'react';

import { formValidators } from '@utils/formValidators.js';

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initError(initialValues));
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

    const fieldIsValid = formValidators[name]?.validator(value) ?? true;

    const newErrors = {
      ...errors,
      [name]: !fieldIsValid ? formValidators[name]?.message : '',
    };
    setErrors(newErrors);

    // Проверяем валидность ВСЕХ полей формы
    const formIsValid = Object.keys(newValues).every((fieldName) => {
      const validator = formValidators[fieldName]?.validator;
      return validator ? validator(newValues[fieldName]) : true;
    });
    setIsValid(formIsValid);
  }

  return { values, handleChange, errors, isValid };
}

function initError(formValues) {
  return Object.keys(formValues).reduce((errorObject, fieldName) => {
    errorObject[fieldName] = '';
    return errorObject;
  }, {});
}
