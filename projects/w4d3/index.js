// eslint-disable

(() => {
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";

    jqueryScript.onload = () => {
        main(jQuery);
    }

    document.head.appendChild(jqueryScript);
})();


main = ($) => {
    'use strict';

    const classes = {
        style: 'custom-style',
        error: "error",
        loading: "loading",
        userWrapper: "user-wrapper",
        userContainer: "user-container",
        userInfo: "user-info",
        btn: "btn",
        accordionContent: "accordion-content",
        accordionToggle: "accordion-toggle",
        btnr: "btn-r",
    };

    const selectors = {
        appendLocation: `.ins-api-users`,
        style: `.${classes.style}`,
        wrapper: `.${classes.wrapper}`,
        body: `body`,
        header: `header`,
        main: `main`,
        error: `.${classes.error}`,
        loading: `.${classes.loading}`,
        headerH1: `header h1`,
        userWrapper: `.${classes.userWrapper}`,
        userContainer: `.${classes.userContainer}`,
        userInfo: `.${classes.userInfo}`,
        userContainerH2: `.${classes.userContainer} h2`,
        userContainerH3: `.${classes.userContainer} h3`,
        userContainerP: `.${classes.userContainer} p`,
        userContainerSp: `.${classes.userContainer} span`,
        btn: `.${classes.btn}`,
        accordionContent: `.${classes.accordionContent}`,
        accordionToggle: `.${classes.accordionToggle}`,
        btnr: `.${classes.btnr}`,
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
        self.setObserver();
    };

    self.reset = () => {
        $(selectors.style).remove();
        $(document).off('.eventListener');
        $(selectors.wrapper).empty();
    };

    self.buildCSS = () => {

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

        ${selectors.userWrapper}{
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 5rem;
        }

        ${selectors.userContainer}{
            display: flex;
            flex-direction: column;
            width: 25%;
            gap: 1rem;
            border: 1px solid ${root["fourth-color"]};
            box-shadow: 0 0 10px ${root["fourth-color"]};
            padding: 1rem;
        }

        ${selectors.userContainerH2}{
            color:${root["secondary-color"]};
            background-color: ${root["fourth-color"]};
            border-radius: ${root["rounded-sm"]};
            padding: 0.5rem;
            margin: 0;
        }

        ${selectors.userInfo}{
            border: 1px solid ${root["secondary-color"]};
            border-radius: ${root["rounded-sm"]};
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        ${selectors.userContainerH3}{
            color:${root["fourth-color"]};
            background-color: ${root["secondary-color"]};
            border-radius: ${root["rounded-sm"]};
            padding: 0.5rem;
            margin: 0;
        }

        ${selectors.userContainerP}{
            font-size: smaller;
            display: flex;
            justify-content: space-between;
            text-align: right;
            gap: 2rem;
            border-bottom: 1px solid ${root["secondary-color"]};
            padding-bottom: 0.5rem;
        }

        ${selectors.userContainerSp}{
            font-weight: bold;
            text-align: left;
        }

        ${selectors.btn}{
            padding: 0.5rem;
            border: 1px solid ${root["error-color"]};
            border-radius: ${root["rounded-sm"]};
            box-shadow: 0 0 10px ${root["error-color"]};
            background-color: ${root["fourth-color"]};
            color: ${root["error-color"]};
            font-weight: bold;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        ${selectors.btn}:hover{
            background-color: ${root["error-color"]};
            color: ${root["fourth-color"]};
        }

        ${selectors.accordionToggle}{
            cursor: pointer;
            user-select: none;
        }

        ${selectors.accordionContent}{
            display: none;
            transition: max-height 0.3s ease;
        }

        ${selectors.btnr}{
            padding: 0.5rem;
            border: 1px solid ${root["secondary-color"]};
            border-radius: ${root["rounded-sm"]};
            box-shadow: 0 0 10px ${root["secondary-color"]};
            background-color: ${root["fourth-color"]};
            color: ${root["secondary-color"]};
            font-weight: bold;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        ${selectors.btnr}:hover{
            background-color: ${root["secondary-color"]};
            color: ${root["fourth-color"]};
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
                <div class=${classes.userWrapper}></div>
            </main>

        `;

        $(selectors.appendLocation).append(html);
    };

    self.setEvents = () => {
        $(document).on("click.eventListener", selectors.btn, (e) => {
            const $target = $(e.currentTarget).parent(selectors.userContainer);
            const id = $target.data("id");
            $target.fadeOut(400, () => {
                $target.remove();
            });
            self.removeUserFromLocalStorage(id);
        })

        $(document).on("click.eventListener", selectors.accordionToggle, (e) => {
            const $target = $(e.currentTarget).next(selectors.accordionContent);
            $target.slideToggle(300);
        })

        $(document).on("click.eventListener", selectors.btnr, (e) => {
            self.toggleRefreshButtonSessionStorage();
            self.getData();
        })

    };



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

        $(selectors.btnr).remove();

        self.userData.forEach((user) => {
            const $user = $(`
                <div class=${classes.userContainer} data-id=${user.id}>
                    <h2> ${user.username} </h2>
                    <div class=${classes.userInfo}>
                        <h3 class=${classes.accordionToggle}> User Information </h3>
                        <div class=${classes.accordionContent}>
                            <p> <span>Name: </span> ${user.name} </p>
                            <p> <span>Company: </span> ${user.company.name} </p>
                            <p> <span>Company Catch Phrase: </span> ${user.company.catchPhrase} </p>
                        </div>
                    </div>
                    <div class=${classes.userInfo}>
                        <h3 class=${classes.accordionToggle}> Contact Information </h3>
                        <div class=${classes.accordionContent}>
                            <p> <span>Email: </span> ${user.email} </p>
                            <p> <span>Phone: </span> ${user.phone} </p>
                            <p> <span>Website: </span> ${user.website} </p>
                            <p> <span>City: </span> ${user.address.city} </p>
                        </div>
                    </div>
                    <button class=${classes.btn}> Delete User </button>
                </div>
            `)

            $user.hide().fadeIn(500);
            $(selectors.userWrapper).append($user)
        })

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
        localStorage.setItem("userDataStorage", JSON.stringify(self.userDataStorage));
    }

    self.removeUserFromLocalStorage = (id) => {
        const newUserData = self.userData.filter((u) => u.id !== id);
        self.userData = newUserData;
        self.setLocalStorageData()
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

    self.setObserver = () => {
        const userWrapper = $(selectors.userWrapper)[0];

        const config = {
            childList: true,
        }

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList" && mutation.removedNodes.length) {
                    if (mutation.target.children.length === 0 && !self.getRefreshButtonSessionStorage()) {
                        self.renderRefreshButton();
                    }
                }
            })
        })

        observer.observe(userWrapper, config)
    }

    self.renderRefreshButton = () => {
        const $refreshButton = $(`
            <button class=${classes.btnr}> Fetch User Data </button>    
        `)
        $(selectors.userWrapper).append($refreshButton);
    }

    self.toggleRefreshButtonSessionStorage = () => {
        if(self.getRefreshButtonSessionStorage()){
            sessionStorage.setItem("refreshButtonUsed", "false");
        }else{
            sessionStorage.setItem("refreshButtonUsed", "true");
        };
    }

    self.getRefreshButtonSessionStorage = () => {
        return JSON.parse(sessionStorage.getItem("refreshButtonUsed"));
    }

    


    $(document).ready(self.init);


};
