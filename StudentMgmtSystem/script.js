// Load students from Local Storage
let students =
    JSON.parse(localStorage.getItem("students")) || [];

//Removed Students
let removedStudents =
    JSON.parse(localStorage.getItem("removedStudents")) || [];

// Select Elements
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const removedStudentList = document.getElementById("removedStudentList");

// Display existing students when page loads
displayStudents();
displayRemovedStudents();

// Add Student
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        rollno: document.getElementById("rollno").value,
        dept: document.getElementById("dept").value,
        year: document.getElementById("year").value
    };

    students.push(student);

    saveToLocalStorage();

    displayStudents();

    form.reset();

    alert("Student Added Successfully");
});

// Display Students
function displayStudents() {

    studentList.innerHTML = "";

    students.forEach((student, index) => {

        studentList.innerHTML += `
        
        <div class="student-card">
        
            <h3>${student.name}</h3>
            
            <p><strong>Roll No:</strong> ${student.rollno}</p>
            
            <p><strong>Department:</strong> ${student.dept}</p>
            
            <p><strong>Year:</strong> ${student.year}</p>

            <button onclick="deleteStudent(${index})">
                Delete
            </button>

        </div>
        
        <hr>
        
        `;
    });

}

// Delete Student
function deleteStudent(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (confirmDelete) {
        removedStudents.push(students[index]);
        students.splice(index, 1);

        saveToLocalStorage();

        displayStudents();
    }
}

// Display Removed Students
function displayRemovedStudents() {

    removedStudentList.innerHTML = "";
    removedStudents.forEach((student) => {
        removedStudentList.innerHTML += `
            <div class="student-card">
                <h3>${student.name}</h3>
                <p><strong>Roll No:</strong> ${student.rollno}</p>
                <p><strong>Department:</strong> ${student.dept}</p>
                <p><strong>Year:</strong> ${student.year}</p>
            </div>
            <hr>
        `;
    });
}

// Restore Student
function restoreStudent(index) {

    students.push(removedStudents[index]);
    removedStudents.splice(index, 1);
    saveToLocalStorage();
    displayStudents();
    displayRemovedStudents();
}

//save Data
function saveToLocalStorage() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
    localStorage.setItem(
        "removedStudents",
        JSON.stringify(removedStudents)
    );
}