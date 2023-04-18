import './App.css';
import { useCatFact } from './hooks/use-cat-fact';
import { useCatImage } from './hooks/use-cat-image';

const App = () => {
  const { fact, refreshFact } = useCatFact();
  const { imageUrl } = useCatImage({ fact });

  const handleClick = () => refreshFact();

  return (
    <main
      className="App"
      style={{ display: 'flex', flexDirection: 'column', placeItems: 'center' }}>
      <h1>Cat app</h1>
      <button onClick={handleClick}>Update</button>
      {imageUrl && <img style={{ maxWidth: '320px', height: 'auto' }} src={imageUrl} />}
      {fact && <p>{fact}</p>}
    </main>
  );
};

export default App;
