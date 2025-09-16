import { useContext, useEffect, useState } from "react";
import { Navigate ,Link} from "react-router-dom";
import MyContext from "../Context/MyContext";
import { FaRupeeSign } from "react-icons/fa";
import Cookies from "js-cookie";
import "./index.css"
import CartItem from "../CartItem";

const Cart=()=>{
    const {data,setData}=useContext(MyContext);

     useEffect(()=>{
        setData(prev=>({...prev,displayCartItems:true,showFilters:false,pageType:"cart"}));
     },[])
    const cookieValue = Cookies.get("userLogin");
    if(data.userDetails===null && cookieValue===undefined){
        return <Navigate to="/login" />
    }
     const updateCartItem=(id, quantity)=>{
         const updatedCart = data.cart.map(item=>{
                 if(item.id === id){
                     return {...item, quantity};
                 }
                 return item;
             });
             localStorage.setItem("cart", JSON.stringify(updatedCart));
         setData(prev=>({...prev, cart: updatedCart}));
     }

    const cartList=data.cart || JSON.parse(localStorage.getItem("cart")) || [];
    console.log("cartList",cartList)
    const removeCartItem=(id)=>{
        const updatedCart = data.cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setData(prev=>({...prev, cart: updatedCart}));
    }
    return(
        <div className="cartContainer">
            
            {cartList.length === 0 ?(
                <div className="emptyCartContainer">
                    <h1 className="emptyCart">Your cart is empty</h1>
                </div>
            ):(
                <>
                <h1 className="cartLength">Cart Size: {cartList.length}</h1>
                <ul className="cartList">
                
                <li className="cartItem textAlign largeScreenItem">
                    <p className="col1">Item</p>
                    <p className="col2">Delete Item</p>
                    <p className="col2">Price</p>
                    <p className="col2">Quantity</p>
                    <p className="col2">Total</p>

                </li>
                {cartList.map((item) => (
                    <CartItem key={item.id} item={item} updateCart={updateCartItem} removeCartItem={removeCartItem}/>
                ))}
                <li className="cartItem flexAlign">
                    <div className="totalPriceContainer">
                        <p className="priceText">Total : <FaRupeeSign className="rupeeIcon"/>{cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                    </div>
                    
                </li>
                
            </ul>
            <Link to="/checkout" className="checkoutLink">
                <button className="checkoutBtn" >Checkout</button>
            </Link>
            </>
            )}
            
        </div>
    )
}
export default Cart;