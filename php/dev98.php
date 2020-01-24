<?php

header("Content-Type: application/xml; charset=utf-8");
$xml = file_get_contents('https://dev98.de/feed/');
echo $xml;

?>