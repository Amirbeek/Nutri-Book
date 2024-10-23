import "./Styles/browse_recipes.css";
import React, {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

const BrowseRecipes = () => {
  const [recipes,setRecipes] = useState([])


  useEffect(()=>{
      const fetchAllRecipes = async ()=>{
          try{
              const res = await axios.get("http://localhost:8800/recipes")
              setRecipes(res.data)
          }catch(err){
            console.log("Unable to connect to backend")
            console.log(err)
            document.getElementById("error").innerHTML = "We're having trouble getting recipes right now, please try again later"
          }
      };
      fetchAllRecipes();
  },[])

  console.log(recipes);


    return (

    <div>
      <p id="error"></p>
      <div className="browse_recipes_container">
        {recipes.map((recipes)=>
        <div className="browse_recipes_template">
          <h2 className="recipe_title">{recipes.title}</h2>
          <h3 className="recipe_ct">Cooking Time: {recipes.ct} minutes</h3>
          <h3 className="recipe_desc">{recipes.desc}</h3>
        </div>
        )}
      </div>
    </div>
    );
}

export default BrowseRecipes;