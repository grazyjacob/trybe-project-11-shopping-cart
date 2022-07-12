require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  })

  it('Se a função fetchPorducts for executada chama a fetch', () => {
    fetchProducts('computador');
    expect.assertions(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Teste se o retorno da função fetchProducts com o argumento "computador" é o objeto esperado', async () => {
    fetchProducts('computador');
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })

   it('Teste se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const expected = new Error('You must provide an url')
    expect(await fetchProducts()).toEqual(expected);
    });
});
