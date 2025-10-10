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

// Create modal on page load
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.createElement('div');
    modal.id = 'recipe-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeRecipeModal()">&times;</span>
            <h2 id="modal-title"></h2>
            <div class="modal-body">
                <p>Click the button below to view the full recipe:</p>
                <a id="modal-link" target="_blank" rel="noopener noreferrer">View Full Recipe</a>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeRecipeModal();
        }
    };
});

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

        // Handle ingredients display
        let usedIngredients = '';
        if (recipe.usedIngredients && recipe.usedIngredients.length > 0) {
            if (Array.isArray(recipe.usedIngredients)) {
                usedIngredients = recipe.usedIngredients.map(ing => ing.name || ing).join(', ');
            } else {
                usedIngredients = recipe.usedIngredients;
            }
        }

        // Clean recipe title
        const cleanTitle = recipe.title.replace(/[^\w\s\-.,&()]/g, '');

        // Use higher quality Spoonacular images with better fallbacks
        const highQualityImage = recipe.image ? recipe.image.replace('312x231', '636x393') : null;

        // Better fallback images for Indian cuisine
        const fallbackImages = [
            'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=250&fit=crop&crop=center&auto=format&q=80', // Dal
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop&crop=center&auto=format&q=80', // Indian food
            'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=250&fit=crop&crop=center&auto=format&q=80', // Curry
            'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=250&fit=crop&crop=center&auto=format&q=80'  // Biryani
        ];
        const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

        card.innerHTML = `
            <img src="${highQualityImage || randomFallback}" alt="${cleanTitle}" onerror="this.onerror=null; this.src='${randomFallback}'; this.alt='Delicious Indian food';">
            <h3>${cleanTitle}</h3>
            <p><strong>Ingredients:</strong> ${usedIngredients || 'See full recipe for details'}</p>
            <button class="view-recipe-btn" onclick="openRecipeModal('${recipe.id}', '${cleanTitle.replace(/'/g, "\\'")}', '${recipe.url}')">View Recipe</button>
        `;
        resultsDiv.appendChild(card);
    });
}

// Open recipe in modal instead of redirecting
function openRecipeModal(id, title, url) {
    const modal = document.getElementById('recipe-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalLink = document.getElementById('modal-link');

    if (modal && modalTitle && modalLink) {
        modalTitle.textContent = title;
        modalLink.href = url;
        modalLink.textContent = `View ${title} Recipe`;
        modal.style.display = 'block';
    } else {
        console.error('Modal elements not found');
    }
}

// Close recipe modal
function closeRecipeModal() {
    const modal = document.getElementById('recipe-modal');
    if (modal) {
        modal.style.display = 'none';
    }
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