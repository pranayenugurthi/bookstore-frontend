import "./index.css"
import { MdDelete } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
const CartItem=({item,updateCart,removeCartItem})=>{

    const handleQuantityChange = (id, quantity, updateValue) => {
       
        if( updateValue < 1) {
            quantity = quantity - 1;
            if(quantity < 1) {
                return;
            }else{
                 updateCart(item.id, quantity);
            }
        }else{
            quantity += updateValue;
            updateCart(item.id, quantity);
        }
        
    }
    const onRemove = (id) => {
        removeCartItem(id);
    }
    return (
        <>
        <li key={item.id} className="largeScreenCartItem cartItem">
     
                <div className="cartBookDetails col1 ">
                    <img src={item.coverImage} alt={item.title} className="itemImage"/>
                    <div className="bookDetailsFlex ">
                        <p className="bookCartTitle"><span className="cartBookSpan">Title :</span>{item.title}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">Author :</span>{item.author}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">Publisher :</span>{item.publisher}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">Genre :</span>{item.genre}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">pages :</span>{item.pageCount}</p>
                    </div>
                </div>
                <div className="col2">
                    <button className="removeCartItem" onClick={()=>onRemove(item.id)}><MdDelete/></button>
                </div>
                <p className="col2">{item.price}</p>
                    <div className="col2">
                        <button className="quantityBtn" onClick={() => handleQuantityChange(item.id, item.quantity, -1)}>-</button>
                        <span className="quantityText">{item.quantity}</span>
                        <button className="quantityBtn" onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>+</button>
                    </div>
                <p className="col2">{item.price*item.quantity}</p>        
        </li>
        <li className="smallScreenCartItem">
            
                <div className="flexRow">
                    <img src={item.coverImage} alt={item.title} className="itemImage"/>
                    <div className="bookDetailsFlex ">
                        <p className="bookCartTitle"><span className="cartBookSpan">Title :</span>{item.title}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">Author :</span>{item.author}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">Publisher :</span>{item.publisher}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">Genre :</span>{item.genre}</p>
                        <p className="bookCartTitle"><span className="cartBookSpan">pages :</span>{item.pageCount}</p>
                    </div>
                </div>
                  <div className="flexRow alignCenter">
                
                   
                
                    <div className="quantityUpadteBtns">
                        <button className="quantityBtn" onClick={() => handleQuantityChange(item.id, item.quantity, -1)}>-</button>
                    <span className="quantityText">{item.quantity}</span>
                    <button className="quantityBtn" onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>+</button>
                    </div>
                        

                    <p className="col2">price: <FaRupeeSign className="cartRupeeIcon"/>{item.price*item.quantity}</p>
                     <button className="removeCartItem" onClick={()=>onRemove(item.id)}><MdDelete/></button>
                  </div>
                
            
        </li>
        </>
    )
}
export default CartItem;