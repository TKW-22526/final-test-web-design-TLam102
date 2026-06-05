// DATABASE 
const productDatabase = [
   
    { id: 1, name: "BA LÔ LEO NÚI ROCK™",        price: 1000000,   img: "../assets/trangthietbi2.1.png",  img2: "../assets/trangthietbi2.2.png" },
    { id: 2, name: "QUẦN LỘI NƯỚC NAM SWIFTCURRENT®  EXPEDITION ZIP- FRONTI ",  price: 860000,  img: "../assets/trangthietbi5.1.png",  img2:"../assets/trangthietbi5.2.png" },
    { id: 3, name: "ÁO GHI LÊ STEALTH PACK ",         price: 990000,   img: "../assets//trangthietbi6.1.png",     img2:"../assets//trangthietbi6.2.png" },
    { id: 4, name: "GIẦY LEO NÚI CHỐNG THẤM NƯỚC MOAD ÊMID-DÀNH CHO NAM",     price: 1000000, img: "../assets/trangthietbi7.1.png",  img2:"../assets/trangthietbi7.2.png" },
    { id: 5, name: "MŨ BẢO HIỂM LEO NÚI METEORA",       price: 3000000,  img: "../assets/trangthietbi8.1.png",  img2: "../assets/trangthietbi8.2.png" },
];


const PRODUCT_LINK = "chi-tiet.html";

// ── ĐỊNH DẠNG GIÁ TIỀN ──
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + " ₫";
}

// ── TẠO ID MỚI (lấy số id lớn nhất hiện có rồi cộng 1) ──
function createNewId() {
    let maxId = 0;
    for (let i = 0; i < productDatabase.length; i++) {
        if (productDatabase[i].id > maxId) {
            maxId = productDatabase[i].id;
        }
    }
    return maxId + 1;
}

// ── HIỂN THỊ 1 SẢN PHẨM ──
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-item";
    card.setAttribute("data-id", product.id); // gắn id để dễ tìm lại

    // -- hình ảnh --
    const divImage = document.createElement("div");
    divImage.className = "product-image";

    const imgMain = document.createElement("img");
    imgMain.className = "img-main";
    imgMain.src       = product.img;
    imgMain.alt       = product.name;
    imgMain.loading   = "lazy";

    const imgHover = document.createElement("img");
    imgHover.className = "img-hover";
    imgHover.src       = product.img2 || product.img;
    imgHover.alt       = product.name;
    imgHover.loading   = "lazy";

    divImage.appendChild(imgMain);
    divImage.appendChild(imgHover);

    // -- thông tin --
    const divInfo = document.createElement("div");
    divInfo.className = "product-info";

    const pName = document.createElement("p");
    pName.className   = "product-name";
    pName.textContent = product.name;

    const pPrice = document.createElement("p");
    pPrice.className   = "product-price";
    pPrice.textContent = formatPrice(product.price);

    // -- nhóm nút bấm --
    const divButtons = document.createElement("div");
    divButtons.className = "product-buttons";

    // nút Xem
    const btnView = document.createElement("a");
    btnView.className    = "btn btn-info";
    btnView.href         = PRODUCT_LINK + "?id=" + product.id;
    btnView.textContent  = "Xem";

    // nút Sửa
    const btnEdit = document.createElement("button");
    btnEdit.className   = "btn btn-edit";
    btnEdit.textContent = "sửa";
    btnEdit.title       = "Sửa sản phẩm";
    btnEdit.onclick     = function() {
        openModalEdit(product.id);
    };

    // nút Xóa
    const btnDelete = document.createElement("button");
    btnDelete.className   = "btn btn-delete";
    btnDelete.textContent = "xóa";
    btnDelete.title       = "Xóa sản phẩm";
    btnDelete.onclick     = function() {
        deleteProduct(product.id);
    };
        // nút Thêm (dấu +)
    const btnAdd = document.createElement("button");
    btnAdd.className   = "btn btn-add";
    btnAdd.textContent = "+";
    btnAdd.title       = "Thêm sản phẩm mới";
    btnAdd.onclick     = function() {
        openModalAdd();
    };

    divButtons.appendChild(btnView);
    divButtons.appendChild(btnAdd);
    divButtons.appendChild(btnEdit);
    divButtons.appendChild(btnDelete);

    divInfo.appendChild(pName);
    divInfo.appendChild(pPrice);
    divInfo.appendChild(divButtons);

    // -- ghép vào card --
    card.appendChild(divImage);
    card.appendChild(divInfo);

    return card;
}

// ── HIỂN THỊ TẤT CẢ SẢN PHẨM ──
function renderProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        container.appendChild(createProductCard(products[i]));
    }
}

// ══════════════════════════════════════
//  XÓA SẢN PHẨM
// ══════════════════════════════════════
function deleteProduct(id) {
    let confirmed = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (!confirmed) return;

    // Lọc ra mảng mới không có sản phẩm bị xóa
    for (let i = 0; i < productDatabase.length; i++) {
        if (productDatabase[i].id === id) {
            productDatabase.splice(i, 1); // xóa 1 phần tử tại vị trí i
            break;
        }
    }

    renderProducts(productDatabase); // vẽ lại danh sách
    alert("Đã xóa sản phẩm!");
}


