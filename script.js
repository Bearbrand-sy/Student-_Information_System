 $(document).ready(function() {
      // Login Form Validation
      $('#login-form').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const studentId = $('#studentId').val().trim();
        const password = $('#password').val().trim();
        
        // Validate Student ID
        if (!studentId) {
          $('#studentId').addClass('is-invalid input-error-shake');
          isValid = false;
        } else {
          $('#studentId').removeClass('is-invalid input-error-shake');
        }
        
        // Validate Password
        if (!password) {
          $('#password').addClass('is-invalid input-error-shake');
          isValid = false;
        } else {
          $('#password').removeClass('is-invalid input-error-shake');
        }
        
        if (isValid) {
          // Simulate login API call
          loginUser(studentId, password);
        }
      });
      
      // Logout functionality
      $('#logout-link').on('click', function() {
        $('#login-container').show();
        $('#dashboard-container').hide();
        $('#studentId').val('');
        $('#password').val('');
        $('#login-error').addClass('hidden');
      });
      
      // Handle tab switching - load data when tab is shown
      $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
        const targetId = $(e.target).attr('href');
        
        if (targetId === '#courses') {
          loadCourses();
        } else if (targetId === '#grades') {
          loadGrades();
        } else if (targetId === '#progress') {
          loadProgressCharts();
        } else if (targetId === '#assignments') {
          loadAssignments();
          loadDiscussions();
        }
      });
      
      // Open Edit Grade Modal
      $(document).on('click', '.edit-grade-btn', function() {
        const courseId = $(this).data('course-id');
        const courseName = $(this).data('course-name');
        const termType = $(this).data('term-type');
        const termName = $(this).data('term-name');
        const currentValue = $(this).data('current-value');
        
        $('#edit-course-id').val(courseId);
        $('#edit-course-name').val(courseName);
        $('#edit-term-type').val(termType);
        $('#edit-term-name').val(termName);
        $('#edit-grade-value').val(currentValue);
        
        const editGradeModal = new bootstrap.Modal(document.getElementById('editGradeModal'));
        editGradeModal.show();
      });
      
      // Save Grade Changes
      $('#save-grade-btn').on('click', function() {
        const courseId = $('#edit-course-id').val();
        const termType = $('#edit-term-type').val();
        const gradeValue = $('#edit-grade-value').val();
        
        if (gradeValue >= 0 && gradeValue <= 100) {
          updateGrade(courseId, termType, gradeValue);
          const editGradeModal = bootstrap.Modal.getInstance(document.getElementById('editGradeModal'));
          editGradeModal.hide();
        } else {
          // Show validation error
          $('#edit-grade-value').addClass('is-invalid');
        }
      });
      
      // Assignment Upload Form
      $('#assignment-upload-form').on('submit', function(e) {
        e.preventDefault();
        
        const assignmentId = $('#assignment-select').val();
        const file = $('#assignment-file')[0].files[0];
        const comments = $('#assignment-comments').val();
        
        if (assignmentId && file) {
          submitAssignment(assignmentId, file, comments);
        }
      });
      
      // Post Discussion Message
      $('#post-discussion-form').on('submit', function(e) {
        e.preventDefault();
        
        const message = $('#discussion-message').val().trim();
        
        if (message) {
          postDiscussionMessage(message);
          $('#discussion-message').val('');
        }
      });
      
      // === API Functions ===
      
      // Login User
      function loginUser(studentId, password) {
        $('#login-error').addClass('hidden').removeClass('login-error-enhanced');
        
        // Simulate API call with a delay
        setTimeout(function() {
          if (studentId === "20231969" && password === "12345") {
            $('#login-container').hide();
            $('#dashboard-container').show();
            loadStudentProfile();
            loadCourses();
          } else {
            $('#studentId, #password').addClass('input-error-shake');
            $('#login-error').removeClass('hidden')
              .addClass('login-error-enhanced')
              .text('Login failed: The Student ID or Password you entered is incorrect. Please use \'12345\' as Student ID and \'password\' as Password for testing.');
          }
        }, 1000);
      }
      
      // Load Student Profile
      function loadStudentProfile() {
        // Simulate API call with a delay
        setTimeout(function() {
          // This would be replaced with actual API data in the full implementation
          $('#student-name').text('Sander Perejan');
          $('#student-id').text('ID: 20231969');
          $('#student-program').text('Bachelor of Science in Information Technology');
          $('#student-department').text('Institute of Computer Studies');
          $('#student-email').text('20231969@nbsc.edu.ph');
          $('#student-phone').text('09922118799');
          $('#student-address').text('New Corales, Agusan Canyon, Manolo Fortich, Bukidnon');
          $('#academic-year').text('2024-2025');
        }, 1000);
      }
      
      // Load Courses
      function loadCourses() {
        $('#courses-table-body').html(`
          <tr>
            <td colspan="6" class="text-center">
              <div class="loading-spinner"></div> Loading courses...
            </td>
          </tr>
        `);
        
        // Simulate API call with a delay
        setTimeout(function() {
          // This would be replaced with actual API data in the full implementation
          $('#courses-table-body').html(`
            <tr>
              <td>CS301</td>
              <td>Advanced Programming</td>
              <td>Dr. Sarah Johnson</td>
              <td>Mon, Wed, Fri 10:00-11:30 AM</td>
              <td>Engineering Building, Room 205</td>
              <td>4</td>
            </tr>
            <tr>
              <td>MATH250</td>
              <td>Linear Algebra</td>
              <td>Prof. Michael Chen</td>
              <td>Tue, Thu 1:00-2:30 PM</td>
              <td>Science Center, Room 110</td>
              <td>3</td>
            </tr>
            <tr>
              <td>ENG210</td>
              <td>Technical Writing</td>
              <td>Dr. Emily Rodriguez</td>
              <td>Wed 3:00-5:30 PM</td>
              <td>Liberal Arts Building, Room 302</td>
              <td>3</td>
            </tr>
            <tr>
              <td>CS350</td>
              <td>Database Systems</td>
              <td>Prof. David Wilson</td>
              <td>Mon, Fri 1:00-2:30 PM</td>
              <td>Engineering Building, Room 105</td>
              <td>4</td>
            </tr>
            <tr>
              <td>PHYS201</td>
              <td>Physics for Engineers</td>
              <td>Dr. Robert Lee</td>
              <td>Tue, Thu 9:00-10:30 AM</td>
              <td>Science Center, Room 220</td>
              <td>4</td>
            </tr>
          `);
          
          showToast('success', 'Courses loaded successfully');
        }, 1500);
      }
      
      // Load Grades
      function loadGrades() {
        $('#grades-table-body').html(`
          <tr>
            <td colspan="7" class="text-center">
              <div class="loading-spinner"></div> Loading grades...
            </td>
          </tr>
        `);
        
        // Simulate API call with a delay
        setTimeout(function() {
          // This would be replaced with actual API data in the full implementation
          $('#grades-table-body').html(`
            <tr>
              <td>CS301</td>
              <td>Advanced Programming</td>
              <td>85</td>
              <td>88</td>
              <td>90</td>
              <td>88</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary edit-grade-btn" data-course-id="CS301" data-course-name="Advanced Programming" data-term-type="prelim" data-term-name="Prelim" data-current-value="85">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>MATH250</td>
              <td>Linear Algebra</td>
              <td>78</td>
              <td>82</td>
              <td>85</td>
              <td>82</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary edit-grade-btn" data-course-id="MATH250" data-course-name="Linear Algebra" data-term-type="prelim" data-term-name="Prelim" data-current-value="78">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>ENG210</td>
              <td>Technical Writing</td>
              <td>90</td>
              <td>92</td>
              <td>88</td>
              <td>90</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary edit-grade-btn" data-course-id="ENG210" data-course-name="Technical Writing" data-term-type="prelim" data-term-name="Prelim" data-current-value="90">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>CS350</td>
              <td>Database Systems</td>
              <td>83</td>
              <td>85</td>
              <td>87</td>
              <td>85</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary edit-grade-btn" data-course-id="CS350" data-course-name="Database Systems" data-term-type="prelim" data-term-name="Prelim" data-current-value="83">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>PHYS201</td>
              <td>Physics for Engineers</td>
              <td>75</td>
              <td>80</td>
              <td>82</td>
              <td>79</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary edit-grade-btn" data-course-id="PHYS201" data-course-name="Physics for Engineers" data-term-type="prelim" data-term-name="Prelim" data-current-value="75">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                </div>
              </td>
            </tr>
          `);
          
          showToast('success', 'Grades loaded successfully');
        }, 500); // Changed from 1500 to 500 to speed up grades loading
      }
      
  
      
      // Load Assignments
      function loadAssignments() {
        $('#assignments-table-body').html(`
          <tr>
            <td colspan="5" class="text-center">
              <div class="loading-spinner"></div> Loading assignments...
            </td>
          </tr>
        `);
        
        // Simulate API call with a delay
        setTimeout(function() {
          // This would be replaced with actual API data in the full implementation
          $('#assignments-table-body').html(`
            <tr>
              <td>CS301</td>
              <td>Homework 3: Algorithm Implementation</td>
              <td>Oct 15, 2023 (11:59 PM)</td>
              <td><span class="badge bg-warning">Pending</span></td>
              <td>
                <button class="btn btn-sm btn-outline-primary" onclick="window.location.href='#assignments'">
                  <i class="fas fa-upload"></i> Submit
                </button>
              </td>
            </tr>
            <tr>
              <td>MATH250</td>
              <td>Midterm Project: Matrix Analysis</td>
              <td>Oct 20, 2023 (11:59 PM)</td>
              <td><span class="badge bg-warning">Pending</span></td>
              <td>
                <button class="btn btn-sm btn-outline-primary" onclick="window.location.href='#assignments'">
                  <i class="fas fa-upload"></i> Submit
                </button>
              </td>
            </tr>
            <tr>
              <td>ENG210</td>
              <td>Essay: Technical Documentation</td>
              <td>Oct 10, 2023 (11:59 PM)</td>
              <td><span class="badge bg-success">Submitted</span></td>
              <td>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="fas fa-eye"></i> View
                </button>
              </td>
            </tr>
            <tr>
              <td>CS350</td>
              <td>Lab 4: Database Design</td>
              <td>Oct 18, 2023 (11:59 PM)</td>
              <td><span class="badge bg-warning">Pending</span></td>
              <td>
                <button class="btn btn-sm btn-outline-primary" onclick="window.location.href='#assignments'">
                  <i class="fas fa-upload"></i> Submit
                </button>
              </td>
            </tr>
            <tr>
              <td>PHYS201</td>
              <td>Problem Set 5</td>
              <td>Oct 8, 2023 (11:59 PM)</td>
              <td><span class="badge bg-danger">Late</span></td>
              <td>
                <button class="btn btn-sm btn-outline-primary" onclick="window.location.href='#assignments'">
                  <i class="fas fa-upload"></i> Submit
                </button>
              </td>
            </tr>
          `);
          
          showToast('success', 'Assignments loaded successfully');
        }, 1000);
      }
      
      // Load Discussions
      function loadDiscussions() {
        $('#discussion-board').html(`<div class="loading-spinner mb-2"></div> Loading discussions...`);
        
        // Simulate API call with a delay
        setTimeout(function() {
          // This would be replaced with actual API data in the full implementation
          $('#discussion-board').html(`
            <div class="discussion-thread mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-circle" width="32" height="32">
                </div>
                <div class="flex-grow-1 ms-2">
                  <div class="fw-bold">Dr. Sarah Johnson <small class="text-muted">3 days ago</small></div>
                  <p>Don't forget to submit your CS301 assignments by Friday! Office hours are extended this week.</p>
                  <div>
                    <button class="btn btn-sm btn-link text-decoration-none reply-btn" data-thread-id="1">Reply</button>
                  </div>
                  
                  <div class="ms-4 mt-2">
                    <div class="d-flex mt-2">
                      <div class="flex-shrink-0">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-circle" width="24" height="24">
                      </div>
                      <div class="flex-grow-1 ms-2">
                        <div class="fw-bold">Alice Walker <small class="text-muted">2 days ago</small></div>
                        <p>Will the slides from today's lecture be posted online?</p>
                      </div>
                    </div>
                    
                    <div class="d-flex mt-2">
                      <div class="flex-shrink-0">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-circle" width="24" height="24">
                      </div>
                      <div class="flex-grow-1 ms-2">
                        <div class="fw-bold">Dr. Sarah Johnson <small class="text-muted">2 days ago</small></div>
                        <p>Yes, they'll be posted by this evening.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="discussion-thread mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-circle" width="32" height="32">
                </div>
                <div class="flex-grow-1 ms-2">
                  <div class="fw-bold">Tom Garcia <small class="text-muted">1 day ago</small></div>
                  <p>Is anyone interested in forming a study group for the upcoming MATH250 exam?</p>
                  <div>
                    <button class="btn btn-sm btn-link text-decoration-none reply-btn" data-thread-id="2">Reply</button>
                  </div>
                  
                  <div class="ms-4 mt-2">
                    <div class="d-flex mt-2">
                      <div class="flex-shrink-0">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-circle" width="24" height="24">
                      </div>
                      <div class="flex-grow-1 ms-2">
                        <div class="fw-bold">Maria Chen <small class="text-muted">1 day ago</small></div>
                        <p>I'm interested! We could meet at the library this weekend.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `);
          
          showToast('success', 'Discussions loaded successfully');
        }, 1200);
      }
      
      // Update Grade
      function updateGrade(courseId, termType, gradeValue) {
        showToast('info', 'Saving grade update...');
        
        // Simulate API call with a delay
        setTimeout(function() {
          // In the full implementation, this would be an actual API call
          // For now, we'll just reload the grades tab to simulate the update
          loadGrades();
          
          showToast('success', 'Grade updated successfully');
        }, 1000);
      }
      
      // Submit Assignment
      function submitAssignment(assignmentId, file, comments) {
        showToast('info', 'Uploading assignment...');
        
        // Simulate API call with a delay
        setTimeout(function() {
          // In the full implementation, this would be an actual API call
          showToast('success', 'Assignment submitted successfully');
          
          // Reload assignments to reflect changes
          loadAssignments();
        }, 1500);
      }
      
      // Post Discussion Message
      function postDiscussionMessage(message) {
        showToast('info', 'Posting message...');
        
        // Simulate API call with a delay
        setTimeout(function() {
          // In the full implementation, this would be an actual API call
        
          // Add the new message to the discussion board (client-side update)
          const newMessageHtml = `
            <div class="discussion-thread mb-3">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" class="rounded-circle" width="32" height="32">
                </div>
                <div class="flex-grow-1 ms-2">
                  <div class="fw-bold">Sander Perejan <small class="text-muted">Just now</small></div>
                  <p>${message}</p>
                  <div>
                    <button class="btn btn-sm btn-link text-decoration-none reply-btn" data-thread-id="new">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          $('#discussion-board').prepend(newMessageHtml);
          showToast('success', 'Message posted successfully');
        }, 800);
      }
      
      // Helper function to show toast messages
      function showToast(type, message) {
        const toastId = 'toast-' + Date.now();
        const toastClass = type === 'success' ? 'bg-success' : 
                           type === 'error' ? 'bg-danger' : 
                           type === 'info' ? 'bg-info' : 'bg-primary';
        
        const toastHtml = `
          <div id="${toastId}" class="toast ${toastClass} text-white" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">CampusTrack SIS</strong>
              <small>Now</small>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              ${message}
            </div>
          </div>
        `;
        
        $('.toast-container').append(toastHtml);
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
        toast.show();
        
        // Clean up the toast after it's hidden
        toastElement.addEventListener('hidden.bs.toast', function() {
          $(toastElement).remove();
        });
      }
    });

   document.addEventListener("DOMContentLoaded", () => {
  const subjectItems = document.querySelectorAll(".subject-item");
  const formSection = document.getElementById("formSection");
  const subjectNameDisplay = document.getElementById("subjectName");
  const evaluationForm = document.getElementById("evaluationForm");

  let currentSubjectElement = null;

  subjectItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      currentSubjectElement = item;
      const subject = item.getAttribute("data-subject");
      subjectNameDisplay.textContent = subject;
      evaluationForm.reset();
      formSection.classList.remove("d-none");

      // Clear all previous selections from question blocks
      document.querySelectorAll('.question-block').forEach(qBlock => {
        qBlock.querySelectorAll('.option-list li').forEach(li => li.classList.remove('selected'));
        qBlock.querySelector('input[type="hidden"]').value = "";
      });
    });
  });

  evaluationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation: check all hidden inputs have values
    const unanswered = [...evaluationForm.querySelectorAll('.question-block input[type="hidden"]')].some(input => input.value === "");
    if (unanswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    if (currentSubjectElement) {
      const badge = currentSubjectElement.querySelector(".badge");
      badge.classList.remove("d-none");
      formSection.classList.add("d-none");
      alert(`Evaluation submitted for ${subjectNameDisplay.textContent}`);
    }
  });

  document.querySelectorAll('.question-block').forEach(qBlock => {
  const options = qBlock.querySelectorAll('.option-list li');
  const hiddenInput = qBlock.querySelector('input[type="hidden"]');

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      hiddenInput.value = option.getAttribute('data-value');
    });
  });
});
});


 const subjects = [
    { id: 'cs101', name: 'CS101 - Introduction to Computer Science' },
    { id: 'math250', name: 'MATH250 - Calculus II' },
    { id: 'phy100', name: 'PHY100 - General Physics' },
  ];

  const subjectListEl = document.getElementById('subjectList');
  const subjectModalEl = document.getElementById('subjectModal');
  const videoCallModalEl = document.getElementById('videoCallModal');
  let jitsiApi = null;

  // Populate subject list
  function loadSubjects() {
    subjectListEl.innerHTML = '';
    subjects.forEach(subject => {
      const li = document.createElement('li');
      li.className = 'list-group-item list-group-item-action';
      li.textContent = subject.name;
      li.style.cursor = 'pointer';
      li.onclick = () => joinCall(subject.id);
      subjectListEl.appendChild(li);
    });
  }

  // Call joinCall on subject click
  function joinCall(subjectId) {
    // Hide subject modal
    const bsSubjectModal = bootstrap.Modal.getInstance(subjectModalEl);
    bsSubjectModal.hide();

    // When subject modal fully hidden, show video call modal
    subjectModalEl.addEventListener('hidden.bs.modal', function onHidden() {
      // Remove this listener after first call
      subjectModalEl.removeEventListener('hidden.bs.modal', onHidden);

      // Show video call modal
      const bsVideoModal = new bootstrap.Modal(videoCallModalEl);
      bsVideoModal.show();

      // Start Jitsi call with subject id as room name
      startCall(subjectId);
    });
  }

  // Initialize Jitsi call
  function startCall(roomName) {
    if (jitsiApi) {
      jitsiApi.dispose();
      jitsiApi = null;
    }
    const domain = "meet.jit.si";
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: document.getElementById("jitsiContainer"),
      configOverwrite: {
        disableDeepLinking: true,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: "#ffffff",
      }
    };
    jitsiApi = new JitsiMeetExternalAPI(domain, options);
  }

  // End call and clean up
  function endCall() {
    if (jitsiApi) {
      jitsiApi.dispose();
      jitsiApi = null;
    }
    // Clear jitsi container content
    document.getElementById("jitsiContainer").innerHTML = '';
  }

  // Load subjects on page load
  document.addEventListener('DOMContentLoaded', () => {
    loadSubjects();
  });

  // Clean up when video call modal closes
  videoCallModalEl.addEventListener('hidden.bs.modal', () => {
    endCall();
  });

  videoCallModalEl.addEventListener('hidden.bs.modal', () => {
  endCall();
});

function endCall() {
  if (jitsiApi) {
    jitsiApi.dispose();
    jitsiApi = null;
  }
  document.getElementById("jitsiContainer").innerHTML = '';
}

// Call endCall when modal closes (X, backdrop click, ESC)
document.getElementById('videoCallModal').addEventListener('hidden.bs.modal', () => {
  endCall();
});