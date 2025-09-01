(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    jqueryScript.onload = () => rules(jQuery);
    document.head.append(jqueryScript);
})();


rules = ($) => {
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

    const self = {
        currentPartnerName: "",
        currentURL: "",
        currentPageType: "",
        currentPathName: "",
        testConfig: {},
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
            return p.url.some((u) => {
                return self.currentURL.includes(u);
            })
        });
        self.currentPartnerName = partner ? partner.partnerName : "";
    }

    self.checkPartner = (partner) => {
        if (!self.currentPartnerName) {
            //console.error("Not a partner !!!");
            return false;
        }
        if (self.currentPartnerName !== config[partner].partnerName) {
            //console.error("Wrong partner !!!");
            return false;
        }
        return true;
    }

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
            isOnMainPage: () => {
                if (!self.checkPartner(config.lcw.partnerName)) return false;
                if (self.currentPageType === config.lcw.pageType.mainPage) return true;
                else return false;
            },
            isOnCartPage: () => {
                if (!self.checkPartner(config.lcw.partnerName)) return false;
                if (self.currentPageType === config.lcw.pageType.cartPage) return true;
                else return false;
            },
            isOnProductPage: () => {
                if (!self.checkPartner(config.lcw.partnerName)) return false;
                if (self.currentPageType === config.lcw.pageType.productPage) return true;
                else return false;
            },
            isOnCategoryPage: () => {
                if (!self.checkPartner(config.lcw.partnerName)) return false;

                const $categoryPage = $(document).find(config.lcw.pageType.categoryPage);
                if ($categoryPage.length < 1) return false;
                self.currentPageType = config.lcw.pageType.categoryPage;
                return true;
            }
        },
        turkcell: {
            url: ["www.turkcell.com.tr", "www.superonline.net/"],
            partnerName: "turkcell",
            pageType: {
                mainPage: 5,
                cartPage: "/pasaj/siparisler",
                productPage: [/product-detail-page/, /DetailArea/, /campaign-details/, /packages-detail/, /Detail_detail__content/],
                categoryPage: [/package-selection/, /--filterArea__/, /ListFilter_filterItem/, /campaign-list-filter/,/filter-side-bar/],
            },
            isOnMainPage: () => {
                if (!self.checkPartner(config.turkcell.partnerName)) return false;
                const $target = $(document).find("section")
                if ($target.length === config.turkcell.pageType.mainPage) return true;
                return false;
            },
            isOnCartPage: () => {
                if (!self.checkPartner(config.turkcell.partnerName)) return false;
                if (self.currentPathName.includes(config.turkcell.pageType.cartPage)) return true;
                return false;
            },
            isOnProductPage: () => {
                if (!self.checkPartner(config.turkcell.partnerName)) return false;
                const $matches = $(document).find(`*[class]`).filter(function () {
                    return config.turkcell.pageType.productPage.some((regex) => {
                        return regex.test(this.className);
                    })
                })
                if ($matches.length >= 1) return true;
                return false;
            },
            isOnCategoryPage: () => {
                if (!self.checkPartner(config.turkcell.partnerName)) return false;
                const $matches = $(document).find(`*[class]`).filter(function () {
                    return config.turkcell.pageType.categoryPage.some((regex) => {
                        return regex.test(this.className);
                    })
                })
                if ($matches.length >= 1) return true;
                return false;
            },
        },
        barcin: {
            url: ["www.barcin.com"],
            partnerName: "barcin",
            pageType: {
                mainPage: [/web-home/],
                cartPage: "basket",
                productPage: [/product-add-to-cart/],
                categoryPage: [/product-info/],
            },
            isOnMainPage: () => {
                if (!self.checkPartner(config.barcin.partnerName)) return false;
                const $matches = $(document).find(`*[id]`).filter(function () {
                    return config.barcin.pageType.mainPage.some((regex) => {
                        return regex.test(this.id);
                    })
                })
                if ($matches.length >= 1) return true;
                return false;
            },
            isOnCartPage: () => {
                if (!self.checkPartner(config.barcin.partnerName)) return false;
                const pathname = window.location.pathname;
                if (pathname.includes(config.barcin.pageType.cartPage)) return true;
                return false;
            },
            isOnProductPage: () => {
                if (!self.checkPartner(config.barcin.partnerName)) return false;
                const $matches = $(document).find(`*[data-testid]`).filter(function () {
                    return config.barcin.pageType.productPage.some((regex) => {
                        return regex.test(this.getAttribute("data-testid"));
                    })
                })
                if ($matches.length >= 1) return true;
                return false;
            },
            isOnCategoryPage: () => {
                if (!self.checkPartner(config.barcin.partnerName)) return false;
                const $matches = $(document).find(`*[class]`).filter(function () {
                    return config.barcin.pageType.categoryPage.some((regex) => {
                        return regex.test(this.className);
                    })
                })
                if ($matches.length >= 1) return true;
                return false;
            },
        }
    }


    // --- TEST --- //

    self.test = () => {
        self.testConfig = {
            lcw: {
                isOnCartPage: config.lcw.isOnCartPage(),
                isOnCategoryPage: config.lcw.isOnCategoryPage(),
                isOnMainPage: config.lcw.isOnMainPage(),
                isOnProductPage: config.lcw.isOnProductPage(),
            },
            turkcell: {
                isOnCartPage: config.turkcell.isOnCartPage(),
                isOnCategoryPage: config.turkcell.isOnCategoryPage(),
                isOnMainPage: config.turkcell.isOnMainPage(),
                isOnProductPage: config.turkcell.isOnProductPage(),
            },
            barcin: {
                isOnCartPage: config.barcin.isOnCartPage(),
                isOnCategoryPage: config.barcin.isOnCategoryPage(),
                isOnMainPage: config.barcin.isOnMainPage(),
                isOnProductPage: config.barcin.isOnProductPage(),
            },
        }
        window.fn = self.testConfig;
    }


    $(document).ready(self.init);
}