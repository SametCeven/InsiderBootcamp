(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
    jqueryScript.onload = () => main(jQuery);
    document.head.append(jqueryScript);
})();


main = ($) => {
    "use strict";

    const classes = {
        style: "custom-style",
        container: "container",
        boxContainer: "box-container",
        box: "box",
        panel: "panel",
        panelLabel: "panel-label",
        panelInput: "panel-input",
        panelInputContainer: "panel-input-container",
        btn: "btn",
        toastContainer: "toast-container",
        iconSuccess: "icon-success",
    }

    const selectors = {
        appendLocation: `#appendLocation`,
        style: `.${classes.style}`,
        container: `.${classes.container}`,
        boxContainer: `.${classes.boxContainer}`,
        body: `body`,
        box: `.${classes.box}`,
        panel: `.${classes.panel}`,
        panelLabel: `.${classes.panelLabel}`,
        panelInput: `.${classes.panelInput}`,
        panelInputContainer: `.${classes.panelInputContainer}`,
        btn: `.${classes.btn}`,
        toastContainer: `.${classes.toastContainer}`,
        iconSuccess: `.${classes.iconSuccess}`,
    }

    const self = {
        boxProps: {},
        inputs: [
            {"title": "Background Color", "type": "color"},
            {"title": "Text Color", "type": "color"},
            {"title": "Width", "type": "range", "min": 0, "max": 300, "placeholder": "Enter px value", "span": true},
            {"title": "Height", "type": "range", "min": 0, "max": 300, "placeholder": "Enter px value", "span": true},
            {"title": "Border Width", "type": "number", "placeholder": "Enter px value"},
            {"title": "Border Color", "type": "color"},
            {"title": "Box Shadow Size", "type": "number", "placeholder": "Enter px value"},
            {"title": "Box Shadow Color", "type": "color"},
            {"title": "Font Size", "type": "number", "placeholder": "Enter px value"},
        ],
        selectInputs: [
            {"title": "Font Weigth", "options":[{"name": "Bold", "value": 900},{"name": "Semi-Bold", "value": 600},{"name": "Light", "value": 200}]},
        ]
    }

    const icons = {
        success: `<svg class=${classes.iconSuccess} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3caa49"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`,
    }

    self.init = () => {
        self.reset();
        self.buildHTML();
        self.buildCSS();
        self.setEvents();
        self.getInitialData();

        requestAnimationFrame(() => {
            self.setInitialInputValues();
        })

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
                <div class=${classes.boxContainer}>
                    <div class=${classes.box}> BOX </div>
                </div>
                <div class=${classes.panel}>
                    <h2> Panel </h2>

                    <label class=${classes.panelLabel} >
                        Background Color:
                        <input type=color class="${classes.panelInput}" ></input>
                    </label>

                    <label class=${classes.panelLabel} >
                        Text Color:
                        <input type=color class="${classes.panelInput}" ></input>
                    </label>

                    <label class=${classes.panelLabel} >
                        Width:
                        <div class=${classes.panelInputContainer}>
                            <span></span>
                            <input type=range min="50" max="300" class="${classes.panelInput}" placeholder="Enter px value"></input>
                        </div>
                    </label>

                    <label class=${classes.panelLabel} >
                        Height:
                        <div class=${classes.panelInputContainer}>
                            <span></span>
                            <input type=range min="50" max="300" class="${classes.panelInput}" placeholder="Enter px value"></input>
                        </div>
                    </label>

                    <label class=${classes.panelLabel} >
                        Border Width:
                        <input type=number class="${classes.panelInput}" placeholder="Enter px value"></input>
                    </label>

                    <label class=${classes.panelLabel} >
                        Border Color:
                        <input type=color class="${classes.panelInput}"></input>
                    </label>

                    <label class=${classes.panelLabel} >
                        Box Shadow Size:
                        <input type=number class="${classes.panelInput}" placeholder="Enter px value"></input>
                    </label>

                    <label class=${classes.panelLabel} >
                        Box Shadow Color:
                        <input type=color class="${classes.panelInput}"></input>
                    </label>
                    
                    <label class=${classes.panelLabel} >
                        Font Size:
                        <input type=number class="${classes.panelInput}" placeholder="Enter px value"></input>
                    </label>

                    <label class=${classes.panelLabel}>
                        Font Weight:
                        <select class=${classes.panelInput}>
                            <option value="Bold"> Bold </option>
                            <option value="Semi-Bold"> Semi-Bold </option>
                            <option value="Light"> Light </option>
                        </select>
                    </label>

                    <button class=${classes.btn}>Save Settings</button>
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
            margin: 0;
            padding: 0;
            font-family: arial;
            background-color: ${root["color-1"]};
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        ${selectors.container}{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3rem;
        }

        ${selectors.boxContainer}{
            width: 40rem;
            height: 40rem;
            padding: 1rem;
            border: 1px solid ${root["color-4"]};
            border-radius: ${root["rounded-md"]};
            overflow: hidden;
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
            transition: all 0.3s ease;
            font-weight: 200;
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
            width: 5rem;
            height: 1.5rem;
            padding: 0.1rem 0.5rem;
            box-sizing: border-box;
        }

        ${selectors.btn}{
            background-color: ${root["color-2"]};
            color: ${root["color-1"]};
            height: 3rem;
            border-radius: ${root["rounded-md"]};
            border: none;
            transition: all 0.3s ease;
            cursor: pointer;
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
        
        </style>`;

        $(selectors.appendLocation).append(customStlye);
    }

    self.setEvents = () => {
        $(document).on("change.eventListener", selectors.panelInput, (e) => {
            const $target = $(e.target);
            const $box = $(selectors.box);
            const text = $target.closest("label").contents().first().text().trim().slice(0, -1);
            const val = $target.val();

            switch (text) {
                case ("Background Color"):
                    self.boxProps.backgroundColor = val;
                    $box.css({ "background-color": `${val}` });
                    break;
                case ("Text Color"):
                    self.boxProps.textColor = val;
                    $box.css({ "color": `${val}` });
                    break;
                case ("Width"):
                    self.boxProps.width = val;
                    $box.width(val);
                    $target.prev("span").text(val + "px");
                    break;
                case ("Height"):
                    self.boxProps.height = val;
                    $box.height(val);
                    $target.prev("span").text(val + "px");
                    break;
                case ("Border Width"):
                    self.boxProps.borderWidth = val;
                    $box.css({ "border-width": `${val}` });
                    break;
                case ("Border Color"):
                    self.boxProps.borderColor = val;
                    $box.css({ "border-color": `${val}` });
                    break;
                case ("Box Shadow Size"):
                    self.boxProps.boxShadowSize = val;
                    break;
                case ("Box Shadow Color"):
                    self.boxProps.boxShadowColor = val;
                    break;
                case ("Font Size"):
                    const fontSize = parseInt(val);
                    self.boxProps.fontSize = fontSize;
                    $box.css({ "font-size": `${fontSize}px` });
                    break;
                case ("Font Weight"):
                    let valWeight;
                    if (val === "Bold") valWeight = 900;
                    if (val === "Semi-Bold") valWeight = 600;
                    if (val === "Light") valWeight = 200;
                    self.boxProps.fontWeight = valWeight;
                    $box.css({ "font-weight": `${valWeight}` });
                    break;
                default:
                    break;
            }

            if (self.boxProps.boxShadowColor && self.boxProps.boxShadowSize) {
                $box.css({ "box-shadow": `0 0 ${self.boxProps.boxShadowSize}px ${self.boxProps.boxShadowColor}` });
            }
        });

        $(document).on("click.eventListener", selectors.btn, (e) => {
            e.preventDefault();
            self.setBoxLocalStorage();
            self.showToast("Settings Saved ...");
        });
    }

    //  ---------- UTILS --------------

    self.setBoxLocalStorage = () => {
        localStorage.setItem("boxProps", JSON.stringify(self.boxProps));
    }

    self.getBoxLocalStorage = () => {
        return JSON.parse(localStorage.getItem("boxProps"));
    }

    self.getInitialData = () => {
        const localBoxProps = self.getBoxLocalStorage();
        if (localBoxProps) {
            self.boxProps = localBoxProps;
            const $box = $(selectors.box);
            const {backgroundColor, textColor, width, height, borderWidth, borderColor, boxShadowSize, boxShadowColor, fontSize, fontWeight} = self.boxProps;
            $box.css({
                "background-color": `${backgroundColor}`,
                "color": `${textColor}`,
                "width": `${width}`,
                "height": `${height}`,
                "border-width": `${borderWidth}`,
                "border-color": `${borderColor}`,
                "box-shadow": `0 0 ${boxShadowSize}px ${boxShadowColor}`,
                "font-size": `${fontSize}px`,
                "font-weight": `${fontWeight}`,
            })
        }
    }

    self.setInitialInputValues = () => {
        const $labels = $(selectors.panelLabel)
        $labels.each((i, label) => {
            const text = $(label).closest("label").contents().first().text().trim().slice(0, -1);
            const $input = $(label).find("input");
            const $span = $(label).find("span");

            switch (text) {
                case ("Background Color"):
                    $input.val(self.boxProps.backgroundColor);
                    break;
                case ("Text Color"):
                    $input.val(self.boxProps.textColor);
                    break;
                case ("Width"):
                    $span.text(self.boxProps.width+"px");
                    $input.val(self.boxProps.width);
                    break;
                case ("Height"):
                    $span.text(self.boxProps.height+"px");
                    $input.val(self.boxProps.height);
                    break;
                case ("Border Width"):
                    $(label).find("input").val(self.boxProps.borderWidth);
                    $input.attr("placeholder", self.boxProps.borderWidth);
                    break;
                case ("Border Color"):
                    $input.val(self.boxProps.borderColor);
                    break;
                case ("Font Size"):
                    $input.val(self.boxProps.fontSize);
                    $input.attr("placeholder", self.boxProps.fontSize);
                    break;
                case ("Font Weight"):
                    const $select = $(label).find("select");
                    let fontWeightText;
                    if (self.boxProps.fontWeight === 900) fontWeightText = "Bold";
                    else if (self.boxProps.fontWeight === 600) fontWeightText = "Semi-Bold";
                    else if (self.boxProps.fontWeight === 200) fontWeightText = "Light";
                    $select.val(fontWeightText);
                    break;
                case ("Box Shadow Size"):
                    $input.val(self.boxProps.boxShadowSize);
                    $input.attr("placeholder", self.boxProps.boxShadowSize);
                    break;
                case ("Box Shadow Color"):
                    $input.val(self.boxProps.boxShadowColor);
                    break;
                default:
                    break;
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
        $html.animate({right: "100px"}, 500)
        setTimeout(()=>{
            $html.remove();
        },1000)
    }



    $(document).ready(self.init);


}