import { Link } from "react-router-dom";
import "./index.css"
import { useContext } from "react";
import MyContext from "../Context/MyContext";

const Header=()=>{
    const {data,setData}=useContext(MyContext)
    return (
        <div className="headerContainer">
            <Link to="/" className="headerLogo">
            <h1 className="heading">Book Store</h1>
            </Link>
            <ul className="headerList">
                <li className="headerLink">
                    <Link to="/books" className="linkElement">Books</Link>
                </li>
                <li className="headerLink">
                    <Link to="/cart" className="linkElement">Cart</Link>
                    {data.displayCartItems && <p className="cartCount">{data.cart.length}</p>}
                </li>
                 {data.inBooksPage && <li className="headerLink">
                    <p onClick={() => setData({...data,showFilters:true})} className="linkElement">Filter</p>
                </li>}
                <li className="headerLink">
                    <Link to="/login" className="linkElement">Login</Link>
                </li>
               
            </ul>
        </div>
    )
}
export default Header;
