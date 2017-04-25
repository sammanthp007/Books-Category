<?php
$list_of_categories = array("Children", "Computers", "Finance");

$queries = $_GET["q"];

echo json_encode($list_of_categories);

//echo json_encode(array());
?>
