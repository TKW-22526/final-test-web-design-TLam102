
// DATABASE 
const productDatabase = [
    { id: 1, name: "Túi Black Hole",   price: 200000,  img: "./assets/tui.png" },
    { id: 2, name: "Hoa Tulip",        price: 15000,   img: "./assets/camtrai.png" },
    { id: 3, name: "Hoa Cúc",          price: 100000,  img: "./assets/chaybo.png" },
    { id: 4, name: "Hoa Hồng",         price: 180000,  img: "./assets/camtrai.png" },
    { id: 5, name: "Hoa Cẩm Tú Cầu",  price: 190000,  img: "./assets/camtrai.png" },
    { id: 6, name: "Hoa Nhái",         price: 18000,   img: "./assets/nhac.png" },
    { id: 7, name: "Hoa Linh Lan",     price: 1000000, img: "./assets/camtrai.png" },
    { id: 8, name: "Hoa Lưu Ly",       price: 300000,  img: "./assets/docsach.png" },
];

const PRODUCT_LINK = "detail.html";

//  HELPERS 
const formatPrice = (price) => price.toLocaleString("vi-VN") + " ₫";

//  RENDER 
function createProductCard({ id, name, price, img }) {
    const card = document.createElement("div");
    card.className = "product-item";
    card.innerHTML = `
        <div class="product-image">
            <img src="${img}" alt="${name}" loading="lazy">
        </div>
        <div class="product-info">
            <p class="product-name">${name}</p>
            <p class="product-price">${formatPrice(price)}</p>
            <a class="btn btn-info" href="${PRODUCT_LINK}?id=${id}">Xem</a>
        </div>
    `;
    return card;
}

function renderProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;

    const fragment = document.createDocumentFragment();
    products.forEach(p => fragment.appendChild(createProductCard(p)));

    container.innerHTML = "";
    container.appendChild(fragment);
}

//  INIT 
document.addEventListener("DOMContentLoaded", () => renderProducts(productDatabase));