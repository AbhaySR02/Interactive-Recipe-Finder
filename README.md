# Interactive Recipe Finder

A simple web app that helps users find **Indian-centric recipes** based on available ingredients using recipe APIs.

## Features
- Enter ingredients to find matching recipes (optimized for Indian cuisine).
- Supports multiple APIs for better Indian recipe coverage.
- Displays recipe cards with images, titles, and used ingredients.
- Links to full recipes on external sites.
- Responsive design for mobile and desktop.

## API Options for Indian Recipes

### Option 1: Spoonacular API (Default - Recommended)
- **Best for**: Comprehensive Indian recipe database
- **Free tier**: 150 requests/day
- **Indian focus**: Built-in cuisine filter for Indian recipes
- **Image quality**: High-quality food images (now optimized)
- **Get API key**: [spoonacular.com/food-api](https://spoonacular.com/food-api)

### Option 2: Edamam Recipe Search API (Alternative)
- **Best for**: Alternative Indian recipe source
- **Free tier**: 10,000 requests/month
- **Indian focus**: Supports cuisine type filtering
- **Get API key**: [developer.edamam.com](https://developer.edamam.com/)

## Setup Instructions

### Step 1: Choose Your API
- **Spoonacular** (recommended for Indian recipes) - already configured
- **Edamam** - alternative option

### Step 2: Get API Keys
1. **For Spoonacular** (Recommended - default):
   - Visit [spoonacular.com/food-api](https://spoonacular.com/food-api)
   - Sign up for free account
   - Copy your API key

2. **For Edamam** (optional alternative):
   - Visit [developer.edamam.com](https://developer.edamam.com/)
   - Sign up for Recipe Search API
   - Copy your Application ID and Application Key

### Step 3: Configure API Keys
Open `script.js` and update:

**For Spoonacular** (default):
```javascript
const API_CONFIG = {
    spoonacular: {
        key: 'YOUR_ACTUAL_SPOONACULAR_KEY_HERE',
    }
};
```

**For Edamam** (alternative):
```javascript
const API_CONFIG = {
    edamam: {
        appId: 'YOUR_EDAMAM_APP_ID_HERE',
        appKey: 'YOUR_EDAMAM_APP_KEY_HERE',
    }
};
```

### Step 4: Switch APIs (Optional)
To use Edamam instead of Spoonacular, change line 19 in `script.js`:
```javascript
const CURRENT_API = 'edamam'; // Change from 'spoonacular'
```

## How to Use
1. Enter Indian ingredients (e.g., "chicken, rice, onion, garam masala")
2. Click "Find Recipes" to search for Indian recipes
3. Browse through the recipe cards
4. Click "View Recipe" for full cooking instructions

## Running Locally
- Use a local server to avoid CORS issues:
  - **Python**: `python -m http.server 8000`
  - **Node.js**: `npx live-server`
- Open `http://localhost:8000` in your browser.

## Technologies Used
- HTML5
- CSS3 (Grid Layout, Flexbox)
- Vanilla JavaScript (Fetch API)
- RESTful API Integration

## Indian Recipe Tips
- Include common Indian spices: garam masala, turmeric, cumin, coriander
- Try ingredients like: paneer, dal, rice, chicken, vegetables
- The app filters for Indian cuisine when possible

## License
This project is for educational purposes.