//  MODAL DÙNG CHUNG (THÊM / SỬA)
// Tạo modal một lần, dùng cho cả thêm lẫn sửa
function createModal() {
    // tránh tạo 2 lần
    if (document.getElementById("modal-product")) return;

    const overlay = document.createElement("div");
    overlay.id        = "modal-product-overlay";
    overlay.className = "modal-product-overlay";
    overlay.onclick   = closeModal; // bấm ngoài thì đóng

    const box = document.createElement("div");
    box.id        = "modal-product";
    box.className = "modal-product-box";
    box.onclick   = function(e) { e.stopPropagation(); }; // tránh đóng khi bấm trong box

    box.innerHTML = `
        <h3 id="modal-product-title">Thêm sản phẩm</h3>

        <label>Tên sản phẩm</label>
        <input type="text" id="mp-name" placeholder="Tên sản phẩm...">

        <label>Giá (VNĐ)</label>
        <input type="number" id="mp-price" placeholder="Ví dụ: 1500000">

        <label>Đường dẫn hình chính</label>
        <input type="text" id="mp-img" placeholder="http://..........">

        <label>Đường dẫn hình hover</label>
        <input type="text" id="mp-img2" placeholder="http://..........">

        <div class="modal-product-buttons">
            <button id="modal-product-save" class="btn btn-info">Lưu</button>
            <button onclick="closeModal()" class="btn btn-delete">Hủy</button>
        </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

function closeModal() {
    const overlay = document.getElementById("modal-product-overlay");
    if (overlay) overlay.style.display = "none";
}

// ── MỞ MODAL THÊM ──
function openModalAdd() {
    createModal();

    document.getElementById("modal-product-title").textContent = "Thêm sản phẩm mới";
    document.getElementById("mp-name").value  = "";
    document.getElementById("mp-price").value = "";
    document.getElementById("mp-img").value   = "";
    document.getElementById("mp-img2").value  = "";

    // gắn sự kiện nút Lưu → thêm mới
    document.getElementById("modal-product-save").onclick = function() {
        saveNewProduct();
    };

    document.getElementById("modal-product-overlay").style.display = "flex";
}

function saveNewProduct() {
    let name  = document.getElementById("mp-name").value.trim();
    let price = parseInt(document.getElementById("mp-price").value);
    let img   = document.getElementById("mp-img").value.trim();
    let img2  = document.getElementById("mp-img2").value.trim();

    if (name == "" || isNaN(price) || img == "") {
        alert("Vui lòng điền Tên, Giá và Hình chính!");
        return;
    }

    let newProduct = {
        id:    createNewId(),
        name:  name,
        price: price,
        img:   img,
        img2:  img2 || img // nếu không có hình hover thì dùng hình chính
    };

    productDatabase.push(newProduct);
    renderProducts(productDatabase);
    closeModal();
    alert("Đã thêm sản phẩm mới!");
}

// ── MỞ MODAL SỬA ──
function openModalEdit(id) {
    createModal();

    // Tìm sản phẩm cần sửa
    let product = null;
    for (let i = 0; i < productDatabase.length; i++) {
        if (productDatabase[i].id === id) {
            product = productDatabase[i];
            break;
        }
    }
    if (!product) return;

    document.getElementById("modal-product-title").textContent = "Sửa sản phẩm";

    // Điền thông tin hiện tại vào ô nhập
    document.getElementById("mp-name").value  = product.name;
    document.getElementById("mp-price").value = product.price;
    document.getElementById("mp-img").value   = product.img;
    document.getElementById("mp-img2").value  = product.img2 || "";

    // gắn sự kiện nút Lưu → cập nhật
    document.getElementById("modal-product-save").onclick = function() {
        saveEditProduct(id);
    };

    document.getElementById("modal-product-overlay").style.display = "flex";
}

function saveEditProduct(id) {
    let name  = document.getElementById("mp-name").value.trim();
    let price = parseInt(document.getElementById("mp-price").value);
    let img   = document.getElementById("mp-img").value.trim();
    let img2  = document.getElementById("mp-img2").value.trim();

    if (name == "" || isNaN(price) || img == "") {
        alert("Vui lòng điền Tên, Giá và Hình chính!");
        return;
    }

    // Tìm và cập nhật sản phẩm trong mảng
    for (let i = 0; i < productDatabase.length; i++) {
        if (productDatabase[i].id === id) {
            productDatabase[i].name  = name;
            productDatabase[i].price = price;
            productDatabase[i].img   = img;
            productDatabase[i].img2  = img2 || img;
            break;
        }
    }

    renderProducts(productDatabase);
    closeModal();
    alert("Đã cập nhật sản phẩm!");
}

// ── CHẠY KHI TRANG TẢI XONG ──
document.addEventListener("DOMContentLoaded", function() {
    renderProducts(productDatabase);
});