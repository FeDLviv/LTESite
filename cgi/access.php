<?php

session_start();
if (!isset($_SESSION["user"]) || $_SESSION["browser"] != $_SERVER["HTTP_USER_AGENT"] || $_SESSION["address"] != $_SERVER["REMOTE_ADDR"]) {
    header("HTTP/1.1 401 Unauthorized");
    session_unset();
    session_destroy();
    die("Access allowed only for registered users");
}