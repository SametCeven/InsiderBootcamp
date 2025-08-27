(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    jqueryScript.onload = () => main(jQuery);
    document.head.append(jqueryScript);
})();


main = ($) => {
    "use strict";

    const classes = {
        container: "mycontainerins",
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
            url: ["www.lcw.com"],
            partnerName: "lcw",
            pageType: {
                mainPage: "Home",
                cartPage: "Shop",
                productPage: "Model",
                categoryPage: ".product-list-container",
            },
        },
        turkcell: {
            url: ["www.turkcell.com.tr", "www.superonline.net/"],
            partnerName: "turkcell",
            pageType: {
                mainPage: 5,
                cartPage: "/pasaj/siparisler",
                productPage: [/product-detail-page/,/DetailArea/,/campaign-details/,/packages-detail/,/Detail_detail__content/],
                categoryPage: [/package-selection/,/--filterArea__/,/ListFilter_filterItem/,/campaign-list-filter/],
            }
        },
        barcin: {
            url: ["www.barcin.com"],
            partnerName: "barcin",
            pageType: {
                mainPage: [/web-home/],
                cartPage: "basket",
                productPage: [/product-add-to-cart/],
                categoryPage: [/product-info/],
            }
        }
    }

    const self = {
        currentPartnerName: "",
        currentURL: "",
        currentPageType: "",
        currentPathName: "",
    }

    self.init = () => {
        self.reset();
        self.buildHTML();
        self.getInitialInfo();
        self.test();
    }

    self.reset = () => {
        $(selectors.container).remove();
    }

    self.buildHTML = () => {
        const html = `<div class=${classes.container}></div>`
        $(selectors.appendLocation).append(html);
    }

    // ---- LOGIC ---- //

    self.getInitialInfo = () => {
        self.currentURL = window.location.hostname;
        self.currentPageType = window.CurrentPageType;
        self.currentPathName = window.location.pathname;

        const partner = Object.values(config).find((p) => {
            return p.url.some((u)=>{
                return self.currentURL.includes(u);
            })
        });
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
        if (!self.checkPartner(config.lcw.partnerName)) return false;
        if (self.currentPageType === config.lcw.pageType.mainPage) return true;
        else return false;
    }

    self.lcwIsOnCartPage = () => {
        if (!self.checkPartner(config.lcw.partnerName)) return false;
        if (self.currentPageType === config.lcw.pageType.cartPage) return true;
        else return false;
    }

    self.lcwIsOnProductPage = () => {
        if (!self.checkPartner(config.lcw.partnerName)) return false;
        if (self.currentPageType === config.lcw.pageType.productPage) return true;
        else return false;
    }

    self.lcwIsOnCategoryPage = () => {
        if (!self.checkPartner(config.lcw.partnerName)) return false;

        const $categoryPage = $(document).find(config.lcw.pageType.categoryPage);
        if ($categoryPage.length < 1) return false;
        self.currentPageType = config.lcw.pageType.categoryPage;
        return true;
    }


    // ---- TURKCELL --- //

    self.turkcellIsOnMainPage = () => {
        if (!self.checkPartner(config.turkcell.partnerName)) return false;
        const $target = $(document).find("section")
        if($target.length === config.turkcell.pageType.mainPage) return true;
        return false;
    }

    self.turkcellIsOnCartPage = () => {
        if (!self.checkPartner(config.turkcell.partnerName)) return false;
        if (self.currentPathName.includes(config.turkcell.pageType.cartPage)) return true;
        return false;
    }

    self.turkcellIsOnProductPage = () => {
        if (!self.checkPartner(config.turkcell.partnerName)) return false;
        const $matches = $(document).find(`*[class]`).filter(function(){
            return config.turkcell.pageType.productPage.some((regex)=>{
                return regex.test(this.className);
            })
        })
        if($matches.length >= 1) return true;
        return false; 
    }

    self.turkcellIsOnCategoryPage = () => {
        if (!self.checkPartner(config.turkcell.partnerName)) return false;
        const $matches = $(document).find(`*[class]`).filter(function(){
            return config.turkcell.pageType.categoryPage.some((regex)=>{
                return regex.test(this.className);
            })
        })
        if($matches.length >= 1) return true;
        return false; 
    }

    // ---- BARCIN --- //

    self.barcinIsOnMainPage = () => {
        if (!self.checkPartner(config.barcin.partnerName)) return false;
        const $matches = $(document).find(`*[id]`).filter(function(){
            return config.barcin.pageType.mainPage.some((regex)=>{
                return regex.test(this.id);
            })
        })
        if($matches.length >= 1) return true;
        return false;
    }

    self.barcinIsOnCartPage = () => {
        if (!self.checkPartner(config.barcin.partnerName)) return false;
        const pathname = window.location.pathname;
        if(pathname.includes(config.barcin.pageType.cartPage)) return true;
        return false;
    }

    self.barcinIsOnProductPage = () => {
        if (!self.checkPartner(config.barcin.partnerName)) return false;
        const $matches = $(document).find(`*[data-testid]`).filter(function(){
            return config.barcin.pageType.productPage.some((regex)=>{
                return regex.test(this.getAttribute("data-testid"));
            })
        })
        if($matches.length >= 1) return true;
        return false;
    }

    self.barcinIsOnCategoryPage = () => {
        if (!self.checkPartner(config.barcin.partnerName)) return false;
        const $matches = $(document).find(`*[class]`).filter(function(){
            return config.barcin.pageType.categoryPage.some((regex)=>{
                return regex.test(this.className);
            })
        })
        if($matches.length >= 1) return true;
        return false;
    }

    // --- TEST --- //

    self.test = () => {
        /* console.log("********")
        console.log($(document))
        console.log(document)
        console.log(window)
        console.log(window.location.pathname)
        console.log("********") */

        console.log("lcw /", "main page /", self.lcwIsOnMainPage());
        console.log("lcw /", "product page /", self.lcwIsOnProductPage());
        console.log("lcw /", "category page /", self.lcwIsOnCategoryPage());
        console.log("lcw /", "cart page /", self.lcwIsOnCartPage());

        console.log("turkcell /", "main page /", self.turkcellIsOnMainPage());
        console.log("turkcell /", "product page /", self.turkcellIsOnProductPage());
        console.log("turkcell /", "category page /", self.turkcellIsOnCategoryPage());
        console.log("turkcell /", "cart page /", self.turkcellIsOnCartPage());

        console.log("barcin /", "main page /", self.barcinIsOnMainPage());
        console.log("barcin /", "product page /", self.barcinIsOnProductPage());
        console.log("barcin /", "category page /", self.barcinIsOnCategoryPage());
        console.log("barcin /", "cart page /", self.barcinIsOnCartPage());

    }


    // ---- FN --- //

    window.fn = {
        "lcw": { isOnCartPage: self.lcwIsOnCartPage, isOnProductPage: self.lcwIsOnProductPage, isOnMainPage: self.lcwIsOnMainPage, isOnCategoryPage: self.lcwIsOnCategoryPage },
        "turkcell": { isOnCartPage: self.turkcellIsOnCartPage, isOnProductPage: self.turkcellIsOnProductPage, isOnMainPage: self.turkcellIsOnMainPage, isOnCategoryPage: self.turkcellIsOnCategoryPage },
        "barcin": { isOnCartPage: self.barcinIsOnCartPage, isOnProductPage: self.barcinIsOnProductPage, isOnMainPage: self.barcinIsOnMainPage, isOnCategoryPage: self.barcinIsOnCategoryPage },
    }

    $(document).ready(self.init);
}