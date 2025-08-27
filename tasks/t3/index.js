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
        partners: ["https://www.lcw.com", "turkcell", "barcin"],
        URL: "",
        pageType: "",
        config: {
            lcw: {
                pageType: {
                    mainPage: "Home",
                    cartPage: "Shop",
                    productPage: "Model",
                    categoryPage: ".product-list-container",
                }
            }
        }
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

    self.lcwIsOnMainPage = () => {
        if(!self.isPartner()) return "not a partner";
        if(self.pageType === self.config.lcw.pageType.mainPage) return true;
        else return false;
    }

    self.lcwIsOnCartPage = () => {
        if(!self.isPartner()) return "not a partner";
        if(self.pageType === self.config.lcw.pageType.cartPage) return true;
        else return false;
    }

    self.lcwIsOnProductPage = () => {
        if(!self.isPartner()) return "not a partner";
        if(self.pageType === self.config.lcw.pageType.productPage) return true;
        else return false;
    }

    self.lcwIsOnCategoryPage = () => {
        if(!self.isPartner()) return "not a partner";
        
        const categoryPage = $(document).find(self.config.lcw.pageType.categoryPage)
        if(!categoryPage) return false;
        self.pageType = self.config.lcw.pageType.categoryPage;
        return true;
    }

    window.fn = {
        "lcw": { isOnCartPage: self.lcwIsOnCartPage, isOnProductPage: self.lcwIsOnProductPage, isOnMainPage: self.lcwIsOnMainPage, lcwIsOnCategoryPage: self.lcwIsOnCategoryPage }
    }

    $(document).ready(self.init);
}