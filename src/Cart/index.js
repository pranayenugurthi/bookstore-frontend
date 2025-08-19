import { useContext, useEffect, useState } from "react";
import MyContext from "../Context/MyContext";
import "./index.css"
import CartItem from "../CartItem";
const Cart=()=>{
    const {data,setData}=useContext(MyContext);

     useEffect(()=>{
        setData(prev=>({...prev,displayCartItems:true,showFilters:false,inBooksPage:false}));
     },[])

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

    const cartList=JSON.parse(localStorage.getItem("cart")) || data.cart;

    return(
        <div className="cartContainer">
            <h1 className="cartLength">Cart Size: {cartList.length}</h1>
            <ul className="cartList">
                <li className="cartItem textAlign">
                    <p className="itemTitle">Item</p>
                    <p className="itemDetails">Price</p>
                    <p className="itemDetails">Quantity</p>
                    <p className="itemDetails">Total</p>
                </li>
                {cartList.map((item) => (
                    <CartItem key={item.id} item={item} updateCart={updateCartItem} />
                ))}
                <li className="cartItem flexAlign">
                    <div className="totalPrice">
                        <p className="">Total : {cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                    </div>
                    
                </li>
            </ul>
        </div>
    )
}
export default Cart;