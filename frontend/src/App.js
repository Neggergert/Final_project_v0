import React, { useEffect, useState } from 'react';

const BOOK_API = 'http://localhost:8080';
const AUTH_API = 'http://localhost:8081';

function Login({ onToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async e => {
    e.preventDefault();
    const res = await fetch(`${AUTH_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      onToken(data.token);
    } else {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit">Sign in</button>
    </form>
  );
}

function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [toUserId, setToUserId] = useState('');
  const [exchangeLocation, setExchangeLocation] = useState('');

  const load = async () => {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (author) params.append('author', author);
    const res = await fetch(`${BOOK_API}/books?${params.toString()}`);
    setBooks(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const addBook = async e => {
    e.preventDefault();
    await fetch(`${BOOK_API}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        author: newAuthor,
        location: newLocation
      })
    });
    setNewTitle('');
    setNewAuthor('');
    setNewLocation('');
    load();
  };

  const exchange = async id => {
    if (!toUserId || !exchangeLocation) {
      alert('Specify user and location');
      return;
    }
    await fetch(`${BOOK_API}/books/${id}/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromUserId: 1,
        toUserId: Number(toUserId),
        location: exchangeLocation
      })
    });
    setToUserId('');
    setExchangeLocation('');
  };

  return (
    <div>
      <h2>Books</h2>
      <div>
        <input
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button onClick={load}>Search</button>
      </div>
      <ul>
        {books.map(b => (
          <li key={b.id}>
            {b.title} by {b.author} ({b.location}){' '}
            <button onClick={() => exchange(b.id)}>Exchange</button>
          </li>
        ))}
      </ul>

      <form onSubmit={addBook}>
        <h3>Add Book</h3>
        <input
          placeholder="title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
        />
        <input
          placeholder="author"
          value={newAuthor}
          onChange={e => setNewAuthor(e.target.value)}
        />
        <input
          placeholder="location"
          value={newLocation}
          onChange={e => setNewLocation(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <h3>Exchange details</h3>
        <input
          placeholder="to user id"
          value={toUserId}
          onChange={e => setToUserId(e.target.value)}
        />
        <input
          placeholder="location"
          value={exchangeLocation}
          onChange={e => setExchangeLocation(e.target.value)}
        />
      </div>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return <Login onToken={setToken} />;
  }

  return <Books />;
}

export default App;
