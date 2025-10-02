import { useDispatch } from 'react-redux';

import { login } from '@services/user/actions.js';

export const Login = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(login());
  };

  return (
    <main className="card">
      <h1>Логин</h1>
      <button className="success" onClick={onClick}>
        Войти
      </button>
    </main>
  );
};
