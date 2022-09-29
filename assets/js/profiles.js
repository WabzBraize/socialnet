// ----------------------------------------ADD PROFILE FUNCTIONALITY ----------------------------------------------------------------------------------------------------
// When the document has loaded, get all users, hobbies, posts from local storage and display them
document.addEventListener("DOMContentLoaded", () => {
  displayUsers();
  getTotalUsers();
});

const [
  addProfileForm,
  fnameInput,
  lnameInput,
  usernameInput,
  emailInput,
  positionInput,
  dateInput,
  genderInput,
  imageInput,
  userContainer,
  sidebarProfilesContainer,
] = [
  el("addProfileForm"),
  el("fname"),
  el("lname"),
  el("username"),
  el("email"),
  el("position"),
  el("dob"),
  qs(".check").checked,
  el("image-input"),
  el("userContainer"),
  el("sidebarProfilesContainer"),
];

// USER CLASS
class User {
  constructor(fname, lname, username, email, position, dob, gender, image) {
    this.id = Math.random();
    this.fname = fname;
    this.lname = lname;
    this.username = username;
    this.email = email;
    this.position = position;
    this.dob = dob;
    this.gender = gender;
    this.image = image;
  }
}

// WHEN THE FORM IS SUBMITTED
addProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // GET ALL THE INPUT VALUES
  let [firstName, lastName, username, email, position, dob, gender] = [
    fnameInput.value,
    lnameInput.value,
    usernameInput.value,
    emailInput.value,
    positionInput.value,
    dateInput.value,
    genderInput.value,
  ];

  if (
    firstName.length === 0 ||
    lastName.length === 0 ||
    username.length === 0 ||
    email.length === 0 ||
    position.length === 0 ||
    dob.length === 0 ||
    !imageInput.value
  ) {
    el("error").innerText = "Please fill all  fields";
  } else {
    el("error").innerText = "";
    // Create User object
    let image = qs("#image-file").src;
    let newUser = new User(
      firstName,
      lastName,
      username,
      email,
      position,
      dob,
      gender,
      image
    );

    addUser(newUser);

    addUsersToLS(newUser);

    getTotalUsers();

    qs("#image-file").src = "assets/images/coverphoto.png";

    [
      fnameInput.value,
      lnameInput.value,
      usernameInput.value,
      emailInput.value,
      positionInput.value,
      dateInput.value,
      imageInput.value,
    ] = ["", "", "", "", "", "", ""];
  }
});

function addUser(user) {
  var { fname, lname, username, email, position, image } = user;
  let profileCardHtml = `
  <div class="profile-card p-2 shadow text-center rounded-sm">
                            <img src="${image}" alt="" class="profile-avatar">
                            <div class="about mt-1">
                                <h1 class="text-20 uppercase">${fname} ${lname}</h1>
                                <span class="text-muted italics text-12">${email}</span><br>
                                <span class="text-muted text-14 italics capitalize">${position}</span>
                                <div class="socials flex justify-center gap-2 my-2">
                                    <button class="btn btn-secondary facebook-bg btn-circle"><i
                                            class="feather-facebook"></i>
                                    </button>
                                    <button class="btn btn-secondary twitter-bg btn-circle"><i
                                            class="feather-twitter"></i>
                                    </button>
                                    <button class="btn btn-secondary instagram-bg btn-circle"><i
                                            class="feather-instagram"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
  `;
  const insertPosition = "beforeend";
  userContainer.insertAdjacentHTML(insertPosition, profileCardHtml);

  // SIDEBAR PROFILE

  let profileHtml = `
              <div class="profile-card flex-align-center gap-1 mt-2">
                <img src="${image}" alt="" class="profile-avatar">
                <div class="info">
                    <h1 class="text-16 capitalize">${fname} ${lname}</h1>
                    <span class="text-muted">${username}</span>
                </div>
            </div>
  `;
  sidebarProfilesContainer.insertAdjacentHTML(insertPosition, profileHtml);

  // PHOTOS
  let photoHtml = `
    <div class="image-container rounded relative">
                            <img src="${image}" alt="" class="image">
                            <div class="delete-btn absolute top-none right-none mr-2 mt-1 cursor-pointer"><i
                                    class="feather-delete"></i></div>
                        </div>
  `;
  el("photosContainer").insertAdjacentHTML(insertPosition, photoHtml);
}

//LOCAL STORAGE.........................................................................
//FUNCTION Set Local Storage
function setLocalStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

//FUNCTION: Retrieve users from local storage.....................................................
function getUsersFromLS() {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  return users;
}

function getTotalUsers() {
  let users = getUsersFromLS();
  el("profileCount").innerText = users.length;
  el("photosCount").innerText = users.length;
}

//FUNCTION: Add users to local storage...................................................................
function addUsersToLS(user) {
  let users = getUsersFromLS();
  users.push(user);
  setLocalStorage(users);
}

//FUNCTION: Display users form local storage to the UI.........................................................
function displayUsers() {
  let users = getUsersFromLS();
  users.forEach((user) => {
    addUser(user);
  });
}
