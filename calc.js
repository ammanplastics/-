const searchBox = document.querySelector('.searchBar');
const searchButton = document.querySelector('.searchButton');
const recipe = document.querySelector('.recipe-container');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const closeBtn = document.querySelector('.recipe-cls-btn');

const fetchRecipes = async (query) => {
    try{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>`

        const button = document.createElement('button');
        button.textContent= 'View Recipe';
        recipeDiv.appendChild(button);

        button.addEventListener('click', () =>{
            openRecipe(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
}
catch(e){
    recipeContainer.innerHTML = `<h2>No Recipes Found in the Given Name!!</h2>`
}
}

const fetchIng = (meal) =>{
    var ingList = "";;
    for(let i=1; i<=20; i++){
        const ing = meal[`strIngredient${i}`];
        if(ing){
            const mes = meal[`strMeasure${i}`];
            ingList += `<li>${ing} : ${mes}</li>`
        }else{
            break;
        }
    }
    return ingList;
}

const openRecipe = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class="reciptName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingrList">${fetchIng(meal)}</ul>
    <div  class="insta">
        <h3>Instructions: </h3>
        <p>${meal.strInstructions}</p>
    `

    recipeDetailsContent.parentElement.style.display = 'block';
}

closeBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = 'none';
});

searchButton.addEventListener('click', (e)=> {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2> Type Meal Name to Search!..</h2>`
        return;
    }
    fetchRecipes(searchInput);
})
