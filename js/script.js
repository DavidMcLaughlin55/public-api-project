//GLOBAL VARIABLES
const randomUserAPI = 'https://randomuser.me/api/?results=12';

const employeeDirectory = document.getElementById('employee-directory');
const overlay = document.querySelector('.overlay');
const employeeModal = document.querySelector('.employee-modal')
const employeeOverlayContent = document.querySelector('.employee-modal-content');
const overlayBtn = document.querySelector('.close-modal');



//API CONNECTION

fetch(randomUserAPI)
    .then(response => response.json())
    .then(data => data.results)
    .then(generateEmployees)
    .catch(error => console.log(error))

//FUNCTIONS 

/* generateEmployee function
-Generates employee to be displayed on card along with their details / contact information.
*/

function generateEmployees(data) {

    employees = data;
    console.log(employees);
    let employeesHTML = '';


    employees.forEach(employee => {
        let picture = employee.picture;
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;

        employeesHTML += `
        <div class="card">
            <img class="avatar" src="${picture.medium}" alt="member" />
            <div class="employee-info">
                <h2 class="name">${firstName} ${lastName}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}, ${state}</p>
            </div>
        </div>
    `
    });

    employeeDirectory.innerHTML = employeesHTML;
}

/* generateModal function
-Generates modal for employee user clicked on to provide further detailed information.
*/

/*
function generateModal(employee) {
    const modalHTML = `
    <img class="avatar" src="${}" alt="member">
    <div class="employee-info">
        <h2 class="name">${} ${}</h2>
        <p class="email">${}</p>
        <p class="address">${}, ${}</p>
        </hr>
        <p>${}</p>
        <p>${}</p>
    `;

}

*/