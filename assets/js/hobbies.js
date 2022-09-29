// ----------------------------------------ADD HOBBIES FUNCTIONALITY ----------------------------------------------------------------------------------------------------
// When the document has loaded, get all users, hobbies, posts from local storage and display them
document.addEventListener("DOMContentLoaded", () => {
  //   displayHobbies();
  //   getTotalHobbies();
});

const [
  addHobbiesform,
  hobbyNameInput,
  hobbyDescriptionInput,
  hobbyImageInput,
  hobbiesList,
] = [
  el("addHobbiesform"),
  el("hobby-name"),
  el("description"),
  el("hobby-image-input"),
  el("hobbiesList"),
];

// HOBBY CLASS
class Hobby {
  constructor(hobbyName, hobbyDescription, image) {
    this.id = Math.random();
    this.hobbyName = hobbyName;
    this.hobbyDescription = hobbyDescription;
    this.image = image;
  }
}

// WHEN THE FORM IS SUBMITTED
addHobbiesform.addEventListener("submit", (e) => {
  e.preventDefault();
  // GET ALL THE INPUT VALUES
  let [hobbyName, hobbyDescription] = [
    hobbyNameInput.value,
    hobbyDescriptionInput.value,
  ];

  if (
    hobbyName.length === 0 ||
    hobbyDescription.length === 0 ||
    !hobbyImageInput.value
  ) {
    el("hobby-error").innerText = "Please fill all  fields";
  } else {
    el("hobby-error").innerText = "";
    let image = qs("#hobby-image-file").src;
    // Create Hobby object
    let newHobby = new Hobby(hobbyName, hobbyDescription, image);

    addHobby(newHobby);

    // addHobbiesToLS(newHobby);

    // getTotalHobbies();
    qs("#hobby-image-file").src = "assets/images/coverphoto.png";
    [hobbyNameInput.value, hobbyDescriptionInput.value, hobbyImageInput.value] =
      ["", "", ""];
  }
});

function addHobby(hobby) {
  var { hobbyName, hobbyDescription, image } = hobby;
  let hobbyCardHtml = `
            <li>
                                        <h4>${hobbyName}</h4>
                                        <p>${hobbyDescription}</p>
                                        <div class="image">
                                            <img src="${image}" alt="">
                                            <h4>${hobbyName}</h4>
                                        </div>
                                    </li>
  `;

  hobbiesList.insertAdjacentHTML("beforeend", hobbyCardHtml);
}

//LOCAL STORAGE.........................................................................
//FUNCTION Set Local Storage
function setLocalStorage(hobbies) {
  localStorage.setItem("hobbies", JSON.stringify(hobbies));
}

//FUNCTION: Retrieve hobbies from local storage.....................................................
function getHobbiesFromLS() {
  let hobbies;
  if (localStorage.getItem("hobbies") === null) {
    hobbies = [];
  } else {
    hobbies = JSON.parse(localStorage.getItem("hobbies"));
  }
  return hobbies;
}

function getTotalHobbies() {
  let hobbies = getHobbiesFromLS();
  el("hobbiesCount").innerText = hobbies.length;
}

//FUNCTION: Add hobbies to local storage...................................................................
function addHobbiesToLS(hobby) {
  let hobbies = getHobbiesFromLS();
  hobbies.push(hobby);
  setLocalStorage(hobbies);
}

//FUNCTION: Display hobbies form local storage to the UI.........................................................
function displayHobbies() {
  let hobbies = getHobbiesFromLS();
  hobbies.forEach((hobby) => {
    addHobby(hobby);
  });
}
