$(document).ready(() => {

    let error = null;
    let isFetching = false;
    const results = 60;
    const $userWrapper = $(".user-wrapper");
    const $modalWrapper = $(".modal-wrapper");
    const $slider = $(".slider");


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

            // MODAL DEFINITION
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

            // USER CARD DEFINITION
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

            // SLIDER DEFINITION
            const slide =
                `
                    <div class="slide">
                        <img src="${user.picture.medium}"/>
                    </div>
                `
            $slider.append(slide);

        });

        // ADDING FANCYBOX
        Fancybox.bind("[data-fancybox='users']");

        //SLICK SETUP
        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("unslick");
        }
        $slider.slick({
            infinite: true,
            slidesToShow: 10,
            slidesToScroll: 9,
            dots: true,
            arrows: true,
        })
    }

    // ADDING BOUNCE EFFECT TO IMAGES
    $(document).on("click", ".slider .slide img", function () {
        const $img = $(this)
        console.log(1)
        $img
            .animate({
                top: "-=15px"
            }, 150).animate({
                top: "+=15px"
            }, 150)
    })


    // GETTING DATA WHEN PAGE IS INITIALIZED
    getData(results);

})