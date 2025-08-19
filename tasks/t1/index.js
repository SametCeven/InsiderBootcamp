(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";

    jqueryScript.onload = () => {
        main(jQuery);
    }

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
        panelBgInput: "panel-bg-input",
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
        panelBgInput: `.${classes.panelBgInput}`,
    }

    const self = {

    }

    self.init = () => {
        self.reset();
        self.buildHTML();
        self.buildCSS();
        self.setEvents();
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
                        <input type=color class="${classes.panelInput} ${classes.panelBgInput}" ></input>
                    </label>
                    
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
        }

        ${selectors.panel}{
            background-color: ${root["color-4"]};
            color: white;
            width: 20rem;
            height: 30rem;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border-radius: ${root["rounded-md"]};
        }
        
        ${selectors.panelLabel}{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        ${selectors.panelInput}{
        
        }

        ${selectors.panelBgInput}{

        }
        
        </style>`;

        $(selectors.appendLocation).append(customStlye);
    }

    self.setEvents = () => {

        $(document).on("change.eventListener", $(selectors.panelBgInput), (e) => {
            console.log(e)
            
        })
    }


    $(document).ready(self.init);


}