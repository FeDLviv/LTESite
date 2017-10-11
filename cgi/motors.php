<?php

require_once("access.php");

spl_autoload_register(function ($className) {
    include $className.".php";
});

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if (isset($_GET["idObject"])) {
        $query = <<<HERE
            SELECT 
                *
            FROM 
                motors_lte
            WHERE
                idObject = ?;
HERE;
        echo MyDB::getInstance()->select($query, true, trim($_GET["idObject"]));
    } else {
        $query = <<<HERE
        SELECT 
            *
        FROM 
            motors_lte;
HERE;
        echo MyDB::getInstance()->select($query, true);
    }
}
