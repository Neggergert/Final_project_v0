import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Books from './Books';
import Admin from './Admin';
import Nav from './Nav';

function RequireAuth({ token, children }) {
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      {token && <Nav onLogout={logout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/books"
          element={
            <RequireAuth token={token}>
              <Books token={token} />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth token={token}>
              <Admin token={token} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
