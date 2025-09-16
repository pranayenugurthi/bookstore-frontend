import Header from "../Header";
import SmNavLinks from "../SmNavLinks";
import "./index.css";
import {Outlet} from "react-router-dom";

const Home=()=>{
    
    return (
        <div className="homeContainer">
            <Header/>
            <Outlet/>
            <SmNavLinks/>
            
        </div>
    )
}
export default Home;