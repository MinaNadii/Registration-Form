//^ Calling Element
var userName = document.getElementById("userName");
var userPhone = document.getElementById("userPhone");
var userEmail = document.getElementById("userEmail");
var userAddress = document.getElementById("userAddress");
var userContainer = document.getElementById("userContainer");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
//& Global Variables
var users = JSON.parse(localStorage.getItem("Users")) || [];
var updatedIndex = 0;
displayAllUsers();

//!  Regex
var contactNameRegex = /^[a-zA-Z\s]{3,}$/;
var phoneNumberRegex = /^0[0-25]{2}\d{8}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var addressRegex = /^[a-zA-Z0-9\s,.\-#]{5,100}$/;

//^ Validation Function

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

//* Functions

//! Create and Save to localStorage

function addUser() {
  if (
    validate(contactNameRegex, userName) &&
    validate(phoneNumberRegex, userPhone) &&
    validate(emailRegex, userEmail) &&
    validate(addressRegex, userAddress)
  ) {
    var user = {
      userName: userName.value,
      userPhone: userPhone.value,
      userEmail: userEmail.value,
      userAddress: userAddress.value,
    };

    users.push(user);
    localStorage.setItem("Users", JSON.stringify(users));
    display(users.length - 1);
    clearForm();
  }
  alert("Please Put the correct Data");
}
// //! Read and send to HTML

function display(index) {
  var containerHTML = `<tr>
  <td>${[index + 1]}</td>
  <td>${users[index].userName}</td>
  <td>${users[index].userEmail}</td>
  <td>${users[index].userPhone}</td>
  <td>${users[index].userAddress}</td>
  <td>
     <button onclick="editUser(${index})" class="btn btn-sm btn-warning text-white">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button onclick="deleteContacts(${index})" class="btn btn-sm btn-danger">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>
</tr>`;
  userContainer.innerHTML += containerHTML;
}

function displayAllUsers() {
  userContainer.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    display(i);
  }
}
// //! Update tasks and Buttons

function editUser(index) {
  updatedIndex = index;
  console.log(users[index]);

  userName.value = users[index].userName;
  userPhone.value = users[index].userPhone;
  userEmail.value = users[index].userEmail;
  userAddress.value = users[index].userAddress;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateUser(index) {
  users[updatedIndex].userName = userName.value;
  users[updatedIndex].userEmail = userEmail.value;
  users[updatedIndex].userPhone = userPhone.value;
  users[updatedIndex].userAddress = userAddress.value;
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  localStorage.setItem("Users", JSON.stringify(users));
  displayAllUsers();
  clearForm();
}

//! Delete Tasks
function deleteContacts(index) {
  users.splice(index, 1);
  localStorage.setItem("Users", JSON.stringify(users));
  displayAllUsers();
  console.log("del", index);
}

// //! Clear Input

function clearForm() {
  userName.value = "";
  userPhone.value = "";
  userEmail.value = "";
  userAddress.value = "";
}

// //! Search
function searchUsers(value) {
  userContainer.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName.toLowerCase().includes(value.toLowerCase())) {
      display(i);
    }
  }
}
