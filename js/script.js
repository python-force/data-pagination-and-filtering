/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Set how many students visible per page
const cardsPerPage = 9;

// Buttons - represents how many pages
var buttonList = "";

// Init state for pages
var pages = 0

// Init state fpr students per page (by search or by database)
var students_per_page = []

// Not to change initial data, working with search data
var adjustedData = data

// Instance variable in case no students found
var databaseStatus = true

// Title of the page used as well for Not found message
const h2Element = document.getElementsByTagName('h2')[0]

// Init state for search button
var searchButton = ""

// Init state for search button
var searchBox = ""

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Search input:
   Placing search input to the page
   Selecting search button
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
    searchBox = document.getElementById("search")
}

/*
`showPage` function:
   Placing search input to the page
   Selecting search button
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


/*
`calculatePages` function:
    If search is being used - use adjustData function to adjust pool of students to use
    If pagination is used - use entire pool of data
    Once pool is being selected:
        Add students per page array to students_per_page list
*/
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

/*
`generateData` function:
   Set proper data for each student - preparation for HTML
*/
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

/*
`generateHTML` function:
   Final result of students (search or buttons) - generating HTML
*/
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

/*
`showPage` function:
   Consisting of more functions for individual task
   Append final result number of students and final HTML to a page
*/
function showPage(page = 0, search = "") {
    finalHTML = generateHTML(page, search)
    document.getElementsByClassName("student-list")[0].innerHTML = finalHTML
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(page = 1, search = "") {
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
// Add search to page
search();

// Add pagination to page
addPagination();

// Add students to page or Not found
showPage();


/*
Event listener for UL filtering only buttons
Click event just for the buttons and not whitespace between them
*/
buttonList.addEventListener('click', (e) => {
    let activeElement = e.target
    if (activeElement.tagName == 'BUTTON') {
        addPagination(parseInt(activeElement.textContent));
        showPage(parseInt(activeElement.textContent)-1);
        students_per_page = []
    }
    console.log(e.target)
});


/*
showResults function for event listeners Button Search and Search input
*/
function showResults() {
    searchContent = document.getElementById("search").value.toLowerCase()
    students_per_page = []
    adjustedData = data
    addPagination(1, searchContent);
    if (databaseStatus) {
        h2Element.innerHTML = "Students";
        showPage(0, searchContent);
        students_per_page = []
    } else {
        h2Element.innerHTML = "Not found...";
        document.getElementsByClassName("student-list")[0].innerHTML = ""
        databaseStatus = true
    }
}

/*
Event listener for search button
Able to search lowercase / uppercase scenarios
Take care of not found exception
*/
searchButton.addEventListener('click', (e) => {
    // console.log(e.target)
    showResults()
});

/*
Event listener for search button
Able to search lowercase / uppercase scenarios
Take care of not found exception
*/
searchBox.addEventListener('keyup', (e) => {
    // console.log(e.target)
    showResults()
});

