const products = [
    { id: 1, name: "Corrente Prata 3x1 5 Mm 60 Cm", price: 83.70, quantity: 20, image: "https://images.tcdn.com.br/img/img_prod/932431/corrente_prata_3x1_5_mm_60_cm_1913_1_ce3427819cfac86a570e169545e712f9.jpeg", rating: 4 },
    { id: 2, name: "Corrente De Prata Figaro Medium 60cm", price: 200, quantity: 15, image: "https://oldsiller.com.br/cdn/shop/products/CorrentedePrataGrumetFigaroOldSiller.png?v=1679689318", rating: 5 },
    { id: 3, name: "Corrente Cadeado - 70cm 3mm I Prata 925", price: 150, quantity: 30, image: "https://acdn.mitiendanube.com/stores/002/110/248/products/corrente-cartier-70cm-3mm-011-5733e32fa32118031316496417602185-640-0.jpg", rating: 3 },
    { id: 4, name: "Comprar Corrente masculina Figaro em ouro 18k 60 cm ", price: 170, quantity: 30, image: "https://cdn.sistemawbuy.com.br/arquivos/701d1e205e5dda700a710c234e87a1f5/produtos/6466620bcb817/img_03081-efbb84f1881d6fdaf61680-6466620cd8b4a.jpg", rating: 3 },
    { id: 5, name: "Corrente Masculina Fina Prata 925 Com Crucifixo Cruz Lisa P 50 Centímetros", price: 149.90, quantity: 30, image: "https://reipratas.com.br/cdn/shop/files/conjunto-minimalista-corrente-veneziana-1mm-com-pingente-cruz-lisa-p-prata-925-rei-pratas-jewelry.webp?v=1724078585", rating: 3 },
    { id: 6, name: "Corrente Masculina Grumet Pingente Cruz De Prata 925 - 3mm", price: 120, quantity: 30, image: "https://images.tcdn.com.br/img/img_prod/1182133/corrente_grumet_pingente_de_cruz_830_1_c71b18c4cdabe1d1775fde15129684ed.jpg", rating: 3 },
    { id: 7, name: "Corrente Masculina 70cm - Ouro 18k - PPD Joias - Loja de Joias de Ouro 18k e Mais", price: 139.90, quantity: 30, image: "https://cdn.awsli.com.br/600x700/930/930680/produto/233023246/3-d4f5gqzb82.png", rating: 3 },
    { id: 8, name: "Corrente Masculina De Prata 925 Elos 3x1 3mm 70cm", price: 80, quantity: 30, image: "https://cdn.awsli.com.br/2500x2500/2009/2009871/produto/133400644/6b253b2bf0.jpg", rating: 3 },
    { id: 9, name: "Corrente Masculina De Prata Grumet 60 Cm", price: 150, quantity: 30, image: "https://images.tcdn.com.br/img/img_prod/932431/corrente_masculina_de_prata_1x1_60_cm_1321_1_42cf5fbc7a29056ac753ddaabf82e1d2.jpg", rating: 3 },
    { id: 10, name: "Corrente de Prata 925 Legítima Masculina 60 Cm Pingente Cruz Lisa ", price: 220, quantity: 30, image: "https://cdn.awsli.com.br/600x700/1110/1110607/produto/180551084/1220617a9d.jpg", rating: 3 },
    { id: 11, name: "Pingente em Ouro 18k Glock G17 Gen4", price: 120, quantity: 30, image: "https://masate.com.br/wp-content/uploads/2019/08/pingente-em-ouro-18k-glock-g17-gen4-1.jpg", rating: 3 },
    { id: 12, name: "Kit Corrente com Pingente de Prata Masculina", price: 349.90, quantity: 30, image: "https://reipratas.com.br/cdn/shop/collections/corrente-com-pingente-rei-pratas-jewelry_17619324-587a-4b13-b20e-2a8f3e3fdf02.png?v=1722016636&width=2048", rating: 3 },
    // Adicione mais produtos conforme necessário
];
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">R$${product.price.toFixed(2)}</p>
        <p class="quantity">Quantidade: ${product.quantity}</p>
        <div class="star-rating">
            ${createStars(product.rating)}
        </div>
        <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
    `;
    return card;
}

function createStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">&#9733;</span>'; // Estrela preenchida
        } else {
            stars += '<span class="star empty">&#9734;</span>'; // Estrela vazia
        }
    }
    return stars;
}

function loadProducts(filterRating = null, searchQuery = '') {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpar produtos existentes

    let filteredProducts = products;

    if (filterRating !== null) {
        filteredProducts = filteredProducts.filter(product => product.rating === filterRating);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productList.appendChild(card);
    });
}

function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cartItems.length;

    cartList.innerHTML = ''; // Limpar itens existentes

    let total = 0;

    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <span>${product.name} - R$${product.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="remove-from-cart" data-id="${product.id}">Remover</button>
                </div>
            `;
            cartList.appendChild(listItem);
            total += product.price * item.quantity;
        }
    });

    cartTotal.textContent = `Total: R$${total.toFixed(2)}`;
}

function addToCart(productId) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Carregar todos os produtos por padrão
    updateCart();

    document.getElementById('product-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'), 10);
            addToCart(productId);
        }
    });

    document.getElementById('cart').addEventListener('click', toggleCart);
    document.querySelector('.close').addEventListener('click', toggleCart);

    document.getElementById('rating-filter').addEventListener('change', (event) => {
        const ratingFilter = parseInt(event.target.value, 10);
        if (isNaN(ratingFilter)) {
            // Se "Todos" for selecionado (valor não numérico)
            loadProducts(); // Carregar todos os produtos
        } else {
            loadProducts(ratingFilter);
        }
    });

    document.getElementById('search-bar').addEventListener('input', (event) => {
        const searchQuery = event.target.value;
        const ratingFilter = parseInt(document.getElementById('rating-filter').value, 10);
        if (isNaN(ratingFilter)) {
            loadProducts(null, searchQuery); // Filtrar apenas pela pesquisa
        } else {
            loadProducts(ratingFilter, searchQuery); // Filtrar por avaliação e pesquisa
        }
    });

    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'), 10);
            removeFromCart(productId);
        }
    });
});

function sendToWhatsApp() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const productsInfo = cartItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return `${product.name} - R$${product.price.toFixed(2)} x ${item.quantity}`;
    }).join('\n');

    const total = cartItems.reduce((acc, item) => {
        const product = products.find(p => p.id === item.id);
        return acc + (product.price * item.quantity);
    }, 0);

    const message = `Olá, gostaria de finalizar a compra dos seguintes itens:\n\n${productsInfo}\n\nTotal: R$${total.toFixed(2)}\n\n`;
    const phoneNumber = "5584996002433"; // Número do WhatsApp no formato internacional

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

document.getElementById('whatsapp-button').addEventListener('click', sendToWhatsApp);

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.getElementById('close-btn');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    closeBtn.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

