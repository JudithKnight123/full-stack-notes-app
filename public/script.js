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

        // Button click event - create a delete button
        const clickButton = document.createElement("button");
        clickButton.innerHTML = "Delete";
        
        clickButton.addEventListener("click", async function () {
            const response = await fetch("/data/" + item.id, {
                method: "DELETE"               
             });
            li.remove();
        });

        // li.innerHTML = dataInput.value;

        li.textContent = item.message;
        
        li.appendChild(clickButton);//put Button inside li
        dataList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle form submission to add new data
  saveButton.addEventListener("click", async (event) => {

  if (dataInput.value.trim() === "") {  
    alert("Please enter a task before adding it.");
    return;
  }

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
