import { useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Input } from '@components/input/input.jsx';
import { useFormWithValidation } from '@hooks/useFormWithValidation';
import { selectError, selectIsLoading, login } from '@services/user';

export const Login = () => {
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
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(values));
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h3>Вход</h3>
      <Input
        inputRef={inputRef}
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
        {isLoading ? 'Вход...' : 'Войти'}
      </button>
      {error && <span className="error">{`Ошибка: ${error}`}</span>}
      <span>
        Вы - новый пользователь?
        <Link to={'/register'}>Зарегистрироваться</Link>
      </span>
    </form>
  );
};
