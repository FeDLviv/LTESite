<?php

require_once("access.php");

spl_autoload_register(function ($className) {
    include $className.".php";
});

if ($_SERVER['REQUEST_METHOD'] == "GET") {
    if (isset($_GET["idObject"])) {
        $query = <<<HERE
            SELECT
            idMotorsLTE,
            mission,
            series,
            type,
            power,
            speed,
            threePhase,
            inventory,
            bearing1,
            bearing2,
            idWiloArt
        FROM
            motors_lte INNER JOIN missions USING(idMission)
        WHERE
            idObject = ?
        ORDER BY 
            IF(missions.mission = 'не використовується', 1, 0), 
            missions.mission;
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
