<?php
$db = new PDO("mysql:dbname=books;host=127.0.0.1", "root", "password");
$list_of_categories = array("Children", "Computers", "Finance");

$format = $_GET["format"];

if ($format == "json") {
    echo json_encode($list_of_categories);
} else {
    $xml = new SimpleXMLElement("<?xml version='1.0'?><categories/>");
    array_walk_recursive($list_of_categories, array($xml, 'addchild'));
    Header('Content-type: text/xml');
    echo ($xml->asXML());
}
?>
