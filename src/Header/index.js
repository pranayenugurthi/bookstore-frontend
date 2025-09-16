import { Link ,useNavigate} from "react-router-dom";
import "./index.css"
import { useContext } from "react";
import MyContext from "../Context/MyContext";
import Cookies from "js-cookie";

const Header=()=>{
    const {data,setData}=useContext(MyContext)
    const navigate=useNavigate();  
    const cookieValue = Cookies.get("userLogin");
    const onLoginLogout=()=>{
        if(data.userDetails!==null){
            Cookies.remove("userLogin");
            // console.log("User logged out");
            setData(prev => ({ ...prev, userDetails: null,pageType:"login",displayCartItems:false }));
            navigate("/login")
        }
        
    }
    // console.log("Header rendered with userDetails:", data.pageType);
    return (
        <div className="headerContainer">
            <Link to="/" className="headerLogo">
            <h1 className="heading">Book Store</h1>
            </Link>
            {(data.pageType!=="login") && (
                <ul className="headerList lgScreenNavLink">
                <li className="headerLink">
                    <Link to="/books" className="linkElement">Books</Link>
                </li>
                <li className="headerLink">
                    <Link to="/cart" className="linkElement">Cart</Link>
                    {data.displayCartItems && <p className="cartCount">{data.cart.length}</p>}
                </li>
                 {(data.pageType === "books") &&
                 <li className="headerLink largeScreeFilter">   
                    <p onClick={() => setData({...data,showFilters:true})} className="linkElement">Filter</p>
                </li>}
                {(data.userDetails !==null) && 
                <li className="headerLink ">
                    <button className="linkElement logoutBtn" onClick={()=>onLoginLogout()}>Logout</button>
                </li>}
            </ul>
            )}
            {
                (data.pageType!=="login")&& <button className="linkElement logoutBtn smLogoutBtn" onClick={()=>onLoginLogout()}>Logout</button>
            }
           
        </div>
    )
}
export default Header;
//  <p className="headerLink smProfileCard">
//                     <Link to="/profile"  className="linkElement">
//                        {profileName} <span className="profileCard">{profileCard}</span>
//                     </Link>
//                 </p>