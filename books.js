new Ajax.Request ("mydata.xml", 
    {
        method: "get",
        parameters: "hi",
        onSuccess: getCategories,
        onFailure: logFailure,
        onException: logFailure
    });

function getCategories (data) {
    console.log("got the data from the database");
}

function logFailure(ajax, exception) {
    console.log("Could not fetch data from the database.\n" 
        + "Return Status: " + ajax.status + "\n"
        + "Status Text: " + ajax.statusText 
    );
    console.log(ajax);
}

