const products = [
{ id: 1, name: "Dell Laptop", category: "Computers", price: 3499, stock: 10 },
{ id: 2, name: "Wireless Mouse", category: "Accessories", price: 129, stock: 25 },
{ id: 3, name: "Smartphone", category: "Phones", price: 2499, stock: 0 },
{ id: 4, name: "Gaming Desktop", category: "Computers", price: 5999, stock: 4 },
{ id: 5, name: "Ultrabook 14-inch", category: "Computers", price: 4299, stock: 7 },
{ id: 6, name: "All-in-One PC", category: "Computers", price: 3899, stock: 0 },
{ id: 7, name: "Mini PC", category: "Computers", price: 1799, stock: 15 },
{ id: 8, name: "Mechanical Keyboard", category: "Accessories", price: 349, stock: 18 },
{ id: 9, name: "USB-C Hub", category: "Accessories", price: 199, stock: 3 },
{ id: 10, name: "Laptop Backpack", category: "Accessories", price: 179, stock: 30 },
{ id: 11, name: "27-inch Monitor", category: "Accessories", price: 899, stock: 5 },
{ id: 12, name: "Webcam HD", category: "Accessories", price: 249, stock: 0 },
{ id: 13, name: "Flagship Phone Pro", category: "Phones", price: 4199, stock: 9 },
{ id: 14, name: "Budget Phone", category: "Phones", price: 699, stock: 40 },
{ id: 15, name: "Foldable Phone", category: "Phones", price: 6499, stock: 2 },
{ id: 16, name: "Phone Fast Charger", category: "Phones", price: 99, stock: 60 }
];
const state = { search: "", category: "All", sort: "default" };

function renderProducts(list) {
const container = document.getElementById("product-list");
container.innerHTML = "";
if (list.length === 0) {
container.innerHTML = '<p class="no-results">No products match your search.</p>';
return;
}
list.forEach(prod => {
const stockLabel = prod.stock === 0 ? "Out of Stock"
: prod.stock <= 5 ? "Low Stock" : "In Stock";
const stockClass = stockLabel.toLowerCase().replace(/ /g, "-");
container.innerHTML += `
<div class="product">
<p class="category">${prod.category}</p>
<h3>${prod.name}</h3>
<p class="price">AED ${prod.price.toLocaleString()}</p>
<p class="stock ${stockClass}">${stockLabel}</p>
<button ${prod.stock === 0 ? "disabled" : ""}>Add to Cart</button>
</div>`;
});
}

function applyAll() {
let result = products.filter(p =>
p.name.toLowerCase().includes(state.search) &&
(state.category === "All" || p.category === state.category)
); // filter() returns a NEW array
if (state.sort === "low-high") result.sort((a, b) => a.price - b.price);
if (state.sort === "high-low") result.sort((a, b) => b.price - a.price);
renderProducts(result);
}
document.getElementById("search-box").addEventListener("input", e => {
state.search = e.target.value.trim().toLowerCase();
applyAll();
});

document.querySelectorAll(".category-btn").forEach(btn => {
btn.addEventListener("click", () => {
document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
btn.classList.add("active");
state.category = btn.dataset.category;
applyAll();
});
});

document.getElementById("sort-select").addEventListener("change", e => {
state.sort = e.target.value;
applyAll();
});

renderProducts(products);