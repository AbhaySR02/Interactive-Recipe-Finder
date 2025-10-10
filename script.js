// Replace with your actual Spoonacular API key
const API_KEY = 'your_api_key_here';

// DOM elements
const ingredientsInput = document.getElementById('ingredients');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

// Event listener
searchBtn.addEventListener('click', () => {
    const ingredients = ingredientsInput.value.trim();
    if (!ingredients) {
        showError('Please enter some ingredients.');
        return;
    }
    fetchRecipes(ingredients);
});

// Fetch recipes from API
async function fetchRecipes(ingredients) {
    showLoading();
    hideError();
    resultsDiv.innerHTML = '';
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${encodeURIComponent(ingredients)}&number=10&ranking=2`);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error(error);
        showError('Failed to fetch recipes. Please check your API key and try again.');
    } finally {
        hideLoading();
    }
}

// Display recipes
function displayRecipes(recipes) {
    if (recipes.length === 0) {
        showError('No recipes found for these ingredients.');
        return;
    }
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        const usedIngredients = recipe.usedIngredients.map(ing => ing.name).join(', ');
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <h3>${recipe.title}</h3>
            <p>Used ingredients: ${usedIngredients}</p>
            <a href="https://spoonacular.com/recipes/-${recipe.id}" target="_blank">View Recipe</a>
        `;
        resultsDiv.appendChild(card);
    });
}

// Utility functions
function showLoading() {
    loadingDiv.style.display = 'block';
}

function hideLoading() {
    loadingDiv.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function hideError() {
    errorDiv.style.display = 'none';
}