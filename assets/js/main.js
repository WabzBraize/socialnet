// FUNCTION:: Get elements by id
const el = (elm) => document.getElementById(elm);
// FUNCTION:: Get elements by queryselector
const qs = (elm) => document.querySelector(elm);
// FUNCTION:: Get elements by queryselectorAll
const qsa = (elm) => document.querySelectorAll(elm);

// Get all DOM elements
const [
  tabLinks,
  tabPanels,
  launchBtn,
  addProfileModal,
  profileForm,
  btnClose,
  root,
] = [
  qsa(".tab-link"),
  qsa(".tab-panel"),
  qs(".add-btn"),
  qs(".add-profile"),
  qs(".add-profile-form"),
  qs(".close-icon"),
  qs(":root"),
];

//Add the active class to the first elements
tabLinks[0].classList.add("active");
tabPanels[0].classList.add("active");

// FUNCTION: REMOVE ACTIVE CLASS FROM TAB BUTTONS AND PANELS

// ---------------------------------------------------------TABS COMPONENT-----------------------------------------------------------------------------------------
function removeActiveClass(element) {
  element.forEach((elm) => {
    elm.classList.remove("active");
    elm.classList.remove("fade-in");
  });
}

tabLinks.forEach((tabLink, i) => {
  tabLink.addEventListener("click", (e) => {
    removeActiveClass(tabLinks);
    removeActiveClass(tabPanels);
    tabLink.classList.add("active");
    let LinkId = tabLink.attributes.id.value;
    const tabPanel = qs(`.tab-panel[data-id = ${LinkId}]`);
    tabPanel.classList.add("active");
    tabPanel.classList.add("fade-in");
  });
});

// -------------------------------------------------------------------------ADD PROFILE MODAL----------------------------------------------------------------------------------------

// Launch the modal by adding the open class
launchBtn.addEventListener("click", (e) => {
  addProfileModal.classList.add("open");
  profileForm.classList.add("open");
});

// FUNCTION: Close the modal by removing the open class
function closeModal(element) {
  element.addEventListener("click", (e) => {
    addProfileModal.classList.remove("open");
    profileForm.classList.remove("open");
  });
}

closeModal(btnClose);

// Close the modal when user clicks outside the modal dialog
window.addEventListener("click", (e) => {
  if (e.target === addProfileModal) {
    addProfileModal.classList.remove("open");
    profileForm.classList.remove("open");
  }
});
// ---------------------------------------------------------------------------------------------------------------------------------------------------

// ----------------------IMAGE PREVIEW-----------------------------------------------------------------------------
function imagePreview(image, display, imageInput) {
  display.onclick = () => imageInput.click();
  imageInput.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      //Check if an image is selected
      var reader = new FileReader(); //Greate new file reader object
      reader.onload = (e) => {
        let imageSelected = e.target.result; //Get the src of that selected image
        image.src = imageSelected; // change the src of the current image to the selected image
      };
      reader.readAsDataURL(e.target.files[0]); //Initialise the readASDataURL so as to display the image
    } else {
      console.log("No file selected");
    }
  });
}
imagePreview(qs("#image-file"), qs(".image-display"), qs("#image-input"));
imagePreview(qs(".post-img"), qs(".image-icon"), qs(".image-input"));
imagePreview(
  qs("#hobby-image-file"),
  qs(".hobby-image-display"),
  qs("#hobby-image-input")
);

// ------------------------------------------------------------------------------THEMES-----------------------------------------------------------------------------
// Set the color scheme of the body when it loads
document.addEventListener("DOMContentLoaded", () => {
  let currentColor = qsa(".color")[0].style.backgroundColor;
  savedTheme = JSON.parse(localStorage.getItem("socialnet-color"));
  if (savedTheme) {
    root.style.setProperty("--primary-color", `${savedTheme}`);
  } else {
    root.style.setProperty("--primary-color", `${currentColor}`);
  }
});

// ------------Toggle color themes when clicked-------------------------------
qsa(".color").forEach((color) => {
  color.addEventListener("click", () => {
    currentColor = color.style.backgroundColor;
    localStorage.setItem("socialnet-color", JSON.stringify(currentColor));
    root.style.setProperty("--primary-color", `${currentColor}`);
  });
});

// ------------Set the dark or light mode when body loads----------
document.addEventListener("DOMContentLoaded", () => {
  let theme =
    JSON.parse(localStorage.getItem("socialnet-color-scheme")) ||
    localStorage.setItem("socialnet-color-scheme", JSON.stringify("light"));
  root.setAttribute("color-scheme", `${theme}`);
});

// ------------Toggle dark or light mode when button is clicked-----------
qs(".theme-btn").addEventListener("click", () => {
  let theme = JSON.parse(localStorage.getItem("socialnet-color-scheme"));
  if (theme == "light") {
    localStorage.setItem("socialnet-color-scheme", JSON.stringify("dark"));
    root.setAttribute("color-scheme", `dark`);
  } else if (theme == "dark") {
    localStorage.setItem("socialnet-color-scheme", JSON.stringify("light"));
    root.setAttribute("color-scheme", `light`);
  }
});

// Focus the create post input when the create-post button is clicked
qs(".create-post").onclick = () => qs("textarea").focus();

// Trigger File click for files upload file box
qs(".upload-box").onclick = () => qs("#file").click();
qs("#file").addEventListener("change", (e) => {
  let fileName = e.target.files[0].name;
  qs(".file").innerHTML = `<i class="feather-file"></i>
                       <p>${fileName}</p>`;
});

// Trigger Image click for post post image icon
qs(".image-icon").onclick = () => qs("#image").click();
