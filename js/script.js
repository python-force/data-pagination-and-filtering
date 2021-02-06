/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
const cardsPerPage = 9;
var buttonList = ""
var pages = 0
var students_per_page = []
var searchButton = ""
var adjustedData = data
var databaseStatus = true
const h2Element = document.getElementsByTagName('h2')[0]

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

function search() {
    cleanHTML =
        `
        <label for="search" class="student-search">
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>
        `
    h2Element.insertAdjacentHTML('afterend', cleanHTML);
    searchButton = document.getElementsByTagName("button")[0]
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function adjustData(search = "") {
    if (search) {
        searchData = []
        for (let i = 0; i < data.length ; i++) {
            let name = (data[i].name.first + " " + data[i].name.last).toLowerCase()
            searchResult = name.search(search)
            if (searchResult != -1) {
                searchData.push(data[i])
            }
        }
        adjustedData = searchData
    }
}

function calculatePages(search = "") {
    if (search) {
        adjustData(search)
    }
    if (adjustedData.length % cardsPerPage) {
        pages = Math.ceil(adjustedData.length / cardsPerPage)
        x = 0;
        y = cardsPerPage;
        for (let i = 1; i <= pages; i++) {
            if (adjustedData.length > cardsPerPage) {
                students_per_page.push(adjustedData.slice(x, y))
                x += cardsPerPage
                y += cardsPerPage
            } else {
                students_per_page.push(adjustedData.slice(0, adjustedData.length))
            }
        }
    } else {
        pages = Math.floor(adjustedData.length / cardsPerPage)
    }
    if (students_per_page.length == 0) {
        databaseStatus = false
    } else {
        return pages
    }

}

function generateData(page = 0, search = "") {
    let students = []
    for (let i = 0; i < students_per_page[page].length ; i++) {
        let profileImage = students_per_page[page][i].picture.large
        let name = students_per_page[page][i].name.first + " " + students_per_page[page][i].name.last
        let email = students_per_page[page][i].email;
        let joined = students_per_page[page][i].registered.date
        student = {name: name, email: email, joined: joined, profileImage: profileImage};
        students.push(student)
    }
    return students;
}

function generateHTML(page= 0, search = "") {
    let cleanHTML = "";
    let students = generateData(page, search)
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

function showStudents(page = 0, search = "") {
    finalHTML = generateHTML(page, search)
    document.getElementsByClassName("student-list")[0].innerHTML = finalHTML
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPageButtons(page = 1, search = "") {
    pages = calculatePages(search)
    let pageHTML = "";
    for (let i = 1; i <= pages; i++) {
        if (i === page) {
            pageHTML +=
            `
            <li>
                <button type="button" class="active">${i}</button>
            </li>
            `
        } else {
            pageHTML +=
            `
            <li>
                <button type="button" class="">${i}</button>
            </li>
            `
        }

    }
    buttonList = document.getElementsByClassName("link-list")[0]
    buttonList.innerHTML = pageHTML
}

// Call functions
search();
addPageButtons();
showStudents();

buttonList.addEventListener('click', (e) => {
    let activeElement = e.target
    if (activeElement.tagName == 'BUTTON') {
        addPageButtons(parseInt(activeElement.textContent));
        showStudents(parseInt(activeElement.textContent)-1);
        students_per_page = []
    }
    console.log(e.target)
});

searchButton.addEventListener('click', (e) => {
    console.log(e.target)
    searchContent = document.getElementById("search").value
    students_per_page = []
    adjustedData = data
    addPageButtons(1, searchContent);
    if (databaseStatus) {
        h2Element.innerHTML = "Students";
        showStudents(0, searchContent);
        students_per_page = []
    } else {
        h2Element.innerHTML = "Not found...";
        document.getElementsByClassName("student-list")[0].innerHTML = ""
        databaseStatus = true
    }


});