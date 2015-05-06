<?php 


// DB Object functions
// -------------------
// __construct($DB_credentials)
// connect()
// disconnect()
// query($query,$array = true )

// EmptyTable($table)
// Print_R($queryArray,$strip=true) /// prints an formatted array better than Print_r
// better_Print_R($queryArray,$strip=true) /// prints an formatted array better than Print_r
// array_by_primaryKey($query,$primaryKey) /// makes a primary key the name of the row in array
// Pile_array_by_primaryKey($query,$primaryKey) /// makes a primary key the name of the row in array
// getTableFeildNames($table)
// returnArray($resource)
// StripNumbersArray($array) // strips away all the numbers from the mysql_fetch_array 
// DescribeTable($table)
// SanatizeMySQL($String)
// SanatizeHMTL($string)
// queryToTable($Query)





class DB
{
    
    private $host;
    private $user;
    private $pass;
    private $DB_name;
    
    protected $con;
     
    public function __construct($DB_credentials)
    {
        $this->host     =    $DB_credentials['host'];
        $this->user     =    $DB_credentials['user'];
        $this->pass     =    $DB_credentials['pass'];
        $this->DB_name  =    $DB_credentials['DB_name'];

        $this->con = false; // Starts without a connection.
    } 
        
    public function connect()
    {
        if(!$this->con) // check if connected already
        {
            $this->con = mysql_connect( $this->host,
                                        $this->user, 
                                        $this->pass  ) OR 

            die("MySQL connection failed: " . mysql_error()); 
            
            mysql_select_db($this->DB_name)OR 

            die("MySQL connection failed select DB: " . mysql_error()); ;
        }  
    }
 
    public function disconnect()
    { 
        if($this->con) // check if connected already
        {
            mysql_close($this->con) OR die("MySQL disconnect failed: " . mysql_error()); 
            $this->con = false; // tells connect its closed
        }
    }
 
    public function query($query,$array = true )
    {
            
       $result = mysql_query($query) OR die("MySQL query failed: " . mysql_error());
      

       if ($array) // if the user wants an array or sql resource.
       {
           $result = $this->returnArray($result);
       }   
   
       return  $result;

    }

    public function EmptyTable($table)
    {
        $this->connect();
        $this->query('DELETE FROM '.$table,false);
        $this->disconnect();
    }









    // Genral Functions
    //==========================================
    public function Print_R($queryArray,$strip=true) /// prints an formatted array better than Print_r
    {
        if($strip){$queryArray =  $this->StripNumbersArray($queryArray);}

        echo '<pre>'; print_r($queryArray); echo '</pre>';

    }

    public function better_Print_R($queryArray,$strip=true) /// prints an formatted array better than Print_r
    {

        if($strip){$queryArray =  $this->StripNumbersArray($queryArray);}


        foreach ($queryArray as $row => $colum1) 
        {

            print "<br/>----------------------------------------------------------------------------------------------------------<br/>";
            print "<b>&nbsp;&nbsp; Row: ".$row."</b>";
            print "<br/>----------------------------------------------------------------------------------------------------------<br/>";

            foreach ($queryArray[$row] as $colum => $result) 
            {        
              print "&nbsp;&nbsp;&nbsp;".$colum." =>".$result;
              print "<br/>";
            }
            

       }
    }

      public function array_by_primaryKey($query,$primaryKey) /// makes a primary key the name of the row in array
    {
        foreach ($query as $row => $array) 
          {
            $query[$array[$primaryKey]] = $query[$row];
            unset($query[$row]);
          }
        return $query;
    }


      public function Pile_array_by_primaryKey($query,$primaryKey) /// makes a primary key the name of the row in array
    {
        foreach ($query as $row => $array) 
          {
            $query[$array[$primaryKey]][$row] = $query[$row];
            
            unset($query[$row]);
          }
        return $query;
    }




    private function getTableFeildNames($table)
    {
            
       $table = $this->DescribeTable($table);

       $Feilds = array();

       foreach ($table as $key => $value) 
       {

         array_push($Feilds , $table[$key]['Field']);

       }




     return $Feilds;
    }



    public function returnArray($resource)
    {
        $array = array();    // array to fill    

        while ($row = mysql_fetch_array($resource)) // for each row in table
        { 
            array_push($array, $row ); // add to array
        }
        
        return $array;
    }
   

    


    public function StripNumbersArray($array) // strips away all the numbers from the mysql_fetch_array 
    { 
            foreach ($array as $row => $second_array) 
            {
                   foreach ($second_array as $colum => $colum_value)
                   {
                        // print'<br/>Key : '.$second_array.'['.$colum.'] = '.$colum_value; // Test

                        if(is_numeric($colum))
                        {  unset($array[$row][$colum]);   } // if key is number drop from array
                   } 
            }

            return $array;

    }

    public function DescribeTable($table)
    {
            $array =  $this->query('Describe '.$table);   
            return $array;
    }




// Santization Scripts 
// ==================================== 

  public function SanatizeMySQL($String)
    {
        $String = mysql_real_escape_string($String);
        $String = $this->SanatizeHMTL($String);

        return $String;
    }


    // Takes a string and escapes all hazadous charecters then returns string
    public function SanatizeHMTL($string)
    { 
        if (get_magic_quotes_gpc()) // if server is configerd for magiv quotes
        {
            $string = stripslashes($string); 
        }

        $string = htmlentities($string);
        $string = strip_tags($string);

        return $string;
    }








function queryToTable($Query)
{
       $this->connect();
       $query  = $this->StripNumbersArray($this->query($Query));
       $this->disconnect();

       $query_Length =  count($query);
 
       $x  = '<b>'.$query_Length.'</b> rows found';
       $x .= "<table width='100%' style='text-align:center;' >"; // x = Output

       $x .= "<tr style='background:black; color:white;' >\n";
        

        //Head   
        foreach($query[0] as $colum => $colum_value  ) 
        {
        $x .=   "<th>".$colum."</th>\n";
        }

        $x .= "</tr>";

        //Row
        foreach ($query as $row) 
        {
          $x .= "<tr>";
          
          foreach ($row as $colum => $colum_value) 
          {
          $x .= "<td>".$colum_value."</td>\n";
          }

          $x .= "</tr>\n";
        }


       return $x;
}   








}






?>