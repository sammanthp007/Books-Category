function pageLoad() {
    /* add even handler */
    // $("list_books").onclick = onListBooksClick;

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
    var radioButtons = document.getElementsByName('category');
    var chosenCategory;

    radioButtons.forEach(function(button) {
        if (button.checked) {
            chosenCategory = button.value;
        }
    });


    if (chosenCategory) {
        var p = new Ajax.Request ("booklist.php",
            {
                method: "get",
                parameters: {showCategory: false, category: chosenCategory},
                onSuccess: showBooks,
                onFailure: logFailure,
                onException: logFailure
            });
    }
    else {
        console.log("choose a category");
    }
}


function getAndShowCategories (data) {
    var category_list = [];

    if (data.responseJSON) {
        categories = JSON.parse(data.responseText);
    }
    else if (data.responseXML) {
        returnXML = data.responseXML;
        var categories = returnXML.getElementsByTagName("categories")[0];
        var firstchild = categories.firstChild;
        while (firstchild) {
            var catName = firstchild.firstChild.firstChild.nodeValue;
            var catID = firstchild.lastChild.firstChild.nodeValue;
            category_list.push([catName, catID]);
            firstchild = firstchild.nextSibling;
        }
    } else {
        console.log("This is not json nor xml:");
        console.log(data.responseText);
    }

    /* create a radio button and add data */
    var inputForm = document.createElement("form");
    inputForm.name = "chooseCategory";

    for (var i = 0; i < category_list.length; i++) {
        var formInput = document.createElement("input");
        formInput.type = "radio";
        formInput.name = "category";
        formInput.value = category_list[i][1];

        var label = document.createElement("label");
        var textNode = document.createTextNode(category_list[i][0] + " ");
        label.appendChild(textNode);

        inputForm.appendChild(formInput);
        inputForm.appendChild(label);
    }
    var submitButton = document.createElement("input");
    submitButton.type = "button";
    // submitButton.addEventListener('click', function(){
    //  onListBooksClick(inputForm)
    //});
    submitButton.value = "List Books";
    submitButton.onclick = onListBooksClick;
    inputForm.appendChild(submitButton);

    $("categories").appendChild(inputForm);
}


function logFailure(ajax, exception) {
    console.log(ajax);
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
