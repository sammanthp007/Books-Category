function pageLoad() {
    /* add even handlers */
    $("list_books").onclick = onListBooksClick;

   /* make ajax calls */ 
    var p = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {name: "Samman"},
            onSuccess: getCategories,
            onFailure: logFailure,
            onException: logFailure
        });
}

function onListBooksClick () {
    this.innerHTML = "poppy";
    alert("hoh");
}

window.onload = pageLoad;



function getCategories (data) {
    console.log("got the data from the database");
    console.log(data);
}

function logFailure(ajax, exception) {
    console.log("Could not fetch data from the database.\n"
        + "Return Status: " + ajax.status + "\n"
        + "Status Text: " + ajax.statusText
    );
    console.log(ajax);
}

