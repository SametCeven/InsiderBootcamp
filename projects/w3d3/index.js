$(document).ready(() => {

    let error = null;
    let isFetching = false;
    const results = 5;
    const $userWrapper = $(".user-wrapper")


    // GETTING DATA FROM RANDOMUSER
    function getData(url, results) {
        const baseUrl = `https://randomuser.me/api/?results=${results}`;
        isFetching = true;

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            console.log(res.results)
            renderUsers(res.results);
        }).fail((err) => {
            error = err;
            renderError();
        }).always(() => {
            isFetching = false;
        })
    }


    // UTIL FUNCTION FOR ADDING DATA TO DOM
    function renderUsers(users) {
        users.forEach((user) => {
            const $userCard =
                `
                <div class="user-card">
                    <img src="${user.picture.large}"/>
                    <div class="user-card-info">
                        <h2> ${user.name.title}. ${user.name.first} ${user.name.last} </h2>
                        <span> ${user.email} </span>
                        <span> ${user.location.country} </span>
                    </div>
                </div>
                `;
            $userWrapper.append($userCard);
        })
    }



    // GETTING DATA WHEN PAGE IS INITIALIZED
    getData("", results);




})