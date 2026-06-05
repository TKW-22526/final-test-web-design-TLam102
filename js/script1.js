// CATEGORY DATABASE
const categoryDatabase = [
    { id: 1, name: "Lều siêu nhẹ",            img: "./assets/lieupl.png",    link: "./html/spleusieunhe.html" },
    { id: 2, name: "Lều cắm trại sang trọng", img: "./assets/traipl.png",   link: "./html/spleusangtrong.html" },
    { id: 3, name: "Đồ dùng ngủ",             img: "./assets/tuingupl.png", link: "./html/sptuingu.html" },
    { id: 4, name: "Đồ nội thất đường mòn",   img: "./assets/ghepl.png",    link: "./html/spduongmon.html" },
    { id: 5, name: "Bếp ngoài trời",          img: "./assets/beppl.png",    link: "./html/spbep.html" },
    { id: 6, name: "Đồ dùng leo núi",         img: "./assets/balopl.png",   link: "./html/spleonui.html" },
];

// ── HIỂN THỊ 1 DANH MỤC ──
function createCategoryCard(category) {
    const card = document.createElement("a");
    card.className = "category-item";
    card.href = category.link;

    const divImage = document.createElement("div");
    divImage.className = "category-image";

    const img = document.createElement("img");
    img.src     = category.img;
    img.alt     = category.name;
    img.loading = "lazy";

    divImage.appendChild(img);

    const divInfo = document.createElement("div");
    divInfo.className = "category-info";

    const p = document.createElement("p");
    p.className   = "category-name";
    p.textContent = category.name;

    divInfo.appendChild(p);

    card.appendChild(divImage);
    card.appendChild(divInfo);

    return card;
}

// ── HIỂN THỊ TẤT CẢ DANH MỤC ──
function renderCategories(categories) {
    const container = document.getElementById("category-list");
    if (!container) return;

    for (let i = 0; i < categories.length; i++) {
        container.appendChild(createCategoryCard(categories[i]));
    }
}

// ── CHẠY KHI TRANG TẢI XONG ──
document.addEventListener("DOMContentLoaded", function() {
    renderCategories(categoryDatabase);
});