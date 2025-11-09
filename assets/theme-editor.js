function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());
document.addEventListener('DOMContentLoaded', function() {
  // Define the function globally so it works from Liquid onclick
  window.showColorImages = function(color) {
    console.log('Selected color:', color);

    // Hide all product images first
    document.querySelectorAll('.product__media-item').forEach(img => {
      img.style.display = 'none';
    });

    // Show only images that match the selected color
    document.querySelectorAll(`.product__media-item[data-media-color="${color}"]`).forEach(img => {
      img.style.display = 'block';
    });

    // Scroll gallery into view (optional)
    const gallery = document.querySelector('.product__media-list');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };
});
// ===== Color Variant Image Filter =====
function showColorImages(selectedColor) {
  // Convert to lowercase for matching
  selectedColor = selectedColor.toLowerCase();

  // Select all gallery images
  const allImages = document.querySelectorAll('#ColorGallery .product__media-item');

  allImages.forEach(img => {
    const color = img.getAttribute('data-media-color');

    if (!color) return;

    // Show only matching color images
    if (color === selectedColor) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });
}

// Optional: show all images when page loads
document.addEventListener('DOMContentLoaded', () => {
  const firstSwatch = document.querySelector('.variant-swatch');
  if (firstSwatch) {
    const firstColor = firstSwatch.getAttribute('data-color');
    if (firstColor) showColorImages(firstColor);
  }
});
