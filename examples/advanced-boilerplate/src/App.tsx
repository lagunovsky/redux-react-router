import React, { FunctionComponent } from 'react';
import ProtectedRoute from './compnoents/ProtectedRoute';
import Settings from './pages/Settings/Settings';

import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SignIn from './pages/SignIn/SignIn';
import { Routes, Route } from 'react-router';

interface Props {
}

export function AppRoutes(){
  return (
    <Routes >
      <Route path="/" element={
        <SignIn />
      }>
      </Route>

      <Route path="/forgot-password" element={
        <ForgotPassword />
      } />
      <Route
        path="/settings"
        element={  <ProtectedRoute>
          <Settings />
        </ProtectedRoute> }
      />
    </Routes>
  )
}

export default AppRoutes;
