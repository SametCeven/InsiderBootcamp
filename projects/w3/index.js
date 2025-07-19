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
        logo: "logo",
    };

    const selectors = {
        appendLocation: '#container', // Append location for the HTML - Don't change this.
        style: `.${classes.style}`,
        wrapper: `.${classes.wrapper}`,
        header: `header`,
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
    };

    const self = {
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
            cursor: pointer;    
            transition: all 0.3s ease;    
        }

        ${selectors.pCard}:hover{
            border: 1px solid ${root["fourth-color"]};
            box-shadow: 0 0 5px ${root["third-color"]};
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
                                ${self.cartLogo}
                                ${self.favLogo}
                                ${self.detailLogo}
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
