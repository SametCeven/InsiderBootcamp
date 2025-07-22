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
        body: `body`,
        header: `header`,
        main: `main`,
        error: `.${classes.error}`,
        loading: `.${classes.loading}`,
        headerH1: `header h1`,
    };

    const self = {
        loading: false,
        error: null,
        userData: [],
        userDataStorage: {},
    };

    self.init = () => {
        self.reset();
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
        self.getInitialData();
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
        ${selectors.body}{
            font-family: ${root["primary-font"]};
            background-color: ${root["primary-color"]};
            color: ${root["fourth-color"]};
            padding: 1rem 3rem;
        }

        ${selectors.header}{
            margin-bottom: 5rem;
        }

        ${selectors.headerH1}{
            font-size: 40px;
        }

        ${selectors.loading}{
            color: ${root["secondary-color"]};
        }

        ${selectors.error}{
            color: ${root["error-color"]};
        }


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
                self.setLocalStorageData();
                self.renderUserData();
            })
            .catch((err) => {
                self.error = err;
                self.renderError(err);
            })
            .finally(() => {
                self.loading = false;
                $(selectors.loading).remove();
            })
    };

    self.renderUserData = () => {
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

    self.getLocalStorageData = () => {
        self.userDataStorage = JSON.parse(localStorage.getItem("userDataStorage"));
    }

    self.setLocalStorageData = () => {
        self.userDataStorage = {
            data: self.userData,
            expirationDate: new Date(),
        }
        localStorage.setItem("userDataStorage",JSON.stringify(self.userDataStorage));
    }

    self.getInitialData = () => {
        self.getLocalStorageData();

        const currentDate = new Date();
        let expirationDate;
        const ms24H = 24 * 60 * 60 * 1000;

        if (self.userDataStorage) {
            expirationDate = new Date(self.userDataStorage.expirationDate);
        }

        if (!self.userDataStorage || currentDate - expirationDate > ms24H) {
            self.getData();
        } else {
            self.userData = self.userDataStorage.data;
            self.renderUserData();
        }
    }

    $(document).ready(self.init);

})(jQuery);
