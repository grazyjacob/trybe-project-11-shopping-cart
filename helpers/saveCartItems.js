const cartItems = document.querySelector('.cart__items');
const saveCartItems = (item) => {
  localStorage.setItem(cartItems, item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
