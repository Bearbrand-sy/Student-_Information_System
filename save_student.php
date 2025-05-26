<?php
// save_student.php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];
    $year = $_POST['year_level'];

    $stmt = $conn->prepare("INSERT INTO students (name, email, course, year_level) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $course, $year);

    if ($stmt->execute()) {
        header("Location: admin_add_student.php?success=1");
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
