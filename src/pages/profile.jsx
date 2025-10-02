import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '@services/user/actions.js';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    navigate('/');
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <main className="card">
      <h1>Личный кабинет</h1>
      <button className="primary" onClick={onClick}>
        На главную
      </button>
      <button className="cancel" onClick={onLogout}>
        Выход
      </button>
    </main>
  );
};
