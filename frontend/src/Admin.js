import React, { useEffect, useState } from 'react';

const BOOK_API = 'http://localhost:8080';

export default function Admin({ token }) {
  const [stats, setStats] = useState(null);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const headers = { Authorization: token };
    fetch(`${BOOK_API}/admin/stats`, { headers })
      .then(r => r.json())
      .then(setStats);
    fetch(`${BOOK_API}/admin/exchanges`, { headers })
      .then(r => r.json())
      .then(setExchanges);
  }, [token]);

  return (
    <div>
      <h2>Admin</h2>
      {stats && (
        <ul>
          <li>Books: {stats.books}</li>
          <li>Exchanges: {stats.exchanges}</li>
        </ul>
      )}
      <h3>All Exchanges</h3>
      <ul>
        {exchanges.map(e => (
          <li key={e.id}>
            Book {e.book.id} from {e.fromUserId} to {e.toUserId} at {e.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
