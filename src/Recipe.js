
import React, { useState } from 'react';
import axios from 'axios';

const RecipeList = () => {
    const [recipe, setRecipe] = useState(null);

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`/api/recipe/${id}`);
            setRecipe(response.data);
        } catch (error) {
            console.error('Error fetching recipe:', error);
        }
    };

    return (
        <div>
            {recipe.map(recipe => (
                <img key={recipe.id} src={recipe.imageUrl} alt={recipe.name} onClick={() => handleClick(recipe.id)} />
            ))}
            {recipe && (
                <div>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.description}</p>
                </div>
            )}
        </div>
    );
};

export default RecipeList;
