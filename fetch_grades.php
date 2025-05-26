<?php
require 'config.php'; // Assumes you have a DB connection here

session_start();

// You can also get the student ID from a session or request
$studentId = $_SESSION['student_id'] ?? null;

if (!$studentId) {
  http_response_code(400);
  echo 'Invalid student ID';
  exit;
}

try {
  $stmt = $conn->prepare("
    SELECT c.course_code, c.course_title, g.prelim, g.midterm, g.final, 
           ROUND((g.prelim + g.midterm + g.final)/3, 2) AS total_grade
    FROM grades g
    JOIN courses c ON g.course_id = c.id
    WHERE g.student_id = ?
  ");
  
  $stmt->bind_param("s", $studentId);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 0) {
    echo '<tr><td colspan="7" class="text-center">No grades found.</td></tr>';
  } else {
    while ($row = $result->fetch_assoc()) {
      echo "<tr>
              <td>{$row['course_code']}</td>
              <td>{$row['course_title']}</td>
              <td>{$row['prelim']}</td>
              <td>{$row['midterm']}</td>
              <td>{$row['final']}</td>
              <td>{$row['total_grade']}</td>
              <td>
                <i class='fas fa-edit edit-grade-btn' 
                   data-course='{$row['course_title']}' 
                   data-code='{$row['course_code']}'
                   data-prelim='{$row['prelim']}' 
                   data-midterm='{$row['midterm']}' 
                   data-final='{$row['final']}'>
                </i>
              </td>
            </tr>";
    }
  }

  $stmt->close();
  $conn->close();
} catch (Exception $e) {
  http_response_code(500);
  echo 'Error fetching grades: ' . $e->getMessage();
}
