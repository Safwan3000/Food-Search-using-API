document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('mealResults');
    const showAllButton = document.getElementById('showAllButton');

    resultsContainer.innerHTML = '';
    showAllButton.classList.add('d-none');
