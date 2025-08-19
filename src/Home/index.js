import Header from "../Header";
import "./index.css";
import {Outlet} from "react-router-dom";
const Home=()=>{
    return (
        <div className="homeContainer">
            <Header/>
            <Outlet/>
            
            
        </div>
    )
}
export default Home;