(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    jqueryScript.onload = () => main(jQuery);
    document.head.append(jqueryScript);
})();


main = ($) => {
    "use strict";

    const classes = {
        container: "container",
    }

    const selectors = Object.keys(classes).reduce(
        (acc, key) => {
            acc[key] = `.${classes[key]}`;
            return acc;
        }, {
        appendLocation: `body`,
        body: `body`,
    }
    );

    const config = {
        lcw: {
            url: "https://www.lcw.com",
            partnerName: "lcw",
            pageType: {
                mainPage: "Home",
                cartPage: "Shop",
                productPage: "Model",
                categoryPage: ".product-list-container",
            },
        },
        turkcell: {
            url: "https://www.turkcell.com.tr",
            partnerName: "turkcell",
        },
        barcin: {
            url: "https://www.barcin.com",
            partnerName: "barcin",
        }
    }

    const self = {
        currentPartnerName: "",
        currentURL: "",
        currentPageType: "",
    }

    self.init = () => {
        self.reset();
        self.buildHTML();
        self.getInitialInfo();
        self.test();
    }

    self.reset = () => {
        $(selectors.style).remove();
        $(selectors.container).empty();
    }

    self.buildHTML = () => {
        const html = `<div class=${classes.container}></div>`
        $(selectors.appendLocation).append(html);
    }

    // ---- LOGIC ---- //

    self.getInitialInfo = () => {
        self.currentURL = document.URL;
        self.currentPageType = window.CurrentPageType;

        const partner = Object.values(config).find((p) => self.currentURL.includes(p.url));
        self.currentPartnerName = partner ? partner.partnerName : "";
    }

    self.checkPartner = (partner) => {
        if (!self.currentPartnerName) {
            console.error("Not a partner !!!");
            return false;
        }
        if (self.currentPartnerName !== config[partner].partnerName) {
            console.error("Wrong partner !!!");
            return false;
        }
        return true;
    }

    // ---- LCW --- //

    self.lcwIsOnMainPage = () => {
        if (!self.checkPartner("lcw")) return false;
        if (self.currentPageType === config.lcw.pageType.mainPage) return true;
        else return false;
    }

    self.lcwIsOnCartPage = () => {
        if (!self.checkPartner("lcw")) return false;
        if (self.currentPageType === config.lcw.pageType.cartPage) return true;
        else return false;
    }

    self.lcwIsOnProductPage = () => {
        if (!self.checkPartner("lcw")) return false;
        if (self.currentPageType === config.lcw.pageType.productPage) return true;
        else return false;
    }

    self.lcwIsOnCategoryPage = () => {
        if (!self.checkPartner("lcw")) return false;

        const $categoryPage = $(document).find(config.lcw.pageType.categoryPage);
        if ($categoryPage.length < 1) return false;
        self.currentPageType = config.lcw.pageType.categoryPage;
        return true;
    }


    // ---- TURKCELL --- //

    self.turkcellIsOnMainPage = () => {
        if (!self.checkPartner("turkcell")) return false;
        return "main page"
    }

    self.turkcellIsOnCartPage = () => {
        if (!self.checkPartner("turkcell")) return false;
        return "cart page"
    }

    self.turkcellIsOnProductPage = () => {
        if (!self.checkPartner("turkcell")) return false;
        return "product page"
    }

    self.turkcellIsOnCategoryPage = () => {
        if (!self.checkPartner("turkcell")) return false;
        return "category page"
    }

    // ---- BARCIN --- //


    // --- TEST --- //

    self.test = () => {
        console.log("********")
        console.log($(document))
        console.log(document)
        console.log(window)
        console.log(document.URL)
        console.log(self.URL);
        console.log(self.pageType);
        console.log("********")

        console.log("lcw /", "main page /", self.lcwIsOnMainPage());
        console.log("lcw /", "product page /", self.lcwIsOnProductPage());
        console.log("lcw /", "category page /", self.lcwIsOnCategoryPage());
        console.log("lcw /", "cart page /", self.lcwIsOnCartPage());

        console.log("turkcell /", "main page /", self.turkcellIsOnMainPage());
        console.log("turkcell /", "product page /", self.turkcellIsOnProductPage());
        console.log("turkcell /", "category page /", self.turkcellIsOnCategoryPage());
        console.log("turkcell /", "cart page /", self.turkcellIsOnCartPage());

    }


    // ---- FN --- //

    window.fn = {
        "lcw": { isOnCartPage: self.lcwIsOnCartPage, isOnProductPage: self.lcwIsOnProductPage, isOnMainPage: self.lcwIsOnMainPage, isOnCategoryPage: self.lcwIsOnCategoryPage },
        "turkcell": { isOnCartPage: self.turkcellIsOnCartPage, isOnProductPage: self.turkcellIsOnProductPage, isOnMainPage: self.turkcellIsOnMainPage, isOnCategoryPage: self.turkcellIsOnCategoryPage },
    }

    $(document).ready(self.init);
}