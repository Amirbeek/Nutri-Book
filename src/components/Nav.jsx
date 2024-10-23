import {Link} from "react-router-dom";

function Nav() {
    return (
        <>
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/BrowseRecipes">Browse Recipes</Link>
                <Link to="/FridgeSense">FridgeSense</Link>
                <Link to="/SubmitRecipe">Submit Recipe</Link>
                <Link to="/Events">Events</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Account">Account</Link>
                <Link to="/Admin">*Admin*</Link>
                <Link to="/UserAllergies">*User*</Link>
                <Link to="/RecipeTemplate">*Recipe Template*</Link>
            </nav>
        </>
    );
}

export default Nav;