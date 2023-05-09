export const CartInitialState = [];

export const CartActions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
};

export function CartReducer(state, action) {
  const actions = {
    ADD_TO_CART: addToCart,
    REMOVE_FROM_CART: removeFromCart,
    CLEAR_CART: clearCart
  };

  const { type, payload } = action;

  return actions[type](state, payload);
}

function addToCart(state, payload) {
  const idx = state.findIndex((item) => item.id === payload.id);

  if (idx >= 0) {
    return state.map((item, currentIdx) =>
      idx === currentIdx ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...state, { ...payload, quantity: 1 }];
}

function removeFromCart(state, payload) {
  return state.filter((item) => item.id !== payload.id);
}

function clearCart(_state, _payload) {
  return CartInitialState;
}
