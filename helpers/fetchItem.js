const fetchItem = async (argumento) => {
  if (!argumento) return new Error('You must provide an url');
  const url = `https://api.mercadolibre.com/items/${argumento}`;
  const results = fetch(url)
  .then((response) => response.json());
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}