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
  const totalPrice = document.querySelector('.total-price');
  const cart = document.querySelector('.cart');

  const carregando = () => {
    const h3 = createCustomElement('h3', 'loading', 'carregando...');
    cart.appendChild(h3);
  };

  const carregamentoCompleto = () => {
    const element = document.querySelector('.loading');
    cart.removeChild(element); 
  };

  const getAllSavedCartItems = () => {
    const allItems = JSON.parse(getSavedCartItems());
    if (allItems) return allItems;
    return [];
  };

  const sumPrices = () => {
    const itemsSaved = getAllSavedCartItems();
    totalPrice.innerText = itemsSaved.reduce((acc, curr) => acc + curr.price, 0);
  };

  const cartItemClickListener = (event) => {
    event.target.remove();
    const itemToRemove = event.target.innerText;
    const newItem = itemToRemove.split('SKU: ')[1].split(' ')[0];
    console.log(newItem);
    const allItems = getAllSavedCartItems();
    console.log(allItems);
    const newItems = allItems.filter((item) => item.id !== newItem);
    console.log(newItems);
    saveCartItems(JSON.stringify(newItems));
    sumPrices();
  };
  
  const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
  }; 

  const addToCart = async (button) => {
  carregando();
  const itemsSaved = getAllSavedCartItems();
  const parent = button.target.parentNode;
  const itemID = getSkuFromProductItem(parent);
  const promisse = await fetchItem(itemID);
  const { id: sku, title: name, price: salePrice } = promisse;
  cartItems.appendChild(createCartItemElement({ sku, name, salePrice }));
  const saveObject = { id: sku, title: name, price: salePrice };
  itemsSaved.push(saveObject);
  parent.addEventListener('click', saveCartItems(JSON.stringify(itemsSaved)));
  sumPrices();
  carregamentoCompleto();
  };
  
  async function listaProdutos() {
  carregando();
  const secaoItens = document.querySelector('.items');
  const getClassButton = document.getElementsByClassName('item__add');
  const { results } = await fetchProducts('computador');
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
  secaoItens.appendChild(createProductItemElement({ sku, name, image }));
  });
  [...getClassButton].forEach((button) => { 
  button.addEventListener('click', addToCart);
  });
  sumPrices();
  carregamentoCompleto();
  }

  const buttonEmptyCar = document.querySelector('.empty-cart');
  
  buttonEmptyCar.addEventListener('click',
  () => { 
   cartItems.innerHTML = ''; 
   localStorage.clear(); 
   totalPrice.innerText = 'Total: $0'; 
  });
  listaProdutos();

  const recriarCartItems = (items) => {
    carregando();
    const itemsRecuperados = JSON.parse(items);
    itemsRecuperados.forEach((item) => {
    const { id, title, price } = item;
    const li = document.createElement('li');
    li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
    cartItems.appendChild(li);
    li.addEventListener('click', cartItemClickListener);
    });
    carregamentoCompleto();
  };

  window.onload = () => { 
  const items = getSavedCartItems('cartItems');
  if (items) {
    recriarCartItems(items); 
    sumPrices();
    carregando();
    carregamentoCompleto();
  }
  };
