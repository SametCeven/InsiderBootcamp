// eslint-disable

(($) => {
    'use strict';

    const classes = {
        style: 'custom-style',
        wrapper: 'wrapper',
        pContainer: "product-container",
        pCard: "product-card",
        pInfo: "product-info",
        pInfo2: "product-info-2",
        pButtonContainer: "product-button-container",
        btn1: "btn-primary",
    };

    const selectors = {
        appendLocation: '#container', // Append location for the HTML - Don't change this.
        style: `.${classes.style}`,
        wrapper: `.${classes.wrapper}`,
        header: `header`,
        pContainer: `.${classes.pContainer}`,
        pCard: `.${classes.pCard}`,
        pInfo: `.${classes.pInfo}`,
        pCardH2: `.${classes.pCard} h2`,
        pCardImg: `.${classes.pCard} img`,
        pButtonContainer: `.${classes.pButtonContainer}`,
        pPrice: `.${classes.pInfo2} p`,
        btn1: `.${classes.btn1}`,
    };

    const self = {
        loading: false,
        error: null,
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
        }

        ${selectors.pContainer} {
            display: flex;
            flex-wrap: wrap;
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
        }

        ${selectors.pCardH2}{
            font-size: 20px;
        }

        ${selectors.pCardImg}{
            width: 10rem;
            height: auto;
        }

        ${selectors.pInfo}{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
        }

        ${selectors.pPrice}{
            text-align: right;
            color: ${root["secondary-color"]};
        }

        ${selectors.pButtonContainer}{
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
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


      </style>
    `;

        $('head').append(customStyle);
    };

    self.buildHTML = () => {
        const html = `
        <div class=${classes.wrapper}>
            <header>
                <h1> Products </h1>
            </header>
            <main>
                <div class=${classes.pContainer}></div>
            </main>
        </div>
    `;

        $(selectors.appendLocation).append(html);
    };

    self.setEvents = () => {

    };

    self.setCartStorage = () => {

    };

    self.setFavoritesStorage = () => {

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
            self.loading = false;
            self.renderProducts();
        }).fail((err) => {
            self.error = err;
            //renderError();
        }).always(() => {
            self.loading = false;
        })
    }

    self.renderProducts = () => {
        if (!self.loading) {
            self.productData.forEach((product) => {
                const html =
                    `
                <div class = ${classes.pCard}>
                    <img src = "${product.image}"/>
                    <div class = ${classes.pInfo}>
                        <h2> ${product.title} </h2>
                        <div class = ${classes.pInfo2}>
                            <p> ${product.price} $ </p>
                            <div class = ${classes.pButtonContainer}>
                                <button class=${classes.btn1}> Add To Cart </button>
                                <button class=${classes.btn1}> Add To Favorites </button>
                                <button class=${classes.btn1}> Show Details </button>
                            </div>
                        </div>
                    </div>
                </div>
            `

                $(selectors.pContainer).append(html)
            })

        }
    }

    $(document).ready(self.init);

})(jQuery);
