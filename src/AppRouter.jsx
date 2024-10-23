import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Home from './pages/Home';
import FridgeSense from './pages/FridgeSense';
import BrowseRecipes from './pages/BrowseRecipes';
import SubmitRecipe from './pages/SubmitRecipe';
import Events from './pages/Events';
import Login from './pages/Login';
import Account from "./pages/ActManagement";
import Admin from "./pages/Admin";
import UserAllergies from "./pages/UserAllergies";
import RecipeTemplate from "./pages/RecipeTemplate";
import App from "./App";
import PasswordResetPage from "./pages/PasswordReset.jsx";
import React from "react";
import ChangeAllergy from "./pages/ChangeAllergy.js";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path='/BrowseRecipes' element={<BrowseRecipes/>}></Route>
                    <Route path='/FridgeSense' element={<FridgeSense/>}></Route>
                    <Route path='/SubmitRecipe' element={<SubmitRecipe/>}></Route>
                    <Route path='/Events' element={<Events/>}></Route>
                    <Route path='/Login' element={<Login/>}></Route>
                    <Route path='/Account' element={<Account/>}></Route>
                    <Route path='/Admin' element={<Admin/>}></Route>
                    <Route path='/UserAllergies' element={<UserAllergies/>}></Route>
                    <Route path='/ChangeAllergy' element={<ChangeAllergy/>}></Route>
                    <Route path='/RecipeTemplate' element={<RecipeTemplate/>}></Route>
                    <Route path={'/Reset/*'} element={<PasswordResetPage/>}></Route>
                </Route>
            </Routes>
        </Router>
    )
}