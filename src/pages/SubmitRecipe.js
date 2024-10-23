// import './Styles/submitRecipes.css';
import axios from "axios";
import { useState } from "react";

const Recipes = () => {

    const [recipes,setRecipes] = useState({
        title: "",
        ct: "",
        desc: "",
        ingredients: "",
        instructions: "",
    });

    const handleRecipeData = (e) => {
        setRecipes((prev) => ({...prev, [e.target.name]: e.target.value }));
    };
    
    const Submit = async (e) => {
       
        try{
            await axios.post("http://localhost:8800/recipes", recipes) 
        }
        catch(err)
        {
            console.log(err);
        }
        
    };

    return (
        <div className={"container"}>
            <div className="form-box" id={"submit-recipe-form"}>
                <form>
                <h1>Submit Your Recipe</h1>
                    <div className="input-group" id="forms">
                        <div className={"input-field"} id={"recipe-title-field"}>

                            <label htmlFor="title" hidden>Title</label>
                            <input type="text" id="title" name="title" 
                                   placeholder={"Recipe Title"} onChange={handleRecipeData}></input>
                        </div>
                        <div className={"input-field"} id={"recipe-ct-field"}>
                            <label htmlFor="ct" hidden>Cooking Time</label>
                            <input type="text" id="ct" name="ct" rows="1" 
                                      placeholder={"Cooking Time"} onChange={handleRecipeData}></input>
                        </div>
                        <div className={"input-field"} id={"recipe-desc-textarea"}>
                            <label htmlFor="desc" hidden>Description</label>
                            <textarea id="desc" name="desc" rows="2" 
                                      placeholder={"Description"} onChange={handleRecipeData}></textarea>
                        </div>
                        <div className={"input-field"} id={"recipe-ingredients-field"}>
                            <label htmlFor="ingredients" hidden>Ingredients</label>
                            <textarea id="ingredients" name="ingredients" rows="2" 
                                      placeholder={"Ingredients"} onChange={handleRecipeData}></textarea>
                        </div>
                        <div className={"input-field"} id={"submit-recipe-textarea"}>
                            <label htmlFor="instructions" hidden>Cooking Instructions</label>
                            <textarea id="instructions" name="instructions" rows="2" 
                                      placeholder={"Cooking Instructions"} onChange={handleRecipeData}></textarea>
                        </div>
                        <p></p>
                        <div className={"button-field"}>
                            <label htmlFor={"submit"} hidden>Submit Recipe</label>
                            <button onClick={Submit} type="submit" id={"submit"} name={"submit"}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>   
    );
};

export default Recipes;
