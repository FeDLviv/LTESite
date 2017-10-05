<?php

spl_autoload_register(function($className) {
    include $className.".php";
});

$query = <<<HERE
SELECT 
    *
FROM 
    motors_lte
WHERE
    idObject = ?;
HERE;

if(isset($_GET["idObject"])) {
    echo MyDB::getInstance()->select($query, trim($_GET["idObject"]));
}

?>