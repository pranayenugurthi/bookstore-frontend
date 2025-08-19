import "./index.css"
const CartItem=({item,updateCart})=>{

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

    return (
        <li key={item.id} className="cartItem">
                        <div className="cartBookItem">
                            <img src={item.coverImage} alt={item.title} className="itemImage"/>
                            <div className="bookDetailsFlex">
                                <p className="bookCartTitle"><span className="cartBookSpan">Title :</span>{item.title}</p>
                                <p className="bookCartTitle"><span className="cartBookSpan">Author :</span>{item.author}</p>
                                <p className="bookCartTitle"><span className="cartBookSpan">Publisher :</span>{item.publisher}</p>
                                <p className="bookCartTitle"><span className="cartBookSpan">Genre :</span>{item.genre}</p>
                                <p className="bookCartTitle"><span className="cartBookSpan">pages :</span>{item.pageCount}</p>
                            </div>
                        </div>
                        <p className="itemDetails textAlign">{item.price}</p>
                         <div className="itemQuantity">
                             <button className="quantityBtn" onClick={() => handleQuantityChange(item.id, item.quantity, -1)}>-</button>
                             <span className="quantityText">{item.quantity}</span>
                             <button className="quantityBtn" onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>+</button>
                         </div>
                        <p className="itemDetails textAlign">{item.price*item.quantity}</p>
                    </li>
    )
}
export default CartItem;