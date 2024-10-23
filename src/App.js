// import './index.css';
import {Outlet} from "react-router-dom";
import React, {useState} from "react";
import Header from "./components/Header.jsx"
import Sidebar from './components/Sidebar.jsx'
import Footer from "./components/Footer.jsx";

export default function App() {
    const [loggedInUser, setLoggedInUser] = useState('');
    return (
        <div className={'App'}>
            <Header/>
            <main className={'App-main'}>
                {/*<Sidebar/>*/}
                <Outlet context={[loggedInUser, setLoggedInUser]}/>
                <Footer/>
            </main>
        </div>
    );
}