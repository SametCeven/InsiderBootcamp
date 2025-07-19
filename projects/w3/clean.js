// eslint-disable

(($) => {
  'use strict';

  const classes = {
    style: 'custom-style',
    wrapper: 'custom-wrapper',
    container: 'custom-container',
    addToCartButton: 'add-to-cart-btn'
  };

  const selectors = {
    style: `.${classes.style}`,
    wrapper: `.${classes.wrapper}`,
    container: `.${classes.container}`,
    addToCartButton: `.${classes.addToCartButton}`,
    appendLocation: '#container' // Append location for the HTML - Don't change this.
  };

  const self = {};

  self.init = () => {
    self.reset();
    self.buildCSS();
    self.buildHTML();
    self.setEvents();
  };

  self.reset = () => {
    $(selectors.style).remove();
    $(selectors.wrapper).remove();
    $(document).off('.eventListener');
  };

  self.buildCSS = () => {
    const customStyle = `
      <style class="${classes.style}">
        ${selectors.wrapper} {
          display: flex;
          justify-content: center;
          padding: 10px;
          background-color: #f1f12f;
        }

        ${selectors.container} {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          color: #000;
        }

        ${selectors.addToCartButton} {
          padding: 8px 16px;
          background-color: #3498db;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        ${selectors.addToCartButton}:hover {
          background-color: #2980b9;
        }
      </style>
    `;

    $('head').append(customStyle);
  };

  self.buildHTML = () => {
    const html = `
      <div class="${classes.wrapper}">
        <div class="${classes.container}">
          <p>Ürün Adı</p>
          <button class="${classes.addToCartButton}">Sepete Ekle</button>
        </div>
      </div>
    `;

    $(selectors.appendLocation).append(html);
  };

  self.setEvents = () => {
    $(document).on('click.eventListener', selectors.addToCartButton, function () {
      alert('Ürün sepete eklendi!');
      self.setCartStorage();
    });

    // You can add more event listeners here (e.g., for favorites)
  };

  self.setCartStorage = () => {
    console.log('Cart updated in localStorage');
    // Add localStorage logic here if needed
  };

  self.setFavoritesStorage = () => {
    console.log('Favorites updated in localStorage');
    // Add localStorage logic here if needed
  };

  $(document).ready(self.init);

})(jQuery);
