(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    jqueryScript.onload = () => {
        rules(jQuery);
        box(jQuery);
    }
    document.head.append(jqueryScript);
})();

let globalConfig = {};

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
        testConfig: {
            partnerName: "",
            rules: {
                isOnCartPage: null, 
                isOnCategoryPage: null,
                isOnMainPage: null,
                isOnProductPage: null,
            },
        },
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
        self.testConfig.partnerName = self.currentPartnerName;
        
        Object.values(config).forEach((partner)=>{
            if(partner.partnerName === self.currentPartnerName){
                self.testConfig.rules.isOnCartPage = partner.isOnCartPage();
                self.testConfig.rules.isOnCategoryPage = partner.isOnCategoryPage();
                self.testConfig.rules.isOnMainPage = partner.isOnMainPage();
                self.testConfig.rules.isOnProductPage = partner.isOnProductPage();
            }
        })
        window.fn = self.testConfig;
    }

    globalConfig = self.testConfig;

    $(document).ready(self.init);
}

box = ($) => {
    "use strict";

    const classes = {
        style: "custom-style",
        container: "container",
        boxContainer: "box-container",
        box: "box",
        selectedBox: "selected-box",
        iconSelecBox: "icon-select-box",
        panel: "panel",
        inputContainer: "input-container",
        panelLabel: "panel-label",
        panelInput: "panel-input",
        panelInputContainer: "panel-input-container",
        btn: "btn",
        toastContainer: "toast-container",
        iconSuccess: "icon-success",
        buttonContainer: "button-container",
        mouseCircle: "mouse-circle",
        mouseCircleFilled: "mouse-circle-filled",
    }

    const selectors = Object.keys(classes).reduce(
        (acc, key) => {
            acc[key] = `.${classes[key]}`;
            return acc;
        }, {
        appendLocation: `body`,
        body: `body`,
        buttonSave: `[data-btn = save]`,
        buttonAdd: `[data-btn = add]`,
        buttonDelete: `[data-btn = delete]`,
        buttonAddtopage: `[data-btn = addtopage]`,
        buttonClosepopup: `[data-btn = closepopup]`,
    }

    );

    const self = {
        inputs: [
            { "title": "Background Color", "type": "color", "data-style": "background-color" },
            { "title": "Text Color", "type": "color", "data-style": "color" },
            { "title": "Width", "type": "range", "min": 0, "max": 300, "span": true, "data-style": "width", "data-styleSuffix": "px" },
            { "title": "Height", "type": "range", "min": 0, "max": 300, "span": true, "data-style": "height", "data-styleSuffix": "px" },
            { "title": "Border Width", "type": "number", "placeholder": "Enter px value", "data-style": "border-width", "data-styleSuffix": "px" },
            { "title": "Border Color", "type": "color", "data-style": "border-color" },
            { "title": "Box Shadow Size", "type": "number", "placeholder": "Enter px value", "data-style": "box-shadow-size", "data-styleSuffix": "px" },
            { "title": "Box Shadow Color", "type": "color", "data-style": "box-shadow-color" },
            { "title": "Font Size", "type": "number", "placeholder": "Enter px value", "data-style": "font-size", "data-styleSuffix": "px" },
        ],
        selectInputs: [
            { "title": "Font Weigth", "options": [{ "name": "Bold", "value": 900 }, { "name": "Semi-Bold", "value": 600 }, { "name": "Light", "value": 200 }], "data-style": "font-weight" },
            { "title": "Partner Name", "options": [{ "name": "LCW", "value": "lcw" }, { "name": "Turkcell", "value": "turkcell" }, { "name": "Barçın", "value": "barcin" }], "data-partner": true },
            { "title": "Campaign Page", "options": [{ "name": "Main Page", "value": "mainpage" }, { "name": "Cart Page", "value": "cartpage" }, { "name": "Product Page", "value": "productpage" }, { "name": "Category Page", "value": "categorypage" }], "data-page": true },
        ],
        boxes: [],
        selectedBoxes: [],
        mouseDown: false,
        draggingBox: null,
        dragOffset: { x: 0, y: 0 },
        boxWindowSize: {innerWidth:null, innerHeight:null},
    }

    const icons = {
        success: `<svg class=${classes.iconSuccess} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3caa49"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
    }

    self.init = () => {
        self.reset();
        self.buildHTML();
        self.buildCSS();
        self.setEvents();
        self.renderInitialBoxes();
        self.renderInputs();
        self.renderSelectInputs();
        self.renderMouseCircle();
    }

    self.reset = () => {
        $(selectors.style).remove();
        $(document).off(".eventListener");
        $(selectors.container).empty();
    }

    self.buildHTML = () => {
        const html =
            `
            <div class=${classes.container}>
                <div class=${classes.boxContainer}></div>
                <div class=${classes.panel}>
                    <h2> Panel </h2>
                    <div class=${classes.buttonContainer}>
                        <button class=${classes.btn} data-btn="add">Add Box</button>
                        <button class=${classes.btn} data-btn="delete">Delete Box</button>
                    </div>
                    <div class=${classes.inputContainer}></div>
                    <button class=${classes.btn} data-btn="save">Save Settings</button>
                    <button class=${classes.btn} data-btn="addtopage"> Add To Page</button>
                    <button class=${classes.btn} data-btn="closepopup"> Close </button>
                </div>
            </div>
        `
        $(selectors.appendLocation).append(html);
    }

    self.buildCSS = () => {
        const root = {
            "color-1": "#EEEEEE",
            "color-2": "#00ADB5",
            "color-3": "#393E46",
            "color-4": "#222831",
            "color-success": "#159735ff",
            "rounded-md": "10px",
        };

        const customStlye = `
        <style class=${classes.style}>

        ${selectors.body}{
            
        }

        ${selectors.container}{
            font-family: arial;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3rem;
            padding: 3rem;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 9999;
            background-color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3)
        }

        ${selectors.boxContainer}{
            width: 40rem;
            height: 40rem;
            padding: 1rem;
            border: 1px solid ${root["color-4"]};
            border-radius: ${root["rounded-md"]};
            overflow: auto;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin: 1rem;
            position: relative;
        }

        ${selectors.box}{
            background-color: white;
            width: 15rem;
            height: 15rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid ${root["color-2"]};
            border-radius: ${root["rounded-md"]};
            font-weight: 200;
            cursor: pointer;
            position: absolute;
            user-select: none;
            -webkit-user-select: none;
            z-index: 9998;
            text-align: center;
            padding: 0;
            marging: 0;
        }

        ${selectors.iconSelecBox}{
            position: absolute;
            right: 0;
            top: 0;
            border: 1px solid ${root["color-1"]};
            border-radius: ${root["rounded-md"]};
            background-color: ${root["color-1"]};
            width: 1rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        ${selectors.panel}{
            font-size: 12px;
            background-color: ${root["color-4"]};
            color: white;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            border-radius: ${root["rounded-md"]};
        }

        ${selectors.buttonContainer}{
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        ${selectors.inputContainer}{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        ${selectors.panelLabel}{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 3rem;
        }

        ${selectors.panelInputContainer}{
            display: flex;
            justify-items: center;
            align-items: center;
            gap: 1rem;
        }

        ${selectors.panelInput}{
            font-size: 12px;
            width: 10rem;
            height: 1.5rem;
            padding: 0.1rem 0.5rem;
            box-sizing: border-box;
            color: black;
        }

        ${selectors.btn}{
            background-color: ${root["color-2"]};
            color: ${root["color-1"]};
            height: 3rem;
            border-radius: ${root["rounded-md"]};
            border: none;
            transition: all 0.3s ease;
            cursor: pointer;
            min-width: 5rem;
        }

        ${selectors.btn}:hover{
            background-color: ${root["color-1"]};
            color: ${root["color-2"]};
            font-weight: 700;
        }

        ${selectors.toastContainer}{
            position: absolute;
            right: 0;
            bottom: 1rem;
            color: ${root["color-1"]};
            background-color: ${root["color-2"]};
            border: 1px solid ${root["color-1"]};
            border-radius: ${root["rounded-md"]};
            box-shadow: 0 0 5px ${root["color-2"]};
            padding: 1rem 3rem;
            border-radius: ${root["rounded-md"]};
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }

        ${selectors.iconSuccess}{
            width: 24px;
            height: 24px;
            stroke-width: 5px;
            stroke: ${root["color-success"]};
        }
        
        ${selectors.mouseCircle}{
            position: fixed;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: 1px solid ${root["color-1"]};
            pointer-events: none;
            left: 0;
            top: 0;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px ${root["color-2"]};
            transition: background-color 0.5s ease;
        }

        ${selectors.mouseCircleFilled}{
            background-color: ${root["color-2"]};
        }


        @media (max-width: 1200px){
            ${selectors.container}{
                flex-direction: column;
                gap: 0.5rem;
                padding: 0;
            }
            ${selectors.boxContainer}{
                height: 20rem;
            }
            ${selectors.panel}{
                margin: 0 2rem;
                gap: 0.5rem;
                padding: 0.5rem;
            }
            ${selectors.inputContainer}{
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            ${selectors.panelLabel}{
                width: 15rem;
                gap: 1rem;
            }
            ${selectors.panelInput}{
                width: 5rem;
            }
        }
        @media (max-width: 800px){
            ${selectors.boxContainer}{
                width: 20rem;
                height: 15rem;
            }
            ${selectors.panel}{
                margin: 0 0.5rem;
            }
        }
        @media (max-width: 600px){
            ${selectors.boxContainer}{
                height: 10rem;
            }
        }
        @media (max-width: 400px){
            ${selectors.panelLabel}{
                width: 10rem;
            }
            ${selectors.panelInput}{
                width: 3rem;
            }
        }
        

        </style>`;

        $(selectors.appendLocation).append(customStlye);
    }

    self.setEvents = () => {
        $(document).on("change.eventListener", selectors.panelInput, (e) => {
            const $target = $(e.target);
            const $selectedBox = $(selectors.selectedBox);
            const $span = $target.prev("span");
            const val = $target.val();
            const dataStyle = $target.data("style");
            const dataStyleSuffix = $target.data("styleSuffix") || "";
            const id = $selectedBox.data("id");
            const isPartnerSelect = $target.is("select") && $target.data("partner");
            const isPageSelect = $target.is("select") && $target.data("page");
            const boxFound = self.selectedBoxes.find((box) => box.id === id)

            if (isPartnerSelect) {
                boxFound.partner = val;
                $selectedBox.data("partner", val);
            } else if(isPageSelect){
                boxFound.page = val;
                $selectedBox.data("page",val);
            } else {
                let boxProps = {};
                boxProps[dataStyle] = val + dataStyleSuffix;
                boxFound.boxProps = { ...boxFound.boxProps, ...boxProps };
                if (dataStyle === "box-shadow-size" || dataStyle === "box-shadow-color") {
                    const size = boxProps["box-shadow-size"] || "0px";
                    const color = boxProps["box-shadow-color"] || "";
                    $selectedBox.css({ "box-shadow": `0 0 ${size} ${color}` });
                } else {
                    $selectedBox.css({ [dataStyle]: boxProps[dataStyle] });
                }

                if ($span) {
                    $span.text(boxProps[dataStyle])
                }
            }

            self.setSelectedInputValues();
        });

        $(document).on("click.eventListener", selectors.buttonSave, (e) => {
            e.preventDefault();
            self.setLocalStorage("boxes", self.boxes);
            self.showToast("Settings Saved ...");
        });

        $(document).on("click.eventListener", selectors.buttonAdd, (e) => {
            self.addBox();
        });

        $(document).on("click.eventListener", selectors.buttonDelete, (e) => {
            self.deleteBox();
        });

        $(document).on("click.eventListener", selectors.buttonAddtopage, (e) => {
            if(!self.checkPartner()) return;
            const windowSizeWidth = $(document.body).prop("scrollWidth");
            const windowSizeHeight = $(document.body).prop("scrollHeight");
            const widthMultiple = windowSizeWidth/self.boxWindowSize.innerWidth;
            const heightMultiple = windowSizeHeight/self.boxWindowSize.innerHeight;
            self.renderInitialBoxes(selectors.body,widthMultiple,heightMultiple);
            self.reset();
        });

        $(document).on("click.eventListener", selectors.buttonClosepopup, (e) => {
            self.reset();
        });

        $(document).on("click.eventListener", selectors.box, (e) => {
            const $target = $(e.currentTarget);
            self.toggleBox($target);
        })

        $(document).on("mousemove.eventListener", selectors.body, self.debounce((e) => {
            const { clientX, clientY, pageX, pageY } = e;

            $(selectors.mouseCircle).css({
                left: `${clientX}px`,
                top: `${clientY}px`
            })

            if (!self.draggingBox || !self.selectedBoxes.length) return;

            const $boxContainer = $(selectors.boxContainer);
            const boxContainerOffset = $boxContainer.offset();
            const left = pageX - boxContainerOffset.left;
            const top = pageY - boxContainerOffset.top;

            self.boxWindowSize.innerWidth = $boxContainer.width();
            self.boxWindowSize.innerHeight = $boxContainer.height();

            self.draggingBox.css({
                top: top + "px",
                left: left + "px",
                transform: "translate(-50%,-50%)",
            })
        }, 0))

        $(document).on("mousedown.eventListener", selectors.body, self.debounce((e) => {
            self.mouseDown = true;
            self.fillMouseCircle();
        }, 0))

        $(document).on("mouseup.eventListener", selectors.body, self.debounce((e) => {
            self.mouseDown = false;
            self.fillMouseCircle();

            if (!self.draggingBox) return;
            const position = self.getBoxPosition(self.draggingBox);
            const id = self.draggingBox.data("id");
            const boxFound = self.boxes.find((box) => box.id === id);
            boxFound.boxPosition = position;

            self.draggingBox = null;
        }, 0))

        $(document).on("mousedown.eventListener", selectors.box, self.debounce((e) => {
            e.preventDefault();
            const { target } = e;
            self.draggingBox = $(target);
        }, 0))

        $(window).on("resize", selectors.body, () => {
            self.renderInitialBoxes();
        })

        document.addEventListener("touchmove", (e) => {
            setTimeout(() => {
                const { pageX, pageY } = e.touches[0];
                e.preventDefault();
                if (!self.draggingBox || !self.selectedBoxes.length) return;

                const $boxContainer = $(selectors.boxContainer);
                const boxContainerOffset = $boxContainer.offset();
                const left = pageX - boxContainerOffset.left;
                const top = pageY - boxContainerOffset.top;

                self.draggingBox.css({
                    top: top + "px",
                    left: left + "px",
                    transform: "none",
                })
            }, 1)

        }, { passive: false })

        document.addEventListener("touchstart", (e) => {
            self.mouseDown = true;
            self.fillMouseCircle();

            const touch = e.touches[0];
            const target = touch.target.closest(selectors.box);
            if (!target) return;

            e.preventDefault();
            self.toggleBox($(target))
            self.draggingBox = $(target);
        }, { passive: false })

        document.addEventListener("touchend", (e) => {
            self.mouseDown = false;
            self.fillMouseCircle();
            if (!self.draggingBox) return;

            const position = self.getBoxPosition(self.draggingBox);
            const id = self.draggingBox.data("id");
            const boxFound = self.boxes.find((box) => box.id === id);
            boxFound.boxPosition = position;
            self.draggingBox = null;
        }, { passive: false })
    }

    //  ---------- UTILS --------------

    self.setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    self.getLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    self.debounce = (fn, delay = 50) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        }
    }

    self.renderInitialBoxes = (location = selectors.boxContainer,widthMultiple = 1,heightMultiple = 1) => {
        const localBoxes = self.getLocalStorage("boxes");
        if (localBoxes) {
            self.boxes = localBoxes;
            self.boxes.forEach((box) => {
                const $html = $(box.html);
                $html.data["id"] = box.id;
                if (box.boxProps) {
                    if (box.boxProps["box-shadow-color"] || box.boxProps["box-shadow-size"]) {
                        const size = box.boxProps["box-shadow-size"] || "0";
                        const color = box.boxProps["box-shadow-color"] || "";
                        $html.css({ "box-shadow": `0 0 ${size} ${color}` });
                    }
                    $html.css(box.boxProps);
                }
                if (box.boxPosition) {
                    const topFloat = parseFloat(box.boxPosition.top);
                    const leftFloat = parseFloat(box.boxPosition.left);
                    $html.css({
                        top: topFloat*heightMultiple+"px",
                        left: leftFloat*widthMultiple+"px",
                        position: "absolute"
                    });
                } else {
                    $html.css({
                        top: "0px",
                        left: "0px",
                        position: "absolute",
                    })
                }
                if (box.partner) {
                    $html.data("partner", box.partner);
                }
                if (box.page){
                    $html.data("page", box.page);
                }
                $(location).append($html);
            })
        }
    }

    self.renderInputs = () => {
        self.inputs.forEach((input) => {
            let $html;
            if (!input.span) {
                $html = $(`
                <label class=${classes.panelLabel}>
                    ${input.title}
                    <input
                        class=${classes.panelInput}
                        ${input.type ? `type=${input.type}` : "type=text"}
                        ${input.min ? `min=${input.min}` : ""}
                        ${input.max ? `max=${input.max}` : ""}
                        ${input.placeholder ? `placeholder="${input.placeholder}"` : ""}
                    ></input>
                </label>    
                `)
            } else {
                $html = $(`
                <label class=${classes.panelLabel}>
                    ${input.title}
                    <div class=${classes.panelInputContainer}>
                        <span></span>
                        <input
                            class=${classes.panelInput}
                            ${input.type ? `type=${input.type}` : "type=text"}
                            ${input.min ? `min=${input.min}` : ""}
                            ${input.max ? `max=${input.max}` : ""}
                            ${input.placeholder ? `placeholder="${input.placeholder}"` : ""}
                        ></input>
                    </div>
                </label>    
                `)
            }
            $html.find("input").data("style", input["data-style"]);
            $html.find("input").data("styleSuffix", input["data-styleSuffix"]);
            $(selectors.inputContainer).append($html);
        })
    }

    self.renderSelectInputs = () => {
        self.selectInputs.forEach((input) => {
            const $html = $(`
                <label class=${classes.panelLabel}>
                    ${input.title}
                    <select class=${classes.panelInput}>
                        ${input.options.map((o) => {
                return `<option value=${o.value}> ${o.name} </option>`
            })}
                    </select>
                </label>    
                `)
            const $select = $html.find("select");
            $select.data("style", input["data-style"]);
            $select.data("styleSuffix", input["data-styleSuffix"]);
            if (input["data-partner"]) $select.data("partner", true);
            if (input["data-page"]) $select.data("page", true);
            $(selectors.inputContainer).append($html);
        })
    }

    self.setSelectedInputValues = () => {
        if (self.selectedBoxes.length === 0) return;

        const selectedBox = self.selectedBoxes[0];
        const props = selectedBox.boxProps || {};
        const $labels = $(selectors.panelLabel);

        $labels.each((index, label) => {
            const $label = $(label);
            const $input = $label.find("input");
            const $select = $label.find("select");
            const $span = $label.find("span");

            if ($input.length) {
                const dataStyle = $input.data("style");
                const val = props[dataStyle];
                $input.val(val);
                $input.attr("placeholder", val);
                if ($span.length) $span.text(val);
                if ($input.attr("type") === "range" && val) $input.val(parseInt(val));
            }

            if ($select.length) {
                if ($select.data("partner") !== undefined) {
                    const val = selectedBox.partner || "";
                    $select.val(val);
                } else if($select.data("page") !== undefined){
                    const val = selectedBox.page || "";
                    $select.val(val);
                } else {
                    const dataStyle = $select.data("style");
                    const val = props[dataStyle];
                    $select.val(val);
                }
            }
        })
    }

    self.showToast = (msg) => {
        const $html = $(`
            <div class=${classes.toastContainer}>
                ${icons.success} ${msg}
            </div>    
        `)

        $(selectors.body).append($html);
        $html.animate({ right: "100px" }, 500)
        setTimeout(() => {
            $html.fadeOut(500);
        }, 1000)
    }

    self.addBox = () => {
        let maxId = 0;
        self.boxes.forEach((box) => {
            if (box.id > maxId) {
                maxId = box.id;
            }
        });
        let id = maxId + 1;

        const html = `<div class=${classes.box} data-id=${id}> BOX </div>`;
        $(selectors.boxContainer).append(html);

        const $box = $(selectors.box).last();
        const boxPosition = self.getBoxPosition($box);

        const box = {
            id: id,
            html: html,
            boxProps: {},
            boxPosition: boxPosition,
            partner: null,
            page: null,
        }
        self.boxes.push(box);
    }

    self.deleteBox = () => {
        const idsToDelete = self.selectedBoxes.map((box) => box.id);
        const $boxes = $(selectors.box)

        $boxes.each((index, box) => {
            const $box = $(box);
            const boxId = $box.data("id");
            if (idsToDelete.includes(boxId)) $box.remove();
        })

        self.boxes = self.boxes.filter((box) => !idsToDelete.includes(box.id));
        self.selectedBoxes = [];
    }

    self.renderMouseCircle = () => {
        const $html = $(`<div class=${classes.mouseCircle}></div>`)
        $(selectors.body).append($html);
    }

    self.fillMouseCircle = () => {
        const $mouseCircle = $(selectors.mouseCircle);
        $mouseCircle.toggleClass(classes.mouseCircleFilled);
    }

    self.getBoxPosition = ($box) => {
        const position = $box.position();
        return { top: (position.top) + "px", left: (position.left) + "px" };
    }

    self.toggleBox = ($box) => {
        $box.toggleClass(classes.selectedBox);
        const id = $box.data("id")
        const foundBox = self.boxes.find((box) => box.id === id);
        const foundBoxInSelected = self.selectedBoxes.find((box) => box.id === id);

        if (foundBoxInSelected) {
            const $html = $box.find(selectors.iconSelecBox);
            $html.remove();
            self.selectedBoxes = self.selectedBoxes.filter((box) => box.id !== id);
        } else {
            const $html = $(`<div class=${classes.iconSelecBox}> ${icons.success} </div>`)
            $box.append($html);
            self.selectedBoxes.push(foundBox);
            self.setSelectedInputValues();
        }
    }

    self.checkPartner = () => {
        console.log(globalConfig)
        console.log(self.selectedBoxes[0])
        return true
    }



    $(document).ready(self.init);


}