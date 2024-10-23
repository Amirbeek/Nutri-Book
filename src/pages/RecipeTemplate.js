import './Styles/recipe_template.css'

function RecipeTemplate() {

    return (
    <div class="recipe_template_container">
            <h1 id="recipe_template_title">Recipe Title</h1>
            <img className="recipe_template_image" src="recipe_image.jpg" alt="Recipe Image"></img>
            <h2 className="recipe_template_h2">Ingredients</h2>
            <p className="recipe_template_p">Ingredient 1, Ingredient 2, Ingredient 3, ...</p>
            <h2 className="recipe_template_h2">Cooking Instructions</h2>
            <p className="recipe_template_p">Cooking instruction 1: Instructions for step one can be filled here </p>
            <p className="recipe_template_p" >Cooking instruction 2: Instructions for step two can be filled here</p>
            <p className="recipe_template_p"> More instructions can be added as need by the user recipe </p>
            {/*Add more instructions as needed*/}
            <div className="recipe_template_comment">
                <h2 className="recipe_template_h2">Comments</h2>
                {/*Comments can be dynamically added here*/}
                <div className="recipe_template_comment">
                    <p className="recipe_template_p"><strong>Commenter Name:</strong> This recipe was delicious!</p>
                </div>
                {/*Add more comments as needed*/}
            </div>
    </div>
    );
}

export default RecipeTemplate;