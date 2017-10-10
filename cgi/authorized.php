<?php

session_start();

spl_autoload_register(function ($className) {
    include $className.".php";
});

$response = [];

if (isset($_SESSION["user"]) && $_SESSION["browser"] == $_SERVER["HTTP_USER_AGENT"] && $_SESSION["address"] == $_SERVER["REMOTE_ADDR"]) {
    $response["status"] = "authorized";
    $response["user"] = $_SESSION["user"];
} elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    $result = MyDB::getInstance()->select("SELECT * FROM users WHERE user = ?", $_POST["user"]);
    if (isset(json_decode($result)[0]) && password_verify($_POST["password"], json_decode($result)[0]->password)) {
            $response["status"] = "authorized";
            $response["user"] = $_POST["user"];
            $_SESSION["user"] = $_POST["user"];
            $_SESSION["browser"] = $_SERVER["HTTP_USER_AGENT"];
            $_SESSION["address"] = $_SERVER['REMOTE_ADDR'];
    } else {
        $response["status"] = "error";
    }
} else {
    $response["status"] = "error";
}

echo json_encode($response);
