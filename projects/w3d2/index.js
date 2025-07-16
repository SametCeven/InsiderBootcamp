
$(document).ready(() => {

    let error = null;
    let isFetching = false;

    // LOADING STATE MANAGEMENT
    $(document)
        .ajaxStart(() => {
            renderLoading();
        }).ajaxComplete(() => {
            $(".loading").remove();
        });


    // UTIL FUNCTION FOR ADDING DATA TO DOM
    function renderPosts(newPosts) {
        newPosts.forEach((post) => {
            const $postItem =
                `
                <div class="post-item" data-postid=${post.id}>
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
                <h2> Error Status : ${error.status} </h2>
                <p> Error Status Text : ${error.statusText} </p>
            </div> 
        `
        $("#post-container").append(errorNotification);
    }


    // UTIL FUNCTION FOR ADDING LOADING MESSAGE TO DOM
    function renderLoading() {
        const loadingNotification = `<div class="loading"> Loading ... </div>`
        $("#post-container").append(loadingNotification);
    }


    // GETTING DATA FROM JSONPLACEHOLDER
    function getData(url, limit, offset) {
        const baseUrl = `https://jsonplaceholder.typicode.com/posts/${url}/?_limit=${limit}&_start=${offset}`;
        isFetching = true;

        $.ajax({
            url: baseUrl,
            method: "GET",
        }).done((res) => {
            console.log(res)
            renderPosts(res);
        }).fail((err) => {
            error = err;
            renderError();
        }).always(()=>{
            isFetching = false;
        })
    }


    // GETTING DATA WHEN PAGE IS INITIALIZED
    let limit = 5;
    let offset = 0;
    getData("", limit, offset);


    // ADDING CLICK EVENT TO RESET PAGE
    $("#reset-page").click(() => {
        $("#post-container").empty();
        $(".postid").remove();
        limit = 5;
        offset = 0;
        getData("", limit, offset);
    })


    // ADDING CLICK EVENT TO EMULATE LOADING REQUEST
    $("#loading-request").click(() => {
        $("#post-container").empty();
        renderLoading();
    })


    // ADDING CLICK EVENT TO EMULATE BAD REQUEST
    $("#bad-request").click(() => {
        $("#post-container").empty();
        getData("error");
    })


    // ADDING CLICK EVENT TO POSTS TO IDENTIFY ID OF THE POST
    $("#post-container").on("click", ".post-item", (e) => {
        const $clicked = $(e.currentTarget);
        const clickedPostId = $clicked.data("postid");
        const $existing = $(".postid");
        const existingPostId = $existing.parent().data("postid");
        const postInfo = `<div class="postid"> Post Id : ${clickedPostId}</div>`;

        if($existing.length > 0 && clickedPostId !== existingPostId){
            $existing.remove();
            $clicked.append(postInfo);
        }else if($existing.length > 0 && clickedPostId === existingPostId){
            $existing.remove();
        }else{
            $clicked.append(postInfo);
        }
    })


    // ADDING SCROLL EVENT FOR INFINITE SCROLL
    const totalPosts = 100;  // max posts provided by jsonplaceholder

    $(window).on("scroll", debounce(() => {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
            if (!isFetching && offset < totalPosts) {
                offset = offset + limit;
                getData("", limit, offset);
            }
        }
    },500));


    // UTIL FUNCTION FOR DEBOUNCE
    function debounce(fn,delay){
        let timer;
        return function(){
            clearTimeout(timer);
            timer = setTimeout(fn,delay);
        }
    }







})