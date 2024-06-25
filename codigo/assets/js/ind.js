document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById("categories-container");
    const addButton = document.getElementById("add-button");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close-button");
    const addGoalForm = document.getElementById("add-goal-form");
  
    function fetchCategories() {
      fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(categories => displayCategories(categories));
    }
  
    function displayCategories(categories) {
      categoriesContainer.innerHTML = "";
      categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "card";
  
        const title = document.createElement("div");
        title.className = "title";
        title.textContent = category.name;
  
        const amount = document.createElement("div");
        amount.className = "amount";
        amount.textContent = `R$ ${category.amount.toFixed(2)}`;
  
        const progressContainer = document.createElement("div");
        progressContainer.className = "progress-container";
  
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.width = `${category.progress}%`;
  
        const progressPercentage = document.createElement("div");
        progressPercentage.className = "progress-percentage";
        progressPercentage.textContent = `${category.progress}%`;
  
        progressContainer.appendChild(progressBar);
        progressContainer.appendChild(progressPercentage);
  
        card.appendChild(title);
        card.appendChild(amount);
        card.appendChild(progressContainer);
        categoriesContainer.appendChild(card);
      });
    }
  
    function showModal() {
      modal.style.display = "block";
    }
  
    function closeModal() {
      modal.style.display = "none";
    }
  
    function addGoal(event) {
      event.preventDefault();
  
      const goalName = document.getElementById("goal-name").value;
      const goalAmount = parseFloat(document.getElementById("goal-amount").value);
  
      const newGoal = {
        name: goalName,
        amount: goalAmount,
        progress: 0
      };
  
      fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newGoal)
      })
        .then(response => response.json())
        .then((newCategory) => {
          fetchCategories(); // Atualiza a lista de categorias
          closeModal();
          addGoalForm.reset(); // Reseta o formulário
        });
    }
  
    addButton.addEventListener("click", showModal);
    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        closeModal();
      }
    });
  
    addGoalForm.addEventListener("submit", addGoal);
  
    fetchCategories();
  });
  