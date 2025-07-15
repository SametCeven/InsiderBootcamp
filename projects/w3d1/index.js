
// DEFINING STUDENT DATA
const studentData =
    [
        {
            name: "John",
            lastName: "Doe",
            age: "24",
            class: "A",
        },
        {
            name: "John",
            lastName: "Doe",
            age: "25",
            class: "B",
        },
        {
            name: "John",
            lastName: "Doe",
            age: "26",
            class: "C",
        },
    ]


// DOM MANIPULATIONS WITH JQUERY
$(document).ready(function () {


    //ADDING STUDENT DATA TO DOM
    const tableData = $(".table-data");
    studentData.forEach((student) => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.lastName}</td>
                <td>${student.age}</td>
                <td>${student.class}</td>
                <td class="delete-action">
                    <button class="delete-button">Delete</button>
                </td>
            </tr>
        `;
        tableData.append(row);
    });


    //FORM BUTTON CLICK EVENT
    $(".form button").click(function () {
        try {
            const name = $("#name").val().trim();
            const lastName = $("#lastName").val().trim();
            const age = $("#age").val().trim();
            const classInfo = $("#classInfo").val().trim();

            let errorMessages = [];
            if (!name) errorMessages.push("Name is required");
            if (!lastName) errorMessages.push("Last Name is required");
            if (!age) errorMessages.push("Age is required");
            if (!classInfo) errorMessages.push("Class is required");
            if (errorMessages.length > 0) throw new Error(errorMessages);


            const newRow = `
            <tr>
                <td>${name}</td>
                <td>${lastName}</td>
                <td>${age}</td>
                <td>${classInfo}</td>
                <td class="delete-action">
                    <button class="delete-button">Delete</button>
                </td>
            </tr>
        `;

            $(".table-data").append(newRow);
            studentData.push({ name, lastName, age, class: classInfo });

            $(".form input").val("");


        } catch (err) {
            $(".error-wrapper").remove()
            let errorMessages = [];

            errorMessages = err.message.split(",");
            let errorWrapper = `<ul class="error-wrapper"></ul>`;
            $(".form").append(errorWrapper);

            errorMessages.forEach((eM) => {
                const errorNotification = `<li class="error-notification">${eM}</li>`;
                $(".error-wrapper").append(errorNotification);
            })

            $(".error-wrapper").css({
                "color": "red",
                "font-size": "smaller",
                "margin": "0",
                "padding": "0",
                "gap": "0",
            })

            $(".form").append(errorWrapper);
        }


    })


    //FORM DELETE ACTION EVENT
    $(document).on("click", ".delete-button", function () {
        $(this).closest("tr").remove();
    })


    //CSS FOR SELECTING ROW
    $(document).on("mouseenter", ".table-data tr",
        function () {
            $(this).css({
                "background-color": "#58A0C8",
                "color": "white",
                "cursor": "pointer",
            })
        })

    $(document).on("mouseleave", ".table-data tr",
        function () {
            $(this).css({
                "background-color": "",
                "color": "",
                "cursor": "",
            })
        })







})



