require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  })

  it('Se a função fetchItem for executada chama a fetch', () => {
    fetchItem('MLB1615760527');
    expect.assertions(1)
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('Se a função fetchItem for chamada sem nenhum parametro retorna um erro' , async () => {
    const expected = new Error('You must provide an url')
    expect(await fetchItem()).toEqual(expected);
  })
  it('Se chamar a função passando um argumento a função retorna um objeto igual ao "item"', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('Se chamar a função passando um argumento a função utiliza um endpoint com o argumento passado', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  })
});

// - Teste se, ao chamar a função `fetchItem` com o argumento 
// do item "MLB1615760527", a função `fetch` utiliza o endpoint
// "https://api.mercadolibre.com/items/MLB1615760527";
 
// - Será avaliado se os testes implementados atingem no mínimo 50% da cobertura total e 100% da função `fetchItem`.