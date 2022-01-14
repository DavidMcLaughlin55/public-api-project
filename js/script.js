//GLOBAL VARIABLES
const randomUserAPI = 'https://randomuser.me/api/?results=12';

const employeeDirectory = document.getElementById('employee-directory');
const overlay = document.querySelector('.overlay');
const employeeModal = document.querySelector('.employee-modal')
const overlayBtn = document.querySelector('.close-modal');

let employees = [];

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
    let employeesHTML = '';


    employees.forEach((employee, index) => {

        let picture = employee.picture;
        let firstName = employee.name.first;
        let lastName = employee.name.last;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;

        employeesHTML += `
        <div class="card" index="${index}">
            <img class="avatar" src="${picture.large}" alt="member" />
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

function generateModal(index) {
    console.log(index);

    let employee = employees[index];
    console.log(employee);

    let picture = employee.picture;
    let firstName = employee.name.first;
    let lastName = employee.name.last;
    let email = employee.email;
    let street = employee.location.street;
    let city = employee.location.city;
    let state = employee.location.state;
    let postalCode = employee.location.postcode;
    let phone = employee.phone;
    let date = new Date(employee.dob.date);

    console.log(street.name);
    console.log(date);


    const modalHTML = `
    <img class="avatar" src="${picture.large}" alt="member" />
    <div class="contact-info">
        <h2 class="name">${firstName} ${lastName}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        </hr>
        <p class="phone">${phone}</p>
        <p class="full-address">${street.number} ${street.name}, ${city}, ${state}, ${postalCode}</p>
        <p class="birthdate">Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;

    overlay.classList.remove('hidden');
    employeeModal.innerHTML = modalHTML;
}

/* selectEmployee function
-When employee card is clicked the index is found and passed into generateModal function
*/

function selectEmployee(e) {
    if (e.target !== employeeDirectory) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('index');
        generateModal(index);
    }
}

employeeDirectory.addEventListener('click', selectEmployee)
overlayBtn.addEventListener('click', () => overlay.classList.add('hidden'));