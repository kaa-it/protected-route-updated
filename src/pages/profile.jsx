import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout, selectIsLoading } from '@services/user/';

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

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
        {isLoading ? 'Выход...' : 'Выйти'}
      </button>
    </>
  );
};
