
$(document).ready(() => {

    let posts = [];
    let error;

    // LOADING & ERROR STATE MANAGEMENT
    let loadingState = false;
    let errorState = null;

    const $loadingElement = `<div class="loading"> Loading ... </div>`

    $(document)
        .ajaxStart(() => {
            loadingState = true;
            $("#post-container").append($loadingElement);
        }).ajaxSuccess(() => {
            errorState = false;
        }).ajaxError((e) => {
            errorState = true;
        }).ajaxComplete(() => {
            loadingState = false;
            $(".loading").remove();
        });


    // UTIL FUNCTION FOR ADDING DATA TO DOM
    function renderPosts() {
        posts.forEach((post) => {
            const $postItem =
                `
                <div class="post-item">
                    <h2> ${post.title} </h2>
                    <p> ${post.body} </p>
                </div>
                `;
            $("#post-container").append($postItem);
        })
    }


    // UTIL FUNCTION FOR ADDING ERROR MESSAGE TO DOM
    function renderError() {
        const errorNotification =
            `
            <div class="error">
                <h2> ${error.status} </h2>
                <p> ${error.statusText} </p>
            </div> 
        `
        $("#post-container").append(errorNotification);
    }


    // GETTING DATA FROM JSONPLACEHOLDER
    function getData(url, limit, offset) {
        const baseUrl = `https://jsonplaceholder.typicode.com/posts/${url}/?_limit=${limit}&_start=${offset}`;

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            posts.push(...res);
            renderPosts();
        }).fail((err) => {
            error = err;
            renderError();
        })
    }

    let limit = 5;
    let offset = 0;
    getData("", limit, offset);



    // ADDING CLICK EVENT TO RESET PAGE
    $("#reset-page").click(() => {
        $("#post-container").empty();
        posts = [];
        getData("",limit,offset);
    })


    // ADDING CLICK EVENT TO EMULATE LOADING REQUEST
    $("#loading-request").click(() => {
        $("#post-container").empty();
        $("#post-container").append($loadingElement);
    })


    // ADDING CLICK EVENT TO EMULATE BAD REQUEST
    $("#bad-request").click(() => {
        $("#post-container").empty();
        getData("error");
    })








})