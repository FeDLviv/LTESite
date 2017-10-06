<?php

spl_autoload_register(function ($className) {
    include $className.".php";
});

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

echo MyDB::getInstance()->select($query);
