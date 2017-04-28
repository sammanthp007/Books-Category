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

$sql = "select * from category;";

$all_categories = mysqli_query($db, $sql);

while ($row = $all_categories->fetch_assoc()) {
    $xml = new SimpleXMLElement("<?xml version='1.0'?><categories/>");
    Header('Content-type: text/xml');
    array_walk_recursive($list_of_categories, array($xml, 'addchild'));

    echo $row;
}

$sql1 = "
        select t.title_name, p.price, a.author, y.year, c.category
        from title t
        join category c on c.category_id = t.category_id
        join price p on t.title_id = p.title_id
        join year y on y.title_id = t.title_id
        join author a on a.author_id = t.author_id;
";


while (false && $row=mysqli_fetch_row($whole_database))
{
    $book = $xml->addChild('book');
    $book->addChild('title', $row['title_name']);
    $book->addChild('category', $row['category']);
    $book->addChild('price', $row['price']);
    $book->addChild('year', $row['year']);
    $book->addChild('author', $row['author']);
}


$list_of_categories = array(array("Productivity",6),array("Computers", 1), array("Finance", 2));

$format = $_GET["format"];

if ($format == "json") {
    echo json_encode($list_of_categories);
} else if (false) {
    // $categories = $xml->addChild("categories");
    //echo ($xml->asXML());
    echo $all_categories;
}
?>
