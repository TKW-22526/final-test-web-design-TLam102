// DATABASE 
const productDatabase = [
    { id: 1, name: "LỀU CẮM TRẠI DUNE™ 10.9 DÀNH CHO 4 NGƯỜI",   price: 2000000,  img: "../assets/sp1.1.png",   img2: "../assets/sp1.2.png" },
    { id: 2, name: "LỀU SƯỞI HÌNH CHÓP RANCH FIRE™ DÀNH CHO 4 NGƯỜI",        price: 1500000,   img: "../assets/sp2.1.png",  img2: "../assets/sp2.2.png" },
    { id: 3, name: "LỀU CẮM TRẠI SIÊU NHẸ STAR RIVER™ DÀNH CHO 2 NGƯỜI",          price: 2300000,  img: "../assets/sp3.1.png",   img2: "../assets/sp3.2.png" },
    { id: 4, name: "LỀU CẮM TRẠI CAPE™ 12.9 HÌNH VUÔNG, 8 NGƯỜI, DẠNG BẬT TỰ ĐỘNG",         price: 1256000,  img: "../assets/sp4.1.png",  img2: "../assets/sp4.2.png" },
    { id: 5, name: "LỀU CẮM TRẠI SIÊU NHẸ TAGAR™ DÀNH CHO 2 NGƯỜI ",  price: 860000,  img: "../assets/sp5.1.png",  img2:"../assets/sp5.2.png" },
    { id: 6, name: "LỀU CẮM TRẠI SIÊU NHẸ MONGAR™ DÀNH CHO 2 NGƯỜI",         price: 990000,   img: "../assets/sp6.1.png",     img2:"../assets/sp6.2.png" },
    { id: 7, name: "LỀU CẮM TRẠI CLOUD RIVER™ DÀNH CHO 3 NGƯỜI",     price: 1000000, img: "../assets/sp7.1.png",  img2:"../assets/sp7.2.png" },
    { id: 8, name: "LỀU CẮM TRẠI CAO CẤP GEN 4.8 DÀNH CHO 2 NGƯỜI",       price: 3000000,  img: "../assets/sp8.1.png",  img2: "../assets/sp8.2.png" },
];

const PRODUCT_LINK = "detail.html";

// HELPERS 
const formatPrice = (price) => price.toLocaleString("vi-VN") + " ₫";

// RENDER 
function createProductCard({ id, name, price, img, img2 }) {
    const card = document.createElement("div");
    card.className = "product-item";
    card.innerHTML = `
        <div class="product-image">
            <img class="img-main" src="${img}" alt="${name}" loading="lazy">
            <img class="img-hover" src="${img2 || img}" alt="${name}" loading="lazy">
            
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

// INIT 
document.addEventListener("DOMContentLoaded", () => renderProducts(productDatabase));