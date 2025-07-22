// eslint-disable

(($) => {
    'use strict';

    const classes = {
        style: 'custom-style',
        wrapper: 'ins-api-users',
        error: "error",
        loading: "loading",
    };

    const selectors = {
        appendLocation: `.${classes.wrapper}`,
        style: `.${classes.style}`,
        wrapper: `.${classes.wrapper}`,
        header: `header`,
        main: `main`,
        error: `.${classes.error}`,
        loading: `.${classes.loading}`,
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
            <header>
                <h1> Users </h1>
            </header>
            <main>

            </main>

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

        self.renderLoading();

        fetch(baseUrl)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => {
                self.userData = data;
                self.renderData(self.userData);
            })
            .catch((err) => {
                self.error = err;
                self.renderError(err);
            })
            .finally(()=> {
                self.loading = false;
                $(selectors.loading).remove();
            })
    };

    self.renderData = (data) => {
        const p = `<p> hello </p>`
        $(selectors.main).append(p)
    }

    self.renderError = (err) => {
        const $errorNotification = $(`<div class=${classes.error}> ${err} </div>`);
        $(selectors.main).append($errorNotification);
    }

    self.renderLoading = () => {
        const $loadingNotification = $(`<div class=${classes.loading}> Loading ... </div>`);
        $(selectors.main).append($loadingNotification);
    }

    $(document).ready(self.init);

})(jQuery);
