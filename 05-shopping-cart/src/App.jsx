import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import Products from './components/Products';
import { CartProvider } from './contexts/cart';
import { useFilters } from './hooks/useFilters';
import initialProducts from './mocks/products.json';

function App() {
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(initialProducts);

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />;
      <Footer />
    </CartProvider>
  );
}

export default App;
