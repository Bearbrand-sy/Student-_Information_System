<?php
$host = "localhost";         // Database host
$user = "root";              // Database username
$pass = "";                  // Database password
$dbname = "Student_System";  // Database name

// Create a new MySQLi connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
