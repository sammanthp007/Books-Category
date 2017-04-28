<?php

define("DB_SERVER", "localhost");
define("DB_USER", "root");
define("DB_PASS", "password");
define("DB_NAME", "nwp7books");

function db_connect() {
    $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
    if(mysqli_connect_errno()) {
        $msg = "Database connection failed: ";
        $msg .= mysqli_connect_error();
        $msg .= " (" . mysqli_connect_errno() . ")";
        exit($msg);
    }
    return $connection;
}

$db = db_connect();

$list_of_categories = array(array("Productivity",6),array("Computers", 1), array("Finance", 2));

$format = $_GET["format"];

if ($format == "json") {
    echo json_encode($list_of_categories);
} else {
    $sql = "select * from category;";
    $all_categories = mysqli_query($db, $sql);
    $xml = new SimpleXMLElement("<?xml version='1.0'?><categories></categories>");
    $xml->addAttribute('newsPagePrefix', 'value goes here');
    while ($row = $all_categories->fetch_assoc()) {
        $bookCategory = $xml->addChild("categories");
        $bookCategory->addChild($row[category]);

        Header('Content-type: text/xml');
    }

    echo $xml->asXML();
}
?>
