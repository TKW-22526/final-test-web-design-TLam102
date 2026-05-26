// DATABASE 
const productDatabase = [
    { id: 1, name: "BỘ DỤNG CỤ NẤU ĂN DÃ NGOẠI BẰNG NHÔM TRAILCOOK™",   price: 650000,  img: "../assets/trangthietbi1.1.png",   img2: "../assets/trangthietbi1.2.png" },
    { id: 2, name: "BA LÔ LEO NÚI ROCK™",        price: 1000000,   img: "../assets/trangthietbi2.1.png",  img2: "../assets/trangthietbi2.2.png" },
    { id: 3, name: "BÀN CẮM TRẠI MÔ-ĐUN FLATTOP™ IGT",          price: 2300000,  img: "../assets/trangthietbi3.1.png",   img2: "../assets/trangthietbi3.2.png" },
    { id: 4, name: "BÀN CẮM TRẠI GẤP GỌN PEAKLITE™ FT07",         price: 1256000,  img: "../assets/trangthietbi4.1.png",  img2: "../assets/trangthietbi4.2.png" },
    { id: 5, name: "QUẦN LỘI NƯỚC NAM SWIFTCURRENT®  EXPEDITION ZIP- FRONTI ",  price: 860000,  img: "../assets/trangthietbi5.1.png",  img2:"../assets/trangthietbi5.2.png" },
    { id: 6, name: "ÁO GHI LÊ STEALTH PACK ",         price: 990000,   img: "../assets//trangthietbi6.1.png",     img2:"../assets//trangthietbi6.2.png" },
    { id: 7, name: "GIẦY LEO NÚI CHỐNG THẤM NƯỚC MOAD ÊMID-DÀNH CHO NAM",     price: 1000000, img: "../assets/trangthietbi7.1.png",  img2:"../assets/trangthietbi7.2.png" },
    { id: 8, name: "MŨ BẢO HIỂM LEO NÚI METEORA",       price: 3000000,  img: "../assets/trangthietbi8.1.png",  img2: "../assets/trangthietbi8.2.png" },
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