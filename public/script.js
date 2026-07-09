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


document.addEventListener("DOMContentLoaded", () => {
  const dataList = document.getElementById("searches");
  const dataInput = document.getElementById("saveTerm");
  const saveButton = document.getElementById("saveButton");

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch("/data");
      const data = await response.json();
      dataList.innerHTML = ""; // Clear the list before rendering
      data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.message;
        // li.textContent = item.id + ": " + JSON.stringify(item);
        dataList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle form submission to add new data
  saveButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const newData = { message: dataInput.value };

    try {
      const response = await fetch("/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        dataInput.value = ""; // Clear input field
        fetchData(); // Refresh the list
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  });

  // Fetch data on page load
  fetchData();
});
