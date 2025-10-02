import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/profile');
  };

  return (
    <main className="card">
      <h1>Главная</h1>
      <button className="primary" onClick={onClick}>
        Личный кабинет
      </button>
    </main>
  );
};
