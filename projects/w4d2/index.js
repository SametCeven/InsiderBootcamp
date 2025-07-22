// eslint-disable

(($) => {
    'use strict';

    const classes = {
        style: 'custom-style',
        wrapper: 'ins-api-users',

    };

    const selectors = {
        appendLocation: '#container', // Append location for the HTML - Don't change this.
        style: `.${classes.style}`,
        wrapper: `.${classes.wrapper}`,

    };

    const self = {
        loading: false,
        error: null,
        userData: [],
    };

    self.init = () => {
        self.reset();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
        self.getData();
    };

    self.reset = () => {
        $(selectors.style).remove();
        $(document).off('.eventListener');
        $(selectors.wrapper).empty();
    };

    self.buildCSS = () => {

        // Defining reusable css properties
        const root = {
            "primary-color": "#112D4E",
            "secondary-color": "#3F72AF",
            "third-color": "#DBE2EF",
            "fourth-color": "#F9F7F7",
            "error-color": "#850505",
            "rounded-sm": "5px",
            "rounded-md": "10px",
            "primary-font": "Arial",
        }

        const customStyle = `
      <style class="${classes.style}">
        


      </style>
    `;

        $('head').append(customStyle);
    };

    self.buildHTML = () => {
        const html = 
        `
        

        `;

        $(selectors.appendLocation).append(html);
    };

    self.setEvents = () => {


    };



    // FETCH DATA
    self.getData = () => {
        const baseUrl = `https://jsonplaceholder.typicode.com/users`;
        self.loading = true;
        self.error = null;
        self.userData = [];

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            console.log(res)
            self.userData = res;
            self.loading = false;
            self.renderData(self.userData);
        }).fail((err) => {
            self.error = err;
        }).always(() => {
            self.loading = false;
        })
    }

    self.renderData = (data) => {
        if(!self.loading){
            console.log(1)
            const p = `<p> hello </p>`
            $(selectors.wrapper).append(p)

        }
    }


    $(document).ready(self.init);

})(jQuery);
