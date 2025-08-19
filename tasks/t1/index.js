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
        box: "box",
        panel: "panel",
        panelLabel: "panel-label",
        panelInput: "panel-input",
        btn: "btn",
    }

    const selectors = {
        appendLocation: `#appendLocation`,
        style: `.${classes.style}`,
        container: `.${classes.container}`,
        body: `body`,
        box: `.${classes.box}`,
        panel: `.${classes.panel}`,
        panelLabel: `.${classes.panelLabel}`,
        panelInput: `.${classes.panelInput}`,
        btn: `.${classes.btn}`,
    }

    const self = {
        boxProps: {},
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
                <div class=${classes.box}> BOX </div>
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
                        <input type=range min="1" max="1000" class="${classes.panelInput}" placeholder="Enter px value"></input>
                        <span></span>
                    </label>

                    <label class=${classes.panelLabel} >
                        Height:
                        <input type=range min="1" max="1000" class="${classes.panelInput}" placeholder="Enter px value"></input>
                        <span></span>
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
        }

        ${selectors.container}{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10rem;
        }

        ${selectors.box}{
            background-color: white;
            width: 20rem;
            height: 20rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid ${root["color-2"]};
            border-radius: ${root["rounded-md"]};
            transition: all 0.3s ease;
            font-weight: 200;
        }

        ${selectors.panel}{
            background-color: ${root["color-4"]};
            color: white;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            border-radius: ${root["rounded-md"]};
        }
        
        ${selectors.panelLabel}{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 3rem;
        }

        ${selectors.panelInput}{
            width: 10rem;
            height: 2rem;
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
                    $target.next("span").text(val+"px");
                    break;
                case ("Height"):
                    self.boxProps.height = val;
                    $box.height(val);
                    $target.next("span").text(val+"px");
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
        if(localBoxProps){
            self.boxProps = localBoxProps;
            const $box = $(selectors.box);
            $box.css({
                "background-color": `${self.boxProps.backgroundColor}`,
                "color": `${self.boxProps.textColor}`,
                "width": `${self.boxProps.width}`,
                "height": `${self.boxProps.height}`,
                "border-width": `${self.boxProps.borderWidth}`,
                "border-color": `${self.boxProps.borderColor}`,
                "box-shadow": `0 0 ${self.boxProps.boxShadowSize}px ${self.boxProps.boxShadowColor}`,
                "font-size": `${self.boxProps.fontSize}px`,
                "font-weight": `${self.boxProps.fontWeight}`,
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
                    $span.text(self.boxProps.width);
                    $input.val(self.boxProps.width);
                    break;
                case ("Height"):
                    $span.text(self.boxProps.height);
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



    $(document).ready(self.init);


}