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

    const self = {
        loading : false,
        error : null,
        productData: [],
    };

    self.init = () => {
        self.reset();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
        self.getData();
    };

    self.reset = () => {
        $(selectors.style).remove();
        $(selectors.wrapper).remove();
        $(document).off('.eventListener');
    };

    self.buildCSS = () => {

        // Defining reusable css properties
        const root = {
            "primary-color": "#222831",
            "secondary-color": "#010202",
            "third-color": "#EEEEEE",
            "error-color": "#850505",
            "rounded-sm": "5px",
            "rounded-md": "10px",
            "primary-font": "Arial",
        }

        const customStyle = `
      <style class="${classes.style}">
        ${selectors.wrapper} {
            font-family: ${root["primary-font"]};
            display: flex;
            justify-content: center;
            padding: 10px;
            background-color: ${root["primary-color"]};
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

    self.getData = () => {
        const baseUrl = `https://fakestoreapi.com/products`;
        self.loading = true;
        self.error = null;
        self.productData = [];

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            console.log(res)
            self.productData = res;
            //renderProducts(res);
        }).fail((err) => {
            self.error = err;
            //renderError();
        }).always(() => {
            self.loading = false;
        })
    }

    $(document).ready(self.init);

})(jQuery);
