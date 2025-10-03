import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Home } from '@pages/home.jsx';
import { Login } from '@pages/login.jsx';
import { Profile } from '@pages/profile.jsx';
import { checkUserAuth } from '@services/user/actions.js';

import { Protected } from '../protected-route/protected-route.jsx';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Protected onlyUnAuth component={<Login />} />} />
      <Route path="/profile" element={<Protected component={<Profile />} />} />
    </Routes>
  );
};
