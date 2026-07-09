// 1. use document.getElementById to select the searchTerm Button
var searchInput = document.getElementById("saveTerm");
// 2. use document.getElementById to select the searchButton Button
var saveButton = document.getElementById("saveButton");
// 3. add an event listener to the searchButton that calls the search function when clicked
saveButton.addEventListener("click", onClickSaveButton);

function onClickSaveButton() {
  // 4. use the value property of the searchInput to get the search term
  //TODO:
  var saveTerm = searchInput.value;
  
  if (saveTerm === "") {
  alert("Please enter a task before adding it.");
  return;
}
  // 5. select the searches div using document.getElementById
  var searchesDiv = document.getElementById("searches");
  //TODO:
  // 6. create a new li element using document.createElement
  var newLi = document.createElement("li");
  //TODO:
  // 7. set the innerHTML of the new paragraph to the search term
newLi.innerHTML = searchInput.value;
  //TODO:
  // 8. append the new paragraph to the searches div
searchesDiv.appendChild(newLi);
  //TODO:
  // 9. Button click event - create a delete button
var clickButton = document.createElement("button");
clickButton.innerHTML = "Delete";
clickButton.addEventListener("click", function () {
  newLi.remove();
});
newLi.appendChild(clickButton); //put Button inside li

}

/**
 * ==========================================
 * METHOD 1: Fetch API (Modern, Native)
 * ==========================================
 * PROS: Built natively into modern browsers. No external weight or CDNs required. 
 * Returns clean Promises.
 * CONS: Does not automatically throw errors on 404/500 statuses (you must manually 
 * check response.ok). Requires a two-step process to extract the payload body.
 */
function sendFetchRequest() {
  fetch("http://localhost:3001/data")
    .then((response) => {
      // Fetch quirk: bad status codes (like 404) do NOT trigger .catch(). 
      // You must handle them manually:
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Step 2: Unpack stream payload to JSON
    })
    .then((data) => console.log("Fetch API (Parsed Data):", data))
    .catch((error) => console.error("Fetch error caught:", error));
}


// const renderRepos = (repos) => {
//   const reposListEl = document.getElementById("searches");
//   let html = "";

//   //TODO what does this line do?
//   repos.forEach((repo) => {
//     const repoFullName = repo.message;

//     html += `<li>${repoFullName}</li>`;
//   });

//   reposListEl.innerHTML = html;
// };

// sendFetchRequest();

function sendAxiosRequest() {
  axios
    .get("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      // Axios automatically parses JSON and places it inside the `.data` property
      console.log("Axios (response.data):", response.data);
    })
    .catch((error) => {
      // Catch handles both network errors AND 4xx/5xx responses automatically
      console.error("Axios error caught:", error.message);
    });
}