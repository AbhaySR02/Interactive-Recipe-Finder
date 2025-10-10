# Project Plan: Interactive Recipe Finder

## Project Overview
Based on your beginner level in HTML, CSS, and JavaScript from the 6-week Edunet Foundation internship, I recommend selecting the **Interactive Recipe Finder** project. This choice is ideal because:
- It matches your workspace directory name, suggesting you may have already started.
- It's practical and engaging for users.
- It introduces API integration (Spoonacular or Edamam API), which is a valuable skill for frontend development.
- It's achievable with your current skill set (HTML/CSS/JS).
- It avoids overly complex features while providing interactivity.

**Problem Statement:** Users often don't know what to cook with available ingredients. This app lets them enter ingredients and suggests recipes accordingly. It reduces food waste and cooking time with smart suggestions.

**Tools & Tech:** HTML, CSS, JavaScript (Spoonacular API or Edamam API).

## Deployment Notes
The project is built with HTML/CSS/JS, so it will be deployed as a static website. Based on your mention of "Streamlit and GitHub," I interpret this as deploying the code repository on GitHub and the live site on GitHub Pages (free hosting for static sites). Streamlit is a Python framework and doesn't directly apply to this frontend project. If you intended something else (e.g., rebuilding in Streamlit), please clarify. For now, the plan assumes GitHub Pages deployment.

## Overall Workflow
```mermaid
flowchart TD
    A[Project Selection] --> B[Requirements Gathering]
    B --> C[Design Phase]
    C --> D[Implementation Phase]
    D --> E[Testing Phase]
## Requirements Details

### Core Features
- **Ingredient Input:** A text input field where users can enter ingredients (e.g., "chicken, rice, onion"). Support comma-separated values.
- **Search Functionality:** A "Find Recipes" button that triggers the search.
- **Recipe Display:** Show a list of recipes with:
  - Recipe title
  - Image thumbnail
  - Brief description or ingredients list
  - Link to full recipe (external or modal)
- **Error Handling:** Display messages for no results, API errors, or invalid inputs.
- **Loading State:** Show a loading indicator during API calls.
- **Responsive Design:** Ensure the app works on mobile and desktop.

### API Choice
- Use Spoonacular API (https://spoonacular.com/food-api) for recipe data.
- Free tier available (150 requests/day).
- Endpoints: Use "Find Recipes by Ingredients" (GET /recipes/findByIngredients).
- Parameters: ingredients (comma-separated), number (limit results, e.g., 10), ranking (maximize used ingredients).

### User Flow
```mermaid
flowchart TD
    A[User opens app] --> B[Enter ingredients in input field]
    B --> C[Click Search button]
    C --> D[API call to Spoonacular]
    D --> E{API response}
    E -->|Success| F[Display recipe list]
    E -->|Error/No results| G[Show error message]
    F --> H[User views recipes]
## Design Details

### UI Wireframe (Text-based Description)
```
+-----------------------------+
| Interactive Recipe Finder   |
+-----------------------------+
| Enter ingredients: [_______] |
| [Find Recipes]              |
+-----------------------------+
|                             |
| [Loading...] or Results:    |
| +-------------------------+ |
| | [Image]                  | |
| | Recipe Title             | |
| | Used: ingredient1, ...   | |
| | [View Recipe]            | |
| +-------------------------+ |
| (Repeat for each recipe)    |
+-----------------------------+
```

- **Layout:** Single-page app with header, search section, and results section.
- **Color Scheme:** Background: #f4f4f4, Text: #333, Accent: #4CAF50 (green for button).
- **Fonts:** Sans-serif (e.g., Arial or Google Fonts like Roboto).
- **Responsiveness:** Use CSS Grid/Flexbox; stack vertically on mobile, grid on desktop.

### CSS Structure
- Reset styles.
- Header styling (centered title).
- Input and button styling (rounded, hover effects).
- Results container (flex/grid layout).
- Recipe cards (shadow, padding, hover zoom).
- Loading and error message styling.

### JS Structure
- **Variables:** DOM elements (input, button, resultsDiv).
- **Event Listeners:** Button click to trigger search.
- **Functions:**
  - `validateInput(ingredients)`: Check if not empty.
  - `fetchRecipes(ingredients)`: Async function to call API, handle response.
  - `displayRecipes(recipes)`: Loop through data, create HTML for each recipe.
  - `showLoading()`, `hideLoading()`, `showError(message)`.
- **API Integration:** Use fetch() with API key (hardcoded for demo; in production, use env or secure method).

### File Structure
- index.html
- styles.css
- script.js
```

### Assumptions
- No user authentication or data persistence (local storage not needed for this scope).
- Focus on frontend only; no backend.
- API key will be obtained separately (user needs to sign up on Spoonacular).
    E --> F[Deployment Phase]
    F --> G[Submission]
```

## Detailed Plan Steps

### 1. Project Selection (Completed)
- Selected: Interactive Recipe Finder
- Justification: Beginner-friendly, uses API, practical application.

### 2. Requirements Gathering
- Define core features:
  - User input for ingredients (text field or multiple inputs).
  - Fetch recipes from API based on ingredients.
  - Display recipe results (title, image, ingredients, instructions).
  - Handle API errors and loading states.
  - Responsive design for mobile/desktop.
- Choose API: Spoonacular (free tier available) or Edamam.
- Sign up for API key if required.
- Sketch basic user flow: Input -> Search -> Display Results.

### 3. Design Phase
- Wireframe the UI:
  - Header with title.
  - Input section for ingredients.
  - Search button.
  - Results section (list/grid of recipes).
  - Footer with contact/info.
- Choose color scheme and fonts (simple, clean design).
- Plan CSS for responsiveness (media queries).
- Plan JS structure: Event listeners, API calls, DOM manipulation.

### 4. Implementation Phase
- Set up project structure:
  - index.html (main page).
  - styles.css (styling).
  - script.js (functionality).
  - assets/ folder for images/icons if needed.
- Build HTML structure.
- Style with CSS (focus on beginner-friendly styles).
- Implement JS:
  - Capture user input.
  - Make API request (use fetch API).
  - Parse and display results.
  - Add basic error handling.
- Ensure cross-browser compatibility.

### 5. Testing Phase
- Test functionality:
  - Valid inputs (e.g., "chicken, rice").
  - Invalid inputs (empty, non-existent ingredients).
  - API responses (success, error).
- Test responsiveness on different screen sizes.
- Debug any issues (console logs, browser dev tools).
- Validate HTML/CSS/JS for best practices.

### 6. Deployment Phase
- Create GitHub repository.
- Push code to GitHub.
- Enable GitHub Pages for the repository.
- Verify live site loads correctly.
- Generate deployment link (e.g., https://username.github.io/repo-name).

### 7. Submission
- Prepare submission form with:
  - GitHub repository link.
  - Deployment link (GitHub Pages).
- Ensure project meets internship requirements.

## Risk Mitigation
- If API limits are hit, implement caching or switch APIs.
- If deployment issues arise, use GitHub Pages troubleshooting docs.
- Keep code simple to avoid complexity beyond beginner level.

## Timeline Estimate
- Requirements & Design: 1-2 days
- Implementation: 3-5 days
- Testing: 1 day
- Deployment: 1 day
- Total: ~1 week (adjust based on pace)

This plan ensures a structured approach from start to end, minimizing wasted time. Follow this sequentially, and update as needed.