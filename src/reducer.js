export const initialState = {
  cart: [],
  user: null, //We assume the user is null initially
};

//Selector
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);
/*Goes thru the cart and tallys it up*/

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      ); //It'll find the first match not all of them and return it
      let newCart = [...state.cart]; //We use a temporary variable

      if (index >= 0) {
        newCart.splice(index, 1); //Chopping the basket by 1
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the cart!`
        );
      }
      return {
        ...state,
        cart: newCart,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
