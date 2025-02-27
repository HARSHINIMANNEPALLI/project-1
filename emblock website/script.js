// Initialize favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to fetch recipes
function searchRecipes() {
    document.getElementById('loader').style.display = 'block';
    const query = document.getElementById('searchQuery').value;
    const cuisine = document.getElementById('cuisine').value;
    const diet = document.getElementById('diet').value;

    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&diet=${diet}&apiKey=cdbfbcfc4588435380c517dfd0d9f0b7`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            const recipesDiv = document.getElementById('recipes');
            recipesDiv.innerHTML = ''; // Clear previous results

            data.results.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <img src="${recipe.image}" alt="${recipe.title}" width="200">
                    <br>
                    <button onclick="addToFavorites('${recipe.id}', '${recipe.title}', '${recipe.image}')">❤️ Add to Favorites</button>
                `;
                recipesDiv.appendChild(recipeElement);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

// Function to add a recipe to favorites
function addToFavorites(id, title, image) {
    // Check if the recipe is already in favorites
    if (!favorites.some(recipe => recipe.id === id)) {
        favorites.push({ id, title, image });
        localStorage.setItem("favorites", JSON.stringify(favorites)); // Save to localStorage
        updateFavorites();
        alert(`${title} added to favorites!`);
    } else {
        alert("This recipe is already in your favorites!");
    }
}

// Function to remove a recipe from favorites
function removeFromFavorites(id) {
    favorites = favorites.filter(recipe => recipe.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update localStorage
    updateFavorites();
}

// Function to update the Favorites section
function addToFavorites(id, title, image) {
    console.log("Adding to favorites:", title); // Debugging log
    if (!favorites.some(recipe => recipe.id === id)) {
        favorites.push({ id, title, image });
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavorites();
        alert(`${title} added to favorites!`);
    } else {
        alert("This recipe is already in your favorites!");
    }
}


// Load favorites when the page loads
document.addEventListener("DOMContentLoaded", updateFavorites);


