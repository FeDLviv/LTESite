<?php

require_once("access.php");

spl_autoload_register(function ($className) {
    include $className.".php";
});

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if (isset($_GET["id"])) {
        $query = <<<HERE
            SELECT
                region,
                type,
                address, 
                power,
                connect,
                category,
                organization,
                contract
            FROM 
                objects
            WHERE 
                idObject = ?;
HERE;
        echo MyDB::getInstance()->select($query, true, trim($_GET["id"]));
    } else {
        $query = <<<HERE
            SELECT
                region,
                type,
                address,
                idObject
            FROM
                objects
                ORDER BY
                region,
                    FIELD(type, 'ТЦ', 'ТЕЦ', "склад", "гуртожиток", "майстерня", "ТК", "ІТП", "ЦТП", "котельня") DESC,
                    type,
                    SUBSTRING_INDEX(address, ',', 1) COLLATE utf8_unicode_ci,
                    CAST(SUBSTRING_INDEX(address, ',', -1) AS unsigned);
HERE;
        echo MyDB::getInstance()->select($query, true);
    }
}
