const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item'; 

  section.appendChild(createCustomElement('span', 'item__sku', sku)); // sku é o id
  section.appendChild(createCustomElement('span', 'item__title', name)); // name é o title
  section.appendChild(createProductImageElement(image)); // é a thumbnail
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const secaoItens = document.querySelector('.items');

async function listaProdutos() {
const { results } = await fetchProducts('computador');
results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    secaoItens.appendChild(createProductItemElement({ sku, name, image }));
});
}

listaProdutos();

window.onload = () => {  
};