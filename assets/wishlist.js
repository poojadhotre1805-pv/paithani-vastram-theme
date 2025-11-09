document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".wishlist-btn");
  if (!btn) return;

  const product = {
    handle: btn.dataset.productHandle,
    title: btn.dataset.productTitle,
    image: btn.dataset.productImage,
    url: btn.dataset.productUrl
  };

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  function updateButton() {
    const exists = wishlist.some(item => item.handle === product.handle);
    if (exists) {
      btn.classList.add("active");
      btn.querySelector(".wishlist-heart").textContent = "❤";
      btn.querySelector(".wishlist-text").textContent = "Saved";
    } else {
      btn.classList.remove("active");
      btn.querySelector(".wishlist-heart").textContent = "♡";
      btn.querySelector(".wishlist-text").textContent = "Add to Wishlist";
    }
  }

  updateButton();

  btn.addEventListener("click", function () {
    const exists = wishlist.some(item => item.handle === product.handle);

    if (!exists) {
      wishlist.push(product);
    } else {
      wishlist = wishlist.filter(item => item.handle !== product.handle);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateButton();

    const counter = document.querySelector(".wishlist-count");
    if (counter) counter.textContent = wishlist.length;
  });
});
