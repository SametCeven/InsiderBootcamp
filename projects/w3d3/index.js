$(document).ready(() => {

    let error = null;
    let isFetching = false;
    const results = 6;
    const $userWrapper = $(".user-wrapper");
    const $modalWrapper = $(".modal-wrapper");


    // GETTING DATA FROM RANDOMUSER
    function getData(results) {
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
        users.forEach((user, index) => {

            const modalId = `user-${index}`;
            const userModal =
                `
                <div class="user-modal fancybox-content" id="${modalId}">
                    <img src="${user.picture.large}"/>
                    <div>
                        <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
                        <p>Email: ${user.email}</p>
                        <p>Location: ${user.location.city}, ${user.location.country}</p>
                        <p>Phone: ${user.phone}</p>
                    </div
                </div>
                `;
            $modalWrapper.append(userModal);

            const $userCard =
                $(`
                <a href="javascript:;" data-fancybox="users" data-src="#${modalId}" class="user-card">
                    <img src="${user.picture.large}"/>
                    <div class="user-card-info">
                        <h2> ${user.name.title}. ${user.name.first} ${user.name.last} </h2>
                        <span> ${user.email} </span>
                        <span> ${user.location.country} </span>
                    </div>
                </a>
                `);

            $userWrapper.append($userCard.hide().fadeIn("slow"));
            $userCard.hover(
                function () {
                    $(this).addClass("hovered");
                },
                function () {
                    $(this).removeClass("hovered");
                })


        });

        Fancybox.bind("[data-fancybox='users']");
    }


    // GETTING DATA WHEN PAGE IS INITIALIZED
    getData(results);




})