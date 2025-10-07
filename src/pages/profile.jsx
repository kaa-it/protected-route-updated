import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '@services/user/';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <h1>Личный кабинет</h1>
      <button className="primary" onClick={handleClick}>
        На главную
      </button>
      <button className="cancel" onClick={handleLogout}>
        Выход
      </button>
    </>
  );
};
