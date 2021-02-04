/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function generateData() {
    let students = []
    for (let i = 0; i < data.length; i++) {
        let profileImage = "";
        let name = "";
        let email = "";
        let joined = "";
        for (let [key, value] of Object.entries(data[i])) {
            if (key === "email") {
                email = value;
            } else if (key === "email") {
                name = value.first + " " + value.last
            } else if (key === "registered") {
                joined = value.date
            } else if (key === "picture") {
                profileImage = value.large
            }
        }
        student = {name: name, email: email, joined: joined, profileImage: profileImage};
        students.push(student)
    }
    return students;
}

function generateHTML() {
    let cleanHTML = "";
    let students = generateData()
    for (let i = 0; i < students.length; i++) {
        cleanHTML +=
        `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${students[i].profileImage}" alt="${students[i].name}">
            <h3>${students[i].name}</h3>
            <span class="email">${students[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${students[i].joined}</span>
          </div>
        </li>
        `
    }
    return cleanHTML;
}


function showStudents() {
    finalHTML = generateHTML()
    document.getElementsByClassName("student-list")[0].innerHTML = finalHTML
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showStudents();