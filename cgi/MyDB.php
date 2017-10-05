<?php

class MyDB {

    const HOST = "localhost";
    const DB = "lte_energo";
    const USER = "wges";
    const PASSWORD = "1111";

    private static $instance = null;
    
    private $pdo;

    public static function getInstance()
    {
        if (self::$instance === null)
        {
            self::$instance = new self;
        }
        return self::$instance;
    }

    private function __construct() {
        try {
            $this->pdo = new PDO("mysql:host=".MyDB::HOST.";dbname=".MyDB::DB.";charset=utf8", MyDB::USER, MyDB::PASSWORD);        
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo $e->getMessage();
            die();
        }
    }

    public function select($query) {
        try {
            if(count(func_get_args()) == 1) {
                $statement = $this->pdo->query($query);
                $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                return json_encode($rows, JSON_NUMERIC_CHECK);
            } else {
                $statement = $this->pdo->prepare($query);
                $parametrs = [];
                for ($i = 1; $i < func_num_args(); $i++) {
                    $parametrs[] = func_get_arg($i);
                }
                $statement->execute($parametrs);
                $data = $statement->fetchAll(PDO::FETCH_ASSOC);
                return json_encode($data, JSON_NUMERIC_CHECK);
            }
        } catch (PDOException $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo $e->getMessage();
            die();
        }
    }

}
    //$statement = $pdo->query("SELECT * FROM objects;");
    //while($row = $statement->fetch(PDO::FETCH_ASSOC)){
    //    echo "{$row['address']}<br>";
    //}
?>

