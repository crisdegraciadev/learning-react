import { Link } from '../components/Link';

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esto es una pagina de ejemplo para crear un React Router desde cero</p>
      <Link to="/about">Ir a about</Link>
    </>
  );
}
