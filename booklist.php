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

$format = $_GET["format"];
$showCategory = $_GET["showCategory"];

if ($showCategory) {
    $sql = "select * from category;";
    $all_categories = mysqli_query($db, $sql);

    if ($format == "json") {
        $list_of_categories = array();

        while ($row = $all_categories->fetch_assoc()) {
            array_push($list_of_categories, $row[category]);
        }
        $returnJSON = array("categories" => $list_of_categories);
        echo json_encode($returnJSON);
    } else {
        $xml = new SimpleXMLElement("<?xml version='1.0'?><categories></categories>");
        $xml->addAttribute('newsPagePrefix', 'value goes here');
        $bookCategory = $xml->addChild("categories");
        while ($row = $all_categories->fetch_assoc()) {
            $currCategory = $bookCategory->addChild($row[category]);
            $currCategory->addChild("name", "b");
            $currCategory->addChild("id", $row[category_id]);
        }

        Header('Content-type: text/xml');
        echo $xml->asXML();
    }
}
?>
