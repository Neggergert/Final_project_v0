import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ onLogout }) {
  return (
    <nav>
      <Link to="/books">Books</Link> | <Link to="/admin">Admin</Link> |{' '}
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}
