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

    const self = {
        partners: ["https://www.lcw.com", "https://www.turkcell.com.tr", "barcin"],
        config: {
            lcw: {
                partnerName: "lcw",
                pageType: {
                    mainPage: "Home",
                    cartPage: "Shop",
                    productPage: "Model",
                    categoryPage: ".product-list-container",
                },
            },
            turkcell: {
                partnerName: "turkcell",
            },
            barcin: {
                partnerName: "barcin",
            }
        },
        currentPartner : "",
        URL: "",
        pageType: "",
    }

    self.init = () => {
        self.reset();
        self.buildHTML();
        self.getInitialInfo();
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
        self.URL = document.URL;
        self.pageType = window.CurrentPageType;
        
        if(self.URL.includes(self.config.lcw.partnerName)){
            self.currentPartner = self.config.lcw.partnerName;
        }else if(self.URL.includes(self.config.turkcell.partnerName)){
            self.currentPartner = self.config.turkcell.partnerName;
        }else if(self.URL.includes(self.config.barcin.partnerName)){
            self.currentPartner = self.config.barcin.partnerName;
        }

        console.log($(document))
        console.log(document)
        console.log(window)
        console.log(document.URL)
        console.log(self.URL);
        console.log(self.pageType);
    }


    self.isPartner = () => {
        let isPartner = false;
        self.partners.forEach((p)=>{
            if(self.URL.includes(p)) isPartner = true;
        })
        return isPartner;
    }

    self.checkPartner = (partner) => {
        if(!self.isPartner()){
            console.error("Not a partner !!!");
            return false;
        }
        if(self.currentPartner !== self.config[partner].partnerName){
            console.error("Wrong partner !!!");
            return false;
        }
        return true;
    }

    // ---- LCW --- //

    self.lcwIsOnMainPage = () => {
        if(!self.checkPartner("lcw")) return false;
        if(self.pageType === self.config.lcw.pageType.mainPage) return true;
        else return false;
    }

    self.lcwIsOnCartPage = () => {
        if(!self.checkPartner("lcw")) return false;
        if(self.pageType === self.config.lcw.pageType.cartPage) return true;
        else return false;
    }

    self.lcwIsOnProductPage = () => {
        if(!self.checkPartner("lcw")) return false;
        if(self.pageType === self.config.lcw.pageType.productPage) return true;
        else return false;
    }

    self.lcwIsOnCategoryPage = () => {
        if(!self.checkPartner("lcw")) return false;
        
        const $categoryPage = $(document).find(self.config.lcw.pageType.categoryPage);
        if($categoryPage.length < 1) return false;
        self.pageType = self.config.lcw.pageType.categoryPage;
        return true;
    }


    // ---- TURKCELL --- //

    self.turkcellIsOnMainPage = () => {
        if(!self.checkPartner("turkcell")) return false;
        return "main page"
    }

    self.turkcellIsOnCartPage = () => {
        if(!self.checkPartner("turkcell")) return false;
        return "cart page"
    }

    self.turkcellIsOnProductPage = () => {
        if(!self.checkPartner("turkcell")) return false;
        return "product page"
    }

    self.turkcellIsOnCategoryPage = () => {
        if(!self.checkPartner("turkcell")) return false;
        return "category page"
    }

    // ---- BARCIN --- //




    // ---- FN --- //

    window.fn = {
        "lcw": { isOnCartPage: self.lcwIsOnCartPage, isOnProductPage: self.lcwIsOnProductPage, isOnMainPage: self.lcwIsOnMainPage, isOnCategoryPage: self.lcwIsOnCategoryPage },
        "turkcell": { isOnCartPage: self.turkcellIsOnCartPage, isOnProductPage: self.turkcellIsOnProductPage, isOnMainPage: self.turkcellIsOnMainPage, isOnCategoryPage: self.turkcellIsOnCategoryPage },
    }

    $(document).ready(self.init);
}