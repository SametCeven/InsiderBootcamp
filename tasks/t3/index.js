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
       
    }


    self.init = () => {
        self.reset();
        self.buildHTML();
        self.setEvents();
    }

    self.reset = () => {
        $(selectors.style).remove();
        $(document).off(".eventListener");
        $(selectors.container).empty();
    }

    self.buildHTML = () => {
        const html =`<div class=${classes.container}></div>`
        $(selectors.appendLocation).append(html);
    }

    self.setEvents = () => {
       
    }

    console.log("asd")
   


    $(document).ready(self.init);


}