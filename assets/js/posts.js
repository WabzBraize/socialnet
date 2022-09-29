// ----------------------------------------ADD POSTS FUNCTIONALITY ----------------------------------------------------------------------------------------------------
// When the document has loaded, get all users, hobbies, posts from local storage and display them
document.addEventListener("DOMContentLoaded", () => {
  //   displayPosts();
  //   getTotalPosts();
});

const [addPostsForm, postInfoInput, postImageInput, allPostsContainer] = [
  el("addPostsForm"),
  el("post-info"),
  qs(".image-input"),
  el("allPostsContainer"),
];

// POST CLASS
class Post {
  constructor(postInfo, image) {
    this.id = Math.random();
    this.postInfo = postInfo;
    this.image = image;
  }
}

// WHEN THE FORM IS SUBMITTED
addPostsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // GET ALL THE INPUT VALUES
  let postInfo = postInfoInput.value;
  //   let image = imageInput.files[0].name;

  //   console.log(imageInput.files[0]);

  if (!postInfo || !postImageInput.value) {
    el("posts-error").innerText = "Please fill all  fields";
  } else {
    el("posts-error").innerText = "";
    // Create Post object
    let image = qs(".post-img").src;
    let newPost = new Post(postInfo, image);

    addPost(newPost);

    // addPostToLS(newPost);

    // getTotalPosts();
    qs(".post-img").src = "";
    postInfoInput.value = "";
    postImageInput.value = "";
  }
});

function addPost(post) {
  var { postInfo, image } = post;
  let postCardHtml = `
                        <div class="post-card shadow p-2 rounded-sm mb-2">
                            <img src="${image}" alt="" class="image rounded mt-1">
                            <p class="text-muted text-14 my-2">${postInfo}</p>
                            <div class="action-icons flex align-center justify-between mt-1 ml-2">
                                <div class="left flex gap-1">
                                    <i class="feather-heart"></i>
                                    <div class="feather-message-circle"></div>
                                    <i class="feather-share-2"></i>
                                </div>
                                <i class="feather-bookmark"></i>
                            </div>
                        </div>
  `;

  allPostsContainer.insertAdjacentHTML("beforeend", postCardHtml);
}

//LOCAL STORAGE.........................................................................
//FUNCTION Set Local Storage
function setLocalStorage(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}

//FUNCTION: Retrieve posts from local storage.....................................................
function getPostsFromLS() {
  let posts;
  if (localStorage.getItem("posts") === null) {
    posts = [];
  } else {
    posts = JSON.parse(localStorage.getItem("posts"));
  }
  return posts;
}

function getTotalPosts() {
  let posts = getPostsFromLS();
  el("postsCount").innerText = posts.length;
}

//FUNCTION: Add posts to local storage...................................................................
function addPostToLS(post) {
  let posts = getPostsFromLS();
  posts.push(post);
  setLocalStorage(posts);
}

//FUNCTION: Display posts form local storage to the UI.........................................................
function displayPosts() {
  let posts = getPostsFromLS();
  posts.forEach((post) => {
    addPost(post);
  });
}
