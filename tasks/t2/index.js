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
        selectedBox: "selected-box",
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
        appendLocation: `#appendLocation`,
        body: `body`,
        buttonSave: `[data-btn = save]`,
        buttonAdd: `[data-btn = add]`,
        buttonDelete: `[data-btn = delete]`,
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
        ],
        boxes: [],
        selectedBoxes: [],
        mouseDown: false,
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
                <div class=${classes.boxContainer}>
                    
                </div>
                <div class=${classes.panel}>
                    <h2> Panel </h2>
                    <div class=${classes.buttonContainer}>
                        <button class=${classes.btn} data-btn="add">Add Box</button>
                        <button class=${classes.btn} data-btn="delete">Delete Box</button>
                    </div>
                    <div class=${classes.inputContainer}></div>
                    <button class=${classes.btn} data-btn="save">Save Settings</button>
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
            overflow: auto;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
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
            cursor: pointer;
        }

        ${selectors.selectedBox}{
            transform: rotate(45deg);
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

            let boxProps = {};
            boxProps[dataStyle] = val + dataStyleSuffix;
            const boxFound = self.selectedBoxes.find((box) => box.id === id)
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
            self.setSelectedInputValues();
        });

        $(document).on("click.eventListener", selectors.buttonSave, (e) => {
            e.preventDefault();
            console.log(self.boxes)
            self.setLocalStorage("boxes", self.boxes);
            self.showToast("Settings Saved ...");
        });

        $(document).on("click.eventListener", selectors.buttonAdd, (e) => {
            self.addBox();
        });

        $(document).on("click.eventListener", selectors.buttonDelete, (e) => {
            self.deleteBox();
        });

        $(document).on("click.eventListener", selectors.box, (e) => {
            const $target = $(e.currentTarget);
            $target.toggleClass(classes.selectedBox)
            const id = $target.data("id")
            const foundBox = self.boxes.find((box) => box.id === id);
            const foundBoxInSelected = self.selectedBoxes.find((box) => box.id === id);

            if (foundBoxInSelected) {
                self.selectedBoxes = self.selectedBoxes.filter((box) => box.id !== id);
            } else {
                self.selectedBoxes.push(foundBox);
                self.setSelectedInputValues();
            }
        })

        $(document).on("mousemove.eventListener", selectors.body, self.debounce((e)=>{
            const {clientX, clientY} = e;
            $(selectors.mouseCircle).css({
                left: `${clientX}px`,
                top: `${clientY}px`
            })
        }, 0.1))

        $(document).on("mousedown.eventListener", selectors.body, self.debounce((e) => {
            self.mouseDown = true;
            self.fillMouseCircle();
        }, 3))

        $(document).on("mouseup.eventListener", selectors.body, self.debounce((e) => {
            self.mouseDown = false;
            self.fillMouseCircle();
        }, 3))

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

    self.renderInitialBoxes = () => {
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

                    $html.css(box.boxProps)
                }
                $(selectors.boxContainer).append($html);
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
            $html.find("select").data("style", input["data-style"]);
            $html.find("select").data("styleSuffix", input["data-styleSuffix"]);
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
                const dataStyle = $select.data("style");
                const val = props[dataStyle];
                $select.val(val);
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

        const box = {
            id: id,
            html: html,
            boxProps: {},
        }
        self.boxes.push(box);
    }

    self.deleteBox = () => {
        const idsToDelete = self.selectedBoxes.map((box)=> box.id);
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


    $(document).ready(self.init);


}