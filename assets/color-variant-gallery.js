document.addEventListener("DOMContentLoaded", function () {
  const colorOptions = document.querySelectorAll(
    '[name="Color"], [name="color"], [name="Colour"]'
  );

  const mediaItems = document.querySelectorAll(
    ".product__media-item, .product-media-item, .product__media"
  );

  if (!colorOptions.length || !mediaItems.length) return;

  // Show images that match selected color
  function showColorImages(colorName) {
    mediaItems.forEach((item) => {
      const img = item.querySelector("img");

      if (!img) return;

      const altText = img.getAttribute("alt")?.toLowerCase();

      if (altText && altText.includes(colorName.toLowerCase())) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Show first color's images on page load
  const firstSelected =
    document.querySelector('[name="Color"]:checked') ||
    document.querySelector('[name="color"]:checked') ||
    document.querySelector('[name="Colour"]:checked') ||
    colorOptions[0];

  if (firstSelected) {
    showColorImages(firstSelected.value);
  }

  // Change gallery on color change
  colorOptions.forEach((option) => {
    option.addEventListener("change", function (e) {
      showColorImages(e.target.value);
    });
  });
});
