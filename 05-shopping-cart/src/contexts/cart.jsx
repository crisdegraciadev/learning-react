import { useReducer } from 'react';
import { createContext } from 'react';
import { CartActions, CartInitialState, CartReducer } from '../reducers/cart';

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(CartReducer, CartInitialState);

  const addToCart = (product) => {
    return dispatch({
      type: CartActions.ADD_TO_CART,
      payload: product
    });
  };

  const removeFromCart = (product) => {
    return dispatch({
      type: CartActions.REMOVE_FROM_CART,
      payload: product
    });
  };

  const clearCart = (product) => {
    return dispatch({
      type: CartActions.CLEAR_CART,
      payload: product
    });
  };

  return { state, addToCart, removeFromCart, clearCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer();

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
