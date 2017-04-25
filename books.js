function pageLoad() {
    /* add even handlers */
    //$("list_books").onclick = onListBooksClick;

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
    var p = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {category: this.name},
            onSuccess: showBooks,
            onFailure: logFailure,
            onException: logFailure
        });
    alert("hoh");
}

window.onload = pageLoad;



function getCategories (data) {
    console.log("got the data from the database" +
        data.responseText);
    var categories = JSON.parse(data.responseText);
    console.log(categories);
    var i;
    for (i = 0; i < categories.length; i++) {
        console.log(categories[i]);
    }
    console.log(data);
}


function logFailure(ajax, exception) {
    console.log("Could not fetch data from the database.\n"
        + "Return Status: " + ajax.status + "\n"
        + "Status Text: " + ajax.statusText
    );
    console.log(ajax);
}

