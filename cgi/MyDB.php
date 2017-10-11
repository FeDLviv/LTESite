<?php

/**
 * Клас синглтон для роботи з базою даних
 */
class MyDB
{
    
    const HOST = "localhost";
    const DB = "lte_energo";
    const USER = "wges";
    const PASSWORD = "1111";

    private static $instance = null;
    
    private $pdo;

    /**
     * Статичний метод, котрий повертає об'єкт даного класу
     *
     * @return MyDB $instance 
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    private function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=".MyDB::HOST.";dbname=".MyDB::DB.";charset=utf8", MyDB::USER, MyDB::PASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo $e->getMessage();
            exit();
        }
    }

    private function __clone() {
        
    }

    private function __wakeup() {
        
    }

    /**
     * Метод відправляє SELECT запит до бази даних
     *
     * @param string $query Запит до бази даних
     * @param bool $json Чи повертати результат запиту до бази даних в JSON форматі
     * @return Повертає результат запиту до бази даних
     */
    public function select($query, $isJson)
    {
        try {
            if (count(func_get_args()) == 2) {
                $statement = $this->pdo->query($query);
                $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $isJson ? json_encode($rows, JSON_NUMERIC_CHECK) : $rows;
            } else {
                $statement = $this->pdo->prepare($query);
                $parametrs = [];
                for ($i = 2; $i < func_num_args(); $i++) {
                    $parametrs[] = func_get_arg($i);
                }
                $statement->execute($parametrs);
                $data = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $isJson ? json_encode($data, JSON_NUMERIC_CHECK) : $data;
            }
        } catch (PDOException $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo $e->getMessage();
            exit();
        }
    }
}
