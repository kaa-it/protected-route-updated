import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Home, Login, Profile, Register } from '@pages/';
import { checkUserAuth } from '@services/user/';

import { Protected } from '../protected-route/protected-route.jsx';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <main className="card">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Protected onlyUnAuth component={<Register />} />}
        />
        <Route path="/login" element={<Protected onlyUnAuth component={<Login />} />} />
        <Route path="/profile" element={<Protected component={<Profile />} />} />
      </Routes>
    </main>
  );
};
