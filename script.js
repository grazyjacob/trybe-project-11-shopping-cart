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

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;
const cartItems = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  const click = event;
  click.target.innerText = ''; 
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (button) => { 
  const parent = button.target.parentNode;
  const itemID = getSkuFromProductItem(parent);
  const promisse = await fetchItem(itemID);
  const { id: sku, title: name, price: salePrice } = promisse;
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  parent.addEventListener('click', saveCartItems({ sku, name, salePrice }));
 };
const secaoItens = document.querySelector('.items');
async function listaProdutos() {
const getClassButton = document.getElementsByClassName('item__add');
const { results } = await fetchProducts('computador');
results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    secaoItens.appendChild(createProductItemElement({ sku, name, image }));
});
[...getClassButton].forEach((button) => { 
  button.addEventListener('click', addToCart);
});
}
listaProdutos();
window.onload = () => { 
  // const items = getSavedCartItems();
};