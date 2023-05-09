import { useContext } from 'react';
import { CartContext } from '../contexts/cart';

export function useCart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart must be used under a CartProvider');
  }

  const checkProductInCart = (product) => {
    const { cart } = cartContext;
    return cart.some((item) => item.id === product.id);
  };

  return { ...cartContext, checkProductInCart };
}
