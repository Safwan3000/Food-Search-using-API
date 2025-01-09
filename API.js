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
    } catch (error) {
        console.error('Error fetching meals:', error);
        resultsContainer.innerHTML = '<p class="text-danger">An error occurred. Please try again.</p>';
    }
});

function displayMeals(meals, append = false){
    const resultsContainer = document.getElementsById('mealResults');

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'col-md-4 meal-card';
        card.innerHTML = `
            <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top meal-image" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                    <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 100)}...</p>
                </div>
            </div>
        `;
    });
}
