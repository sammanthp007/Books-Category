function pageLoad() {
    /* add even handler */
    // $("list_books").onclick = onListBooksClick;

    /* make ajax calls */
    var p = new Ajax.Request ("booklist.php",
        {
            method: "get",
            parameters: {showCategory: 1},
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
        new Ajax.Request ("booklist.php",
            {
                method: "get",
                parameters: {
                    showCategory: 0,
                    category: chosenCategory},
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
        categories = JSON.parse(data.responseJSON);
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


function showBooks(data) {
    var book_list = [];
    if (data.responseJSON) {
        books = JSON.parse(data.responseJSON);
    }
    else if (data.responseXML) {
        returnXML = data.responseXML;
        var books = returnXML.getElementsByTagName("books")[0];
        var currBook = books.firstChild;
        while (currBook) {
            var bookAuthor = currBook.firstChild.firstChild.nodeValue;
            var bookCat = currBook.firstChild.nextSibling.firstChild.nodeValue;
            var bookYear = currBook.firstChild.nextSibling.
                nextSibling.firstChild.nodeValue;
            var bookName = currBook.lastChild.firstChild.nodeValue;
            book_list.push([bookAuthor, bookCat, bookYear, bookName]);
            currBook = currBook.nextSibling;
        }
    } else {
        console.log("This is not json nor xml:");
        console.log(data.responseText);
    }

    if (book_list.length > 0) {
        var title = document.createElement("p");
        var text = document.createTextNode('Books in category ' + 
            '"'+ book_list[0][1] + '":');
        title.appendChild(text);
        $("books").appendChild(title);
    }

    var ul = document.createElement("ul");

    for (var i=0; i < book_list.length; i++) {
        var li = document.createElement("li");
        var bookItem = book_list[i][3] + 
            ", by " + book_list[i][0] + 
            " (" + book_list[i][2] + ")";

        console.log(bookItem);
        var row = document.createTextNode(bookItem);
        li.appendChild(row);
        ul.appendChild(li);
    }

    $("books").appendChild(ul);
}


window.onload = pageLoad;
