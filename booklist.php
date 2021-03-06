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


$format = $_GET["format"];
$showCategory = $_GET["showCategory"];

if ($showCategory == 1) {
    $db = db_connect();
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
        while ($row = $all_categories->fetch_assoc()) {
            $currCategory = $xml->addChild($row[category]);
            $currCategory->addChild("name", $row[category]);
            $currCategory->addChild("id", $row[category_id]);
        }

        Header('Content-type: text/xml');
        echo $xml->asXML();
    }
    mysqli_close($db);
} else if ($showCategory == 0) {
    $chosenCategory = $_GET["category"];
    
    $db = db_connect();
    

    $sql = "select t.title_name, a.author, y.year, c.category from title t ";
    $sql .= "join category c on c.category_id = t.category_id and ";
    $sql .= "c.category_id=" . $chosenCategory . " ";
    $sql .= "join year y on y.title_id = t.title_id ";
    $sql .= "join author a on a.author_id = t.author_id;";
    $all_books = mysqli_query($db, $sql);
    
    if ($format == "json") {
        $list_of_books = array();

        while ($row = $all_books->fetch_assoc()) {
            array_push($list_of_books, $row[category]);
        }
        $returnJSON = array("books" => $list_of_books);
        echo json_encode($returnJSON);
    } else {
        $booksXML = new SimpleXMLElement("<?xml version='1.0'?><books></books>");
        while ($row = $all_books->fetch_assoc()) {
            $currBook = $booksXML->addChild("book");
            $currBook->addChild("author", $row[author]);
            $currBook->addChild("name", $row[category]);
            $currBook->addChild("year", $row[year]);
            $currBook->addChild("title", $row[title_name]);
        }

        Header('Content-type: text/xml');
        echo $booksXML->asXML();
    }
    mysqli_close($db);
}
?>
