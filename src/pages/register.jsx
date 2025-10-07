import { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input } from '@components/input/input.jsx';
import { useFormWithValidation } from '@hooks/useFormWithValidation';
import { selectError, selectIsLoading, register } from '@services/user';

export const Register = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(register(values));
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h3>Вход</h3>
      <Input
        inputRef={inputRef}
        type="text"
        name="name"
        id="name"
        placeholder="Имя"
        value={values.name || ''}
        error={errors.name}
        onChange={handleChange}
        aria-invalid={!!errors.email}
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={values.email || ''}
        error={errors.email}
        onChange={handleChange}
        aria-invalid={!!errors.email}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Пароль"
        value={values.password || ''}
        error={errors.password}
        onChange={handleChange}
        aria-invalid={!!errors.password}
      />
      <button type="submit" disabled={isLoading || !isValid}>
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>
      {error && <span className="error">{`Ошибка: ${error}`}</span>}
      <span>
        Вы - новый пользователь?&nbsp;
        <Link to={'/login'}>Войти</Link>
      </span>
    </form>
  );
};
