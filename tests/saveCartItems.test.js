const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Testa se ao executar a função com determinado argumento o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })
  it('Testa se ao executar saveCartItems com determinado argumento o métoco localStorage.setItem é chamado com dois parametros, sendo o primeiro cartItems e o segundo o valor passado como parametro à saveCartItems',
  () => {
    saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>')
  })
});
