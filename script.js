// API Configuration - Choose your preferred API
const API_CONFIG = {
    // Spoonacular (Global recipes)
    spoonacular: {
        key: '5284896007b2407f8a43678f3758a30c',
        url: 'https://api.spoonacular.com/recipes/findByIngredients',
        params: 'number=10&ranking=2&cuisine=Indian' // Added Indian cuisine filter
    },
};

// Use Spoonacular by default (you already have the API key)
const CURRENT_API = 'spoonacular';

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
        let recipes = [];

        if (CURRENT_API === 'spoonacular') {
            recipes = await fetchFromSpoonacular(ingredients);
        } else if (CURRENT_API === 'edamam') {
            recipes = await fetchFromEdamam(ingredients);
        }

        displayRecipes(recipes);
    } catch (error) {
        console.error(error);
        showError('Failed to fetch recipes. Please check your API keys and try again.');
    } finally {
        hideLoading();
    }
}

// Spoonacular API implementation
async function fetchFromSpoonacular(ingredients) {
    const config = API_CONFIG.spoonacular;
    // Enhanced parameters for better Indian recipe results
    const enhancedParams = `${config.params}&sort=max-used-ingredients&instructionsRequired=true&addRecipeInformation=true`;
    const response = await fetch(
        `${config.url}?apiKey=${config.key}&ingredients=${encodeURIComponent(ingredients)}&${enhancedParams}`
    );

    if (!response.ok) {
        throw new Error(`Spoonacular API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredients: recipe.usedIngredients,
        url: `https://spoonacular.com/recipes/-${recipe.id}`
    }));
}

// Edamam API implementation (Indian-focused alternative)
async function fetchFromEdamam(ingredients) {
    const config = API_CONFIG.edamam;
    // Edamam works better with specific ingredient searches
    const ingredientList = ingredients.split(',').map(ing => ing.trim()).slice(0, 3); // Limit to 3 ingredients

    const response = await fetch(
        `${config.url}?type=public&app_id=${config.appId}&app_key=${config.appKey}&q=${encodeURIComponent(ingredientList.join(' '))}&cuisineType=Indian`
    );

    if (!response.ok) {
        throw new Error(`Edamam API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.hits.map(hit => ({
        id: hit.recipe.uri.split('_')[1],
        title: hit.recipe.label,
        image: hit.recipe.image,
        usedIngredients: hit.recipe.ingredientLines.slice(0, 3), // Show first 3 ingredients
        url: hit.recipe.url
    }));
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