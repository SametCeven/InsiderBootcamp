// eslint-disable

(($) => {
    'use strict';

    const classes = {
        style: 'custom-style',
        wrapper: 'wrapper',
        headerNav: "header-nav",
        pContainer: "product-container",
        pCard: "product-card",
        pInfo: "product-info",
        pInfo2: "product-info-2",
        pButtonContainer: "product-button-container",
        btn1: "btn-primary",
        btne: "btn-empty",
        logo: "logo",
        cartContainer: "cart-container",
        cartPContainer: "cart-product-container",
        cartP: "cart-product",
        cartButtonContainer: "cart-button-container",
        favoritesContainer: "favorites-container",
        favoritesPContainer: "favorites-product-container",
        modal: "modal",
        slider: "slider",
    };

    const selectors = {
        appendLocation: '#container', // Append location for the HTML - Don't change this.
        style: `.${classes.style}`,
        wrapper: `.${classes.wrapper}`,
        header: `header`,
        headerNav: `.${classes.headerNav}`,
        headerNavCartLogo: `header svg[data-action=cart]`,
        pContainer: `.${classes.pContainer}`,
        pCard: `.${classes.pCard}`,
        pInfo: `.${classes.pInfo}`,
        pInfo2: `.${classes.pInfo2}`,
        pCardH2: `.${classes.pCard} h2`,
        pCardImg: `.${classes.pCard} img`,
        pButtonContainer: `.${classes.pButtonContainer}`,
        pPrice: `.${classes.pInfo2} p`,
        btn1: `.${classes.btn1}`,
        logo: `.${classes.logo}`,
        cartLogo: `[data-action=cart]`,
        cart: `${classes.cart}`,
        main: `main`,
        cartContainer: `.${classes.cartContainer}`,
        cartPContainer: `.${classes.cartPContainer}`,
        cartP: `.${classes.cartP}`,
        cartPImg: `.${classes.cartP} img`,
        cartPH4: `.${classes.cartP} h4`,
        cartPp: `.${classes.cartP} p`,
        cartSpan: `.${classes.cartP} span`,
        cartButtonContainer: `.${classes.cartButtonContainer}`,
        cartButtons: `.${classes.cartButtonContainer} button`,
        cartEmptyButton: `.${classes.btne}`,
        favoritesContainer: `.${classes.favoritesContainer}`,
        favoritesPContainer: `.${classes.favoritesPContainer}`,
        favoritesLogo: `[data-action=fav]`,
        headerFavCartLogo: `header svg[data-action=fav]`,
        favButtons: `.${classes.favoritesPContainer} button`,
        modal: `.${classes.modal}`,
        modalImg: `.${classes.modal} img`,
        modalInfo: `.${classes.modal} .${classes.pInfo}`,
        modalInfo2: `.${classes.modal} .${classes.pInfo2}`,
        modalH2: `.${classes.modal} h2`,
        modalP: `.${classes.modal} p`,
        slider: `.${classes.slider}`,
        sliderImg: `.${classes.slider} img`,
    };

    const self = {
        loading: false,
        error: null,
        productData: [],
        cartStorage: [],
        favoritesStorage: [],
        slickLoaded: false,
        slickReady: false,
        productDataLoaded: false,
    };

    const logos = {
        cartLogo: `
                <svg class="logo" data-action="cart" xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78
                        a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
            `,
        favLogo: `
                <svg class="logo" data-action="fav" xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round">
                <path d="M13.5 19.5 12 21l-7-7
                        c-1.5-1.45-3-3.2-3-5.5A5.5 5.5 0 0 1 7.5 3
                        c1.76 0 3 .5 4.5 2 1.5-1.5 2.74-2 4.5-2
                        a5.5 5.5 0 0 1 5.402 6.5"/>
                <path d="M15 15h6"/>
                <path d="M18 12v6"/>
                </svg>
            `,
        detailLogo: `
                <svg class="logo" data-action="detail" xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 12h11"/>
                <path d="M10 18h11"/>
                <path d="M10 6h11"/>
                <path d="M3 10l3-3-3-3"/>
                <path d="M3 20l3-3-3-3"/>
                </svg>
            `,
    };

    self.init = () => {
        self.reset();
        self.loadFancybox();
        self.loadSlick();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
        self.getData();
        self.getCartStorage();
        self.getFavoritesStorage();
    };

    self.reset = () => {
        $(selectors.style).remove();
        $(selectors.wrapper).remove();
        $(document).off('.eventListener');
    };

    self.buildCSS = () => {

        // Defining reusable css properties
        const root = {
            "primary-color": "#112D4E",
            "secondary-color": "#3F72AF",
            "third-color": "#DBE2EF",
            "fourth-color": "#F9F7F7",
            "error-color": "#850505",
            "rounded-sm": "5px",
            "rounded-md": "10px",
            "primary-font": "Arial",
        }

        const customStyle = `
      <style class="${classes.style}">
        ${selectors.wrapper} {
            font-family: ${root["primary-font"]};
            background-color: ${root["fourth-color"]};
            color: ${root["primary-color"]};
            padding: 1rem 3rem;
        }

        ${selectors.header}{
            margin-bottom: 3rem;
            color: ${root["secondary-color"]};
            font-size: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        ${selectors.headerNav}{
            display:flex;
            justify-content: center;
            align-items: center;
        }

        ${selectors.main}{
            margin-top: 5rem;
            
        }

        ${selectors.pContainer} {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 3rem;
        }

        ${selectors.pCard} {
            display: flex;
            justify-content: space-between;
            gap: 2rem;
            border: 1px solid ${root["primary-color"]};
            border-radius: ${root["rounded-sm"]};
            padding: 1rem;
            width: 25rem;
            height: 20rem;
            box-shadow: 0 0 5px ${root["primary-color"]};
            cursor: pointer;    
            transition: all 0.3s ease;   
            overflow:hidden; 
        }

        ${selectors.pCard}:hover{
            border: 1px solid ${root["fourth-color"]};
            box-shadow: 0 0 5px ${root["third-color"]};
        }

        ${selectors.pCardH2}{
            font-size: 14px;
            text-align: right;
        }

        ${selectors.pCardImg}{
            max-width: 10rem;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
        }

        ${selectors.pInfo}{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
        }

        ${selectors.pInfo2}{
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        ${selectors.pPrice}{
            text-align: right;
            color: ${root["secondary-color"]};    
        }

        ${selectors.pButtonContainer}{
            display: flex;
            gap: 1rem;
        }

        ${selectors.logo}{
            color: ${root["secondary-color"]};
            stroke: ${root["secondary-color"]};
            fill: ${root["fourth-color"]};
            transition: all 0.3s ease;
            cursor: pointer;
        }

        ${selectors.logo}:hover{
            stroke: ${root["secondary-color"]};
            color: ${root["secondary-color"]};
            fill: ${root["secondary-color"]};
            transform: scale(1.2);
        }

        ${selectors.btn1}{
            border: 1px solid ${root["primary-color"]};
            border-radius: ${root["rounded-sm"]};
            background-color: ${root["third-color"]};
            color: ${root["primary-color"]};
            padding: 0.3rem 0.3rem;    
            cursor: pointer;
            transition: all 0.3s ease;
        }

        ${selectors.btn1}:hover{
            background-color: ${root["primary-color"]};
            color: ${root["fourth-color"]};
        }

        ${selectors.cartContainer}{
            margin-right: 3rem;
            position: relative;
        }

        ${selectors.cartPContainer}{
            display:none;
            position:absolute;
            flex-direction: column;
            gap: 2rem;
            font-size: smaller;
            right: 10px;
            color: ${root["primary-color"]};
            background-color: ${root["fourth-color"]};
            border-radius: ${root["rounded-sm"]};
            border: 1px solid ${root["primary-color"]};
            box-shadow: 0 0 10px ${root["primary-color"]};
            padding: 1rem;
        }

        ${selectors.cartP}{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 1rem;
            font-size: 10px;
        }

        ${selectors.cartPImg}{
            width: 5rem;
        }

        ${selectors.cartPH4}{
            width: 8rem;
        }

        ${selectors.cartPp}{
            width: 3rem;
        }

        ${selectors.cartButtonContainer}{
            display: flex;
            gap: 0.5rem;
            align-items: center;
        }

        ${selectors.cartEmptyButton}{
            display: none;
            color: ${root["error-color"]};
            width: 100%;
            font-weight: bold;
        }

        ${selectors.favoritesContainer}{
            margin-right: 3rem;
            position: relative;
        }

        ${selectors.favoritesPContainer}{
            display:none;
            position:absolute;
            flex-direction: column;
            gap: 2rem;
            font-size: smaller;
            right: 10px;
            color: ${root["primary-color"]};
            background-color: ${root["fourth-color"]};
            border-radius: ${root["rounded-sm"]};
            border: 1px solid ${root["primary-color"]};
            box-shadow: 0 0 10px ${root["primary-color"]};
            padding: 1rem;
        }

        ${selectors.modal}{
            display:none;
            justify-content: center;
            align-items: center;
            gap:3rem;
        }

        ${selectors.modalImg}{
            width: 20rem;
            height: auto;
        }

        ${selectors.slider}{
            border: 1px solid ${root["primary-color"]};
            box-shadow: 0 0 10px ${root["primary-color"]};
        }

        ${selectors.slider} div{
            display: flex;
            align-items: center;
            padding: 0.5rem;
        }

        ${selectors.sliderImg}{
            max-width: 5rem;
            max-height: 5rem;
            margin: 0 auto;
        }


      </style>
    `;

        $('head').append(customStyle);
    };

    self.buildHTML = () => {
        const html = `
        <div class=${classes.wrapper}>
            <header>
                <h1> Products </h1>
                <nav class=${classes.headerNav}>
                    <div class=${classes.cartContainer}> 
                        ${logos.cartLogo}
                        <div class=${classes.cartPContainer}> </div>
                    </div>
                    <div class=${classes.favoritesContainer}>
                        ${logos.favLogo}
                        <div class=${classes.favoritesPContainer}></div>
                    </div>
                </nav>
            </header>
            <section class=${classes.slider}></section>
            <main>
                <div class=${classes.pContainer}></div>
            </main>
        </div>
    `;

        $(selectors.appendLocation).append(html);
    };

    self.setEvents = () => {

        // CLICK EVENT FOR ADDING TO CART
        $(document).on('click.eventListener', selectors.cartLogo, function (e) {
            const $target = $(e.currentTarget);
            const isHeaderCart = $target.closest(selectors.headerNav).length > 0;
            if (isHeaderCart) return;

            const $pCard = $target.closest(selectors.pCard);
            const id = $pCard.data("id");
            const imageSrc = $pCard.find("img").attr("src");
            const title = $pCard.find("h2").text();
            const price = $pCard.find(selectors.pPrice).text();
            const productData = { id, imageSrc, title, price, count: 1 };
            const item = self.cartStorage.find((c) => c.id === id);

            if (item) {
                item.count++;
                const $itemCountSpan = $(`${selectors.cartP}[data-id=${id}] span`)
                $itemCountSpan.text(`${item.count}`);
            } else {
                self.addToCart(productData);
            }
            self.setCartStorage();
        });

        // HEADER CART LOGO MOUSEENTER DROPDOWN
        $(document).on('mouseenter.eventListener', selectors.headerNavCartLogo, function (e) {
            $(selectors.cartPContainer).stop(true, true).fadeIn(100);
            $(selectors.cartEmptyButton).stop(true, true).fadeIn(100);
        })

        // HEADER CART LOGO MOUSELEAVE DROPDOWN
        $(document).on("mouseleave.eventListener", `${selectors.headerNavCartLogo}, ${selectors.cartPContainer}`, function (e) {
            setTimeout(() => {
                if (!$(selectors.cartPContainer).is(":hover")
                    && !$(selectors.headerNavCartLogo).is(":hover")) {
                    $(selectors.cartPContainer).fadeOut(100);
                    $(selectors.cartEmptyButton).fadeOut(100);
                }
            }, 200)
        })

        // INCREASE & DECREASE CART COUNT BUTTONS
        $(document).on("click.eventListener", selectors.cartButtons, function (e) {
            const $target = $(e.currentTarget);
            const $cartP = $target.closest(selectors.cartP);
            const id = $cartP.data("id");
            const itemToUpdate = self.cartStorage.find((p) => p.id === id)
            const action = $target.data("action");

            if (action === "+") {
                itemToUpdate.count++;
            } else if (action === "-") {
                if (itemToUpdate.count === 1) {
                    $cartP.remove();
                    self.removeFromCartStorage(id);
                }
                itemToUpdate.count--;
            }
            self.updateCartItemCount(itemToUpdate);
            self.setCartStorage();
        })

        // EMPTY CART EVENT
        $(document).on("click.eventListener", selectors.cartEmptyButton, function (e) {
            self.cartStorage = [];
            $(selectors.cartPContainer).empty();
            self.setCartStorage();
            self.renderEmptyCartButton();
        })

        // CLICK EVENT FOR ADDING TO FAVORITES
        $(document).on('click.eventListener', selectors.favoritesLogo, function (e) {
            const $target = $(e.currentTarget);
            const isHeaderFavorite = $target.closest(selectors.headerNav).length > 0;
            if (isHeaderFavorite) return;

            const $pCard = $target.closest(selectors.pCard);
            const id = $pCard.data("id");
            const imageSrc = $pCard.find("img").attr("src");
            const title = $pCard.find("h2").text();
            const price = $pCard.find(selectors.pPrice).text();
            const productData = { id, imageSrc, title, price, count: 1 };
            const item = self.favoritesStorage.find((c) => c.id === id);

            if (!item) {
                self.addToFavorites(productData);
            }
            self.setFavoritesStorage();
        });

        // HEADER FAV LOGO MOUSEENTER DROPDOWN
        $(document).on('mouseenter.eventListener', selectors.headerFavCartLogo, function (e) {
            $(selectors.favoritesPContainer).stop(true, true).fadeIn(100);
        })

        // HEADER FAV LOGO MOUSELEAVE DROPDOWN
        $(document).on("mouseleave.eventListener", `${selectors.headerFavCartLogo}, ${selectors.favoritesPContainer}`, function (e) {
            setTimeout(() => {
                if (!$(selectors.favoritesPContainer).is(":hover")
                    && !$(selectors.headerFavCartLogo).is(":hover")) {
                    $(selectors.favoritesPContainer).fadeOut(100);
                }
            }, 200)
        })

        // REMOVE FAV ITEM
        $(document).on("click.eventListener", selectors.favButtons, function (e) {
            const $target = $(e.currentTarget);
            const $cartP = $target.closest(selectors.cartP);
            const id = $cartP.data("id");

            $cartP.remove();
            self.removeFromFavoritesStorage(id);
            self.setFavoritesStorage();
        })
    };

    self.setCartStorage = () => {
        localStorage.setItem("cartStorage", JSON.stringify(self.cartStorage));
    };

    self.getCartStorage = () => {
        const storedCartData = JSON.parse(localStorage.getItem("cartStorage"));
        if (storedCartData.length > 0) {
            self.cartStorage = storedCartData;
            $(selectors.cartPContainer).empty();
            storedCartData.forEach(self.renderCartItem);
            self.renderEmptyCartButton();
        }
    }

    self.removeFromCartStorage = (id) => {
        self.cartStorage = self.cartStorage.filter((p) => p.id !== id);
        self.setCartStorage();
    }

    self.setFavoritesStorage = () => {
        localStorage.setItem("favoritesStorage", JSON.stringify(self.favoritesStorage));
    };

    self.getFavoritesStorage = () => {
        const storedFavoritesData = JSON.parse(localStorage.getItem("favoritesStorage"));
        if (storedFavoritesData.length > 0) {
            self.favoritesStorage = storedFavoritesData;
            $(selectors.favoritesPContainer).empty();
            storedFavoritesData.forEach(self.renderFavoriteItems);
        }
    }

    self.removeFromFavoritesStorage = (id) => {
        self.favoritesStorage = self.favoritesStorage.filter((p) => p.id !== id);
        self.setFavoritesStorage();
    }

    // FETCHING DATA
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
            self.loading = false;
            self.renderProducts();
        }).fail((err) => {
            self.error = err;
            //renderError();
        }).always(() => {
            self.loading = false;
        })
    }

    // ADDING ITEMS TO DOM
    self.renderProducts = () => {
        if (!self.loading) {
            self.productData.forEach((product) => {
                const productId = product.id;
                const detailId = `detail-${productId}`;

                const html =
                    `
                <div class = ${classes.pCard} data-id=${product.id}>
                    <img src = "${product.image}"/>
                    <div class = ${classes.pInfo}>
                        <h2> ${product.title} </h2>
                        <div class = ${classes.pInfo2}>
                            <p> ${product.price.toFixed(2)} $ </p>
                            <div class = ${classes.pButtonContainer}>
                                ${logos.cartLogo}
                                ${logos.favLogo}
                                <a href="#${detailId}" data-fancybox data-action="detail"> ${logos.detailLogo} </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="${detailId}" class="${classes.modal}">
                    <img src = "${product.image}"/>
                    <div class = ${classes.pInfo}>
                        <h2> ${product.title} </h2>
                        <div class = ${classes.pInfo2}>
                            <p> ${product.price.toFixed(2)} $ </p>
                        </div>
                    </div>
                </div>
            `

                $(selectors.pContainer).append(html)
            });

            const sliderHtml = self.productData.map((p) =>
                `
                <div>
                    <img src="${p.image}" alt="${p.title}"/>
                </div>
                `
            ).join("");

            $(selectors.slider).html(sliderHtml);
            self.slickReady = true;
            self.productDataLoaded = true;
            if (self.slickLoaded) self.initSlider();
        }
    }

    // ADDING CART ITEMS TO DOM
    self.renderCartItem = (productData) => {
        const html =
            `
                <div class=${classes.cartP} data-id="${productData.id}">
                    <img src="${productData.imageSrc}"/>
                    <h4> ${productData.title} </h4>
                    <p> ${productData.price} </p>
                    <div class=${classes.cartButtonContainer}>
                        <button class=${classes.btn1} data-action="-"> - </button>
                        <span> ${productData.count} </span>
                        <button class=${classes.btn1} data-action="+"> + </button>
                    </div>
                </div>
                `
        $(selectors.cartPContainer).append(html);
    }

    // ADDING ITEMS TO CART
    self.addToCart = (productData) => {
        self.cartStorage.push(productData);
        self.renderCartItem(productData);
        self.setCartStorage();
    }

    // UPDATING CART ITEM'S COUNT
    self.updateCartItemCount = (productData) => {
        console.log(productData)
        const $cartItem = $(`${selectors.cartP}[data-id="${productData.id}"]`)
        $cartItem.find("span").text(productData.count);
    }

    // ADDING EMPTY CART BUTTON TO DOM
    self.renderEmptyCartButton = () => {
        const $button = $(`<button class="${classes.btn1} ${classes.btne}"> Empty Cart </button>`)
        $(selectors.cartPContainer).prepend($button);
    }

    // ADDING FAVORITE ITEMS TO DOM
    self.renderFavoriteItems = (productData) => {
        const html =
            `
                <div class=${classes.cartP} data-id="${productData.id}">
                    <img src="${productData.imageSrc}"/>
                    <h4> ${productData.title} </h4>
                    <p> ${productData.price} </p>
                    <button class="${classes.btn1}"> Remove </button>
                </div>
                `
        $(selectors.favoritesPContainer).append(html);
    }

    // ADDING ITEMS TO FAVORITES
    self.addToFavorites = (productData) => {
        self.favoritesStorage.push(productData);
        self.renderFavoriteItems(productData);
        self.setFavoritesStorage();
    }

    // UTIL FUNCTION FOR LOADING FANCYBOX
    self.loadFancybox = () => {
        const fancyCss = document.createElement("link");
        fancyCss.rel = "stylesheet";
        fancyCss.href = "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css";

        const fancyJs = document.createElement("script");
        fancyJs.src = "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js";

        document.head.appendChild(fancyCss);
        document.head.appendChild(fancyJs);
    };

    // UTIL FUNCTION FOR LOADING SLICK
    self.loadSlick = () => {
        const slickCss = document.createElement("link");
        slickCss.rel = "stylesheet";
        slickCss.href = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
        document.head.appendChild(slickCss);

        const slickThemeCss = document.createElement("link");
        slickThemeCss.rel = "stylesheet";
        slickThemeCss.href = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
        document.head.appendChild(slickThemeCss);

        const slickJs = document.createElement("script");
        slickJs.src = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";

        slickJs.onload = () => {
            self.slickLoaded = true;
            if (self.productDataLoaded) self.initSlider();
        }
        document.head.appendChild(slickJs);
    };


    // UTIL FUNCTION FOR INITIALIZING SLICK WITH SETTINGS
    self.initSlider = () => {
        const $slider = $(selectors.slider);
        const images = $slider.find("img");
        let loaddedImages = 0;
        if (images.length === 0) initSlick();

        images.each(function () {
            if (this.complete) {
                imageLoaded();
            } else {
                $(this).on("load", imageLoaded).on("error", imageLoaded);
            }
        });

        function imageLoaded() {
            loaddedImages++;
            if (loaddedImages === images.length) {
                initSlick();
            }
        };

        function initSlick() {
            $slider.slick({
                slidesToShow: 5,
                slidesToScroll: 4,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: true,
                dots: true,
            });
        }
    }

    $(document).ready(self.init);

})(jQuery);
