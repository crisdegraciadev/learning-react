import { useState } from 'react';
import './App.css';
import { Movies } from './components/Movie';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, fetchMovies, loading } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="searchbar">
            <input
              name="search"
              value={search}
              onChange={handleChange}
              className="search-bar"
              placeholder="Iron Man, Star Wars, The Matrix..."
            />
            <button className="search-button" type="submit">
              Buscar
            </button>
          </div>
          <div className="options">
            <div className="option">
              <input type="checkbox" name="year-order" onChange={handleSort} />
              <label htmlFor="year-order">Ordenar por orden alfabético</label>
            </div>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
