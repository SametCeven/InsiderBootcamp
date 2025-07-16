
$(document).ready(() => {

    let posts = [];

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
        }).ajaxError(() => {
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



    // GETTING DATA FROM JSONPLACEHOLDER
    function getData(limit, offset) {
        const baseUrl = `https://jsonplaceholder.typicode.com/posts/?_limit=${limit}&_start=${offset}`;

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            posts.push(...res);
            renderPosts();
        }).fail((err) => {
            console.error(err);
        })
    }

    let limit = 5;
    let offset = 0;
    getData(limit, offset);










})