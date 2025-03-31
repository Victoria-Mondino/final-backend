const socket = io();

const productList = document.getElementById('product-list');
const productForm = document.getElementById('product-form');

function reloadStyles() {
    const link = document.querySelector("link[rel='stylesheet']");
    const href = link.getAttribute("href");
    link.setAttribute("href", href + "?v=" + new Date().getTime());
}

socket.on('updateProducts', (products) => {
    const existingItems = new Map();

    document.querySelectorAll('.item-list-m').forEach((item) => {
        existingItems.set(item.id, item);
    });

    products.forEach((product) => {
        let li = existingItems.get(`product-${product.id}`);

        if (!li) {
            li = document.createElement('li');
            li.id = `product-${product.id}`;
            li.classList.add('item-list-m');

            const productText = document.createElement('span');
            productText.classList.add('item-list-m');
            productText.textContent = `${product.code} - ${product.title} - $${product.price}`;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => deleteProduct(product.id);

            const trashIcon = document.createElement('img');
            trashIcon.src = '/trash-can-solid.svg';
            trashIcon.alt = 'Delete';
            trashIcon.classList.add('trash-icon');

            deleteButton.appendChild(trashIcon);
            li.appendChild(productText);
            li.appendChild(deleteButton);

            productList.appendChild(li);
        }
    });

    existingItems.forEach((li, id) => {
        if (!products.some((product) => `product-${product.id}` === id)) {
            li.remove();
        }
    });

    updateProductList(products);
    reloadStyles();
});


productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const code = document.getElementById('code').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);
    const category = document.getElementById('category').value.trim();

    if (!title || !description || !code || isNaN(price) || isNaN(stock) || !category) {
        alert('⚠️ Please fill in all fields correctly.');
        return;
    }

    const newProduct = { title, description, code, price, stock, category, thumbnails: [], status: true };

    socket.emit('newProduct', newProduct);
    productForm.reset();
});


function deleteProduct(productId) {
    document.getElementById(`product-${productId}`)?.remove();
    socket.emit('deleteProduct', productId);
}
