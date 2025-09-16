import { Link } from "react-router-dom";
import "./index.css"
import { ImBook } from "react-icons/im";
import { FaOpencart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { useContext } from "react";
import MyContext from "../Context/MyContext";
const SmNavLinks=()=>{
    const {data}=useContext(MyContext)
    if(data.pageType==="login"){
        return;
    }
    return(
        <div className="smNavContainer">
           <Link className="navLink" to="/">
               <AiFillHome className="linkIcon"/> 
               <p className="navLinkText">Home</p>
            </Link>
           <Link className="navLink" to="/books">
               <ImBook className="linkIcon"/> 
               <p className="navLinkText">Books</p>
            </Link>
            <Link className="navLink" to="/cart">
                <FaOpencart className="linkIcon"/>
                <p className="navLinkText">Cart ( {data.cart?.length||0} )</p>
                
            </Link>
            
        </div>
    )
}
export default SmNavLinks;