<?php
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';

class dataLogDAO
{
    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    public function getDatalog()
    {
        try
        {
            $sql = "SELECT * FROM datalog ORDER BY inserted_date";
            $stmt = $this->dbh->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();

            return $result;
        }
        catch(PDOException $e)
        {
            throw new Exception("Failed to retrieve datalog");
        }
    }

    public function getLastDatalog()
    {
        try
        {
            $sql = "SELECT * FROM datalog ORDER BY inserted_date DESC LIMIT 1";
            $stmt = $this->dbh->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetch();

            return $result;
        }
        catch(PDOException $e)
        {
            throw new Exception("Failed to retrieve datalog");
        }
    }

    public function addDataLog($temperature,$humidity,$lux)
    {
  
        try
        {
            $sql = 'INSERT INTO datalog(temperature,humidity,lux,inserted_date) VALUES(:temperature,:humidity,:lux,:inserted_date)';

            $stmt = $this->dbh->prepare($sql);
            $stmt->bindValue(':temperature',$temperature);
            $stmt->bindValue(':humidity',$humidity);
            $stmt->bindValue(':lux',$lux);
            $stmt->bindValue(':inserted_date',date("Y-m-d H:i:s"));
        
            $stmt->execute();
        }
        catch(PDOException $e)
        {

            throw new Exception("Failed to enter dateLog");

        }
    }
}