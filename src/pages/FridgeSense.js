import "./Styles/ingredients_form.css"

function FridgeSense(){

    return (
    
        <div className="ingredient_form_container">
            <form id="ingredient_form">
                <h1 id="ingredient_title"> Select Your Ingredients</h1>
                <div className="ingredient_selected_ingredients_box" id="selected_ingredients">
                    <div className="ingredient_list">
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Eggs"></input> Eggs
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Pasta"></input> Pasta
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Bread"></input> Bread
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Chicken"></input> Chicken
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Potatoes"></input> Potatoes
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Sausages"></input> Sausages
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Beef"></input> Beef
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Pork"></input> Pork
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Carrots"></input> Carrots
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Onions"></input> Onions
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Lamb"></input> Lamb
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Butter"></input> Butter
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Milk"></input> Milk
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Flour"></input> Flour
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Cheese"></input> Cheese
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Fish"></input> Fish
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Rice"></input> Rice
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Mushroom"></input> Mushroom
                    </label>
                    <label className="ingredient_label">
                        <input onchange="updateSelectedIngredients(this)" type="checkbox" value="Broccoli"></input> Broccoli
                    </label>
                    </div>
                        <p class="ingredient_error_message" id="ingredient_error_message"></p>
                        <button id="ingredient_submit_button" type="button" onClick={submitIngredients}>Submit</button>
                    </div>
                </form>
            </div>
    );
}

//const showFormButton = document.getElementById('show-form');  <-- I don't think these are needed.
//const ingredientForm = document.getElementById('ingredient-form');
//const submitButton = document.getElementById('submit-button');


function submitIngredients() {

    const errorMessage = document.getElementById('ingredient_error_message');

    const selectedIngredients = document.querySelectorAll('input[type="checkbox"]:checked');

    if (selectedIngredients.length < 3) {
        errorMessage.textContent = 'Please select at least three ingredients';
    } else {
        errorMessage.textContent = '';
        const selectedIngredientValues = Array.from(selectedIngredients).map(input => input.value);
        errorMessage.textContent = selectedIngredientValues; {/*<-- Quick test to confirm that successful form submission provides array of selected ingredients, should be passable to backend. */}
    }

}

function updateSelectedIngredients(checkbox) { // <-- What is this function meant to do? Can prob remove and add to above function that checkboxes are cleared upon submission/refresh
    const selectedIngredients = document.getElementById("selected-ingredients");
    const selectedOptions = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value);

    if (selectedOptions.length > 0) {
        selectedIngredients.innerHTML = `<h3>Selected Ingredients:</h3>${selectedOptions.join("<br>")}`;
    } else {
        selectedIngredients.innerHTML = `<h3>Selected Ingredients:</h3>No ingredients selected.`;
    }
}

export default FridgeSense;