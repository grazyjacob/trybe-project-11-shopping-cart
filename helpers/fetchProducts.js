const fetchProducts = async (nomeDoProduto) => {
  if (!nomeDoProduto) return new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${nomeDoProduto}`;
  return fetch(url)
  .then((response) => response.json())
};


if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
