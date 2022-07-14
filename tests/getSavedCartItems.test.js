const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Teste se ao executar a função getSavedCartItems chama o método localStorage.getItem', () => {
    getSavedCartItems('cartItems')
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  })
  it('Teste se ao executar getSavedCartItems o método localStorage.getItem é chamado com cartItems como parãmetro', () => {
    getSavedCartItems('cartItems')
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
});

