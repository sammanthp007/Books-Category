function pageLoad() {
    /* add even handlers */
    //$("list_books").onclick = onListBooksClick;

    /* make ajax calls */
    var p = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {showCategory: true},
            onSuccess: getAndShowCategories,
            onFailure: logFailure,
            onException: logFailure
        });
}

function onListBooksClick () {
    console.log(this.name);
    var p = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {showCategory: false, category: this.name},
            onSuccess: showBooks,
            onFailure: logFailure,
            onException: logFailure
        });
}


function getAndShowCategories (data) {
    console.log(data);
    var categories;
    try {
        categories = JSON.parse(data.responseText);
    }
    catch (err) {
        categories = data.responseXML;
    }
    var category = data.responseXML.getElementsByTagName("categories");
    console.log(category[0]);
    var category_name = category[0].firstChild.firstChild;
    console.log(category_name);
    var inputForm = document.createElement("form");
    inputForm.name = "chooseCategory";
    inputForm.method = "POST";
    inputForm.action = "booklist.php";

    for (var i = 0; i < categories.length; i++) {
        console.log(categories[i]);
        var formInput = document.createElement("input");
        formInput.type = "radio";
        formInput.name = "category";
        formInput.value = categories[i];
        
        var label = document.createElement("label");
        var textNode = document.createTextNode(categories[i] + " ");
        label.appendChild(textNode);
        
        inputForm.appendChild(formInput);
        inputForm.appendChild(label);
    }
    var submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "List Books";
    inputForm.appendChild(submitButton);
    console.log(data);
    $("categories").appendChild(inputForm);
}


function logFailure(ajax, exception) {
    console.log("Could not fetch data from the database.\n"
        + "Return Status: " + ajax.status + "\n"
        + "Status Text: " + ajax.statusText
    );

    if (exception) {
        console.log("Exception happened: " + exception);
        throw exception;
    }
}

window.onload = pageLoad;
