// CATEGORY DATABASE
const categoryDatabase = [
    { id: 1, name: "Lều siêu nhẹ",            img: "./assets/lieupl.png",    link: "./html/san-phamleu.html" },
    { id: 2, name: "Lều cắm trại sang trọng", img: "./assets/traipl.png",   link: "./html/san-phamleu.html" },
    { id: 3, name: "Đồ dùng ngủ",             img: "./assets/tuingupl.png", link: "./html/san-phamleu.html" },
    { id: 4, name: "Đồ nội thất đường mòn",   img: "./assets/ghepl.png",    link: "./html/san-phamleu.html" },
    { id: 5, name: "Bếp ngoài trời",          img: "./assets/beppl.png",    link:"./html/san-phamleu.html" },
    { id: 6, name: "Đồ dùng leo núi",         img: "./assets/balopl.png",   link: "./html/san-phamleu.html" },
];

// ========== RENDER DANH MỤC ==========
function createCategoryCard({ name, img, link }) {
    const card = document.createElement("a");
    card.className = "category-item";
    card.href = link;
    card.innerHTML = `
        <div class="category-image">
            <img src="${img}" alt="${name}" loading="lazy">
        </div>
        <div class="category-info">
            <p class="category-name">${name}</p>
        </div>
    `;
    return card;
}

function renderCategories(categories) {
    const container = document.getElementById("category-list");
    if (!container) return;
    const fragment = document.createDocumentFragment();
    categories.forEach(c => fragment.appendChild(createCategoryCard(c)));
    container.appendChild(fragment);
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
    renderCategories(categoryDatabase);
});