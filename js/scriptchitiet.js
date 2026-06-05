// ── DATABASE SẢN PHẨM ──
const productDatabase = [
    { id: 1, name: "LỀU CẮM TRẠI DUNE™ 10.9 DÀNH CHO 4 NGƯỜI",                      price: 2000000, img: "../assets/sp1.1.png", img2: "../assets/sp1.2.png", desc: "Lều cắm trại tiêu chuẩn, phù hợp cho gia đình 4 người. Chất liệu bền, chống nước tốt." },
    { id: 2, name: "LỀU SƯỞI HÌNH CHÓP RANCH FIRE™ DÀNH CHO 4 NGƯỜI",                price: 1500000, img: "../assets/sp2.1.png", img2: "../assets/sp2.2.png", desc: "Thiết kế hình chóp độc đáo, giữ ấm tốt trong mùa đông." },
    { id: 3, name: "LỀU CẮM TRẠI SIÊU NHẸ STAR RIVER™ DÀNH CHO 2 NGƯỜI",             price: 2300000, img: "../assets/sp3.1.png", img2: "../assets/sp3.2.png", desc: "Siêu nhẹ, dễ mang theo, lý tưởng cho chuyến đi 2 người." },
    { id: 4, name: "LỀU CẮM TRẠI CAPE™ 12.9 HÌNH VUÔNG, 8 NGƯỜI, DẠNG BẬT TỰ ĐỘNG", price: 1256000, img: "../assets/sp4.1.png", img2: "../assets/sp4.2.png", desc: "Lều lớn dành cho nhóm 8 người, bật tự động tiện lợi." },
    { id: 5, name: "LỀU CẮM TRẠI SIÊU NHẸ TAGAR™ DÀNH CHO 2 NGƯỜI",                 price: 860000,  img: "../assets/sp5.1.png", img2: "../assets/sp5.2.png", desc: "Nhỏ gọn, tiết kiệm không gian, dễ dàng lắp đặt." },
    { id: 6, name: "LỀU CẮM TRẠI SIÊU NHẸ MONGAR™ DÀNH CHO 2 NGƯỜI",                price: 990000,  img: "../assets/sp6.1.png", img2: "../assets/sp6.2.png", desc: "Chống gió tốt, thích hợp cắm trại vùng núi cao." },
    { id: 7, name: "LỀU CẮM TRẠI CLOUD RIVER™ DÀNH CHO 3 NGƯỜI",                     price: 1000000, img: "../assets/sp7.1.png", img2: "../assets/sp7.2.png", desc: "Thoáng mát, thông gió tốt, phù hợp mùa hè." },
    { id: 8, name: "LỀU CẮM TRẠI CAO CẤP GEN 4.8 DÀNH CHO 2 NGƯỜI",                 price: 3000000, img: "../assets/sp8.1.png", img2: "../assets/sp8.2.png", desc: "Cao cấp, vật liệu xịn, chống chịu mọi thời tiết khắc nghiệt." },
];

// ── LẤY ID TỪ URL ──
function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"));
}

// ── ĐỊNH DẠNG GIÁ TIỀN ──
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + " ₫";
}

// ── TÌM SẢN PHẨM THEO ID ──
function findProduct(id) {
    for (let i = 0; i < productDatabase.length; i++) {
        if (productDatabase[i].id === id) {
            return productDatabase[i];
        }
    }
    return null; // không tìm thấy
}

// ── ĐỔI ẢNH KHI BẤM THUMBNAIL ──
function switchImg(thumb, src) {
    // đổi ảnh chính
    document.getElementById("main-img").src = src;

    // bỏ viền tất cả thumbnail
    const allThumbs = document.querySelectorAll(".thumb");
    for (let i = 0; i < allThumbs.length; i++) {
        allThumbs[i].classList.remove("active");
    }

    // thêm viền cho thumbnail đang chọn
    thumb.classList.add("active");
}

// ── TẠO 1 THUMBNAIL ──
function createThumbnail(src, isActive) {
    const div = document.createElement("div");
    div.className = "thumb";
    if (isActive) {
        div.classList.add("active");
    }

    // khi bấm vào thumbnail thì đổi ảnh chính
    div.onclick = function() {
        switchImg(div, src);
    };

    const img = document.createElement("img");
    img.src = src;
    img.alt = "";

    div.appendChild(img);
    return div;
}

