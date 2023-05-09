import './Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import { useCart } from '../hooks/useCart';

function Products({ products }) {
  const { addToCart, removeFromCart, checkProductInCart } = useCart();

  return (
    <div className="products">
      <ul>
        {products.slice(0, 10).map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <strong>{product.title}</strong> - ${product.price}
            </div>
            <div>
              <button
                style={{ backgroundColor: !checkProductInCart(product) ? '#09f' : 'red' }}
                onClick={() => {
                  !checkProductInCart(product) ? addToCart(product) : removeFromCart(product);
                }}
              >
                {!checkProductInCart(product) ? <AddToCartIcon /> : <RemoveFromCartIcon />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
