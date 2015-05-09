<?php
class DatabasePDO
{
    private static $dbh;

    public static function getInstance()
    {
        $dsn = Config::DB_TYPE . ':host=' . Config::DB_HOST . ';dbname=' . Config::DB_NAME;
        try
        {
            self::$dbh = new PDO($dsn, Config::DB_USER, Config::DB_PASS);
        }
        catch(PDOException $e)
        {
            throw new Exception("Database not found");
            die();
        }

        return self::$dbh;
    }
}

?>