// ── HIỂN THỊ CHI TIẾT SẢN PHẨM ──
function renderDetail(product) {
    // điền ảnh chính
    document.getElementById("main-img").src = product.img;
    document.getElementById("main-img").alt = product.name;

    // tạo thumbnail (ảnh 1 và ảnh 2)
    const thumbContainer = document.getElementById("thumbnails");
    thumbContainer.innerHTML = "";
    thumbContainer.appendChild(createThumbnail(product.img,  true));  // ảnh 1 - mặc định active
    thumbContainer.appendChild(createThumbnail(product.img2, false)); // ảnh 2

    // điền thông tin
    document.getElementById("detail-name").textContent  = product.name;
    document.getElementById("detail-price").textContent = formatPrice(product.price);
    document.getElementById("detail-desc").textContent  = product.desc;

    // đổi tiêu đề tab trình duyệt
    document.title = product.name + " – CampZone";
}

// ── HIỂN THỊ LỖI NẾU KHÔNG TÌM THẤY SẢN PHẨM ──
function renderNotFound() {
    const detail = document.getElementById("product-detail");
    detail.innerHTML = "<p style='padding:40px;'>Không tìm thấy sản phẩm.</p>";
}

// ── SỐ LƯỢNG ──
function changeQty(delta) {
    const input = document.getElementById("qty");
    let val = parseInt(input.value) + delta;
    if (val < 1)  val = 1;
    if (val > 99) val = 99;
    input.value = val;
}

// ── NÚT YÊU THÍCH ──
function toggleWish(btn) {
    btn.classList.toggle("active");
    const icon = btn.querySelector("i");
    if (btn.classList.contains("active")) {
        icon.className = "fa-solid fa-heart";   // tim đặc
    } else {
        icon.className = "fa-regular fa-heart"; // tim rỗng
    }
}

// ── MODAL ──
function showModal(modal) {
    document.getElementById("modal-overlay").style.display = "block";
    modal.style.display = "block";
    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            modal.classList.add("active");
        });
    });
    document.body.style.overflow = "hidden";
}

function hideAll() {
    const mLogin    = document.getElementById("modal-login");
    const mRegister = document.getElementById("modal-register");

    mLogin.classList.remove("active");
    mRegister.classList.remove("active");
    setTimeout(function() { mLogin.style.display    = "none"; }, 300);
    setTimeout(function() { mRegister.style.display = "none"; }, 300);

    document.getElementById("modal-overlay").style.display = "none";
    document.body.style.overflow = "";
}

function switchModal(target) {
    hideAll();
    setTimeout(function() { showModal(target); }, 320);
}

// ── CHẠY KHI TRANG TẢI XONG ──
document.addEventListener("DOMContentLoaded", function() {

    // 1. Hiển thị sản phẩm theo id trên URL
    const id      = getIdFromURL();
    const product = findProduct(id);

    if (!product) {
        renderNotFound();
    } else {
        renderDetail(product);
    }

    // 2. Gắn sự kiện modal
    const mLogin    = document.getElementById("modal-login");
    const mRegister = document.getElementById("modal-register");

    document.getElementById("btn-login")     .addEventListener("click",   function(e) { e.preventDefault(); showModal(mLogin); });
    document.getElementById("btn-register")  .addEventListener("click",   function(e) { e.preventDefault(); showModal(mRegister); });
    document.getElementById("close-login")   .addEventListener("click",   hideAll);
    document.getElementById("close-register").addEventListener("click",   hideAll);
    document.getElementById("goto-register") .addEventListener("click",   function(e) { e.preventDefault(); switchModal(mRegister); });
    document.getElementById("goto-login")    .addEventListener("click",   function(e) { e.preventDefault(); switchModal(mLogin); });
    document.getElementById("modal-overlay") .addEventListener("click",   hideAll);
    document.addEventListener("keydown", function(e) { if (e.key === "Escape") hideAll(); });
});