document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('mealResults');
    const showAllButton = document.getElementById('showAllButton');

    resultsContainer.innerHTML = '';
    showAllButton.classList.add('d-none');

    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        if (data.meals) {
            const meals = data.meals;
            const firstFiveMeals = meals.slice(0, 5);

            displayMeals(firstFiveMeals);

            if (meals.length > 5) {
                showAllButton.classList.remove('d-none');
                showAllButton.onclick = () => displayMeals(meals.slice(5), true);
            }
        } else {
            resultsContainer.innerHTML = '<p class="text-danger">No meals found!</p>';
        }