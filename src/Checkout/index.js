import MyContext from "../Context/MyContext";
import { Link ,useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import "./index.css"
const Checkout = () => {
    const {data,setData} = useContext(MyContext);
    const {cart,userDetails}=data
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(data.pageType!=="checkout"){
            setData({...data,pageType:"checkout"})
        }
    },[data,setData])
    // if(userDetails===null){
    //     console.log("user not logged in");
    //     navigate("/login");
    // }
    const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    return (
        <div className="checkoutPage">
            
        <div className="checkoutContainer">
            
            <div className="shippingAddress">
              
                <h1 className="shippingAddressTitle">Shipping Address</h1>
                <input type="text" className="checkoutInput" placeholder="Name" />
                 <input type="text" className="checkoutInput" placeholder="City" />
                  <input type="text" className="checkoutInput" placeholder="State" />
                   <input type="text" className="checkoutInput" placeholder="Pincode" />
                <input type="text" className="checkoutInput" placeholder="Email" />
                <input type="text" className="checkoutInput" placeholder="Phone Number" />
                <h1 className="paymentMethodTitle">Payment Method</h1>
                <p className="paymentMethod">Only Cash on Delivery</p>
                <button className="orderBtn">Place Order</button>
            </div>
            <div className="orderSummary">
                <h1 className="orderSummaryTitle">Order Summary</h1>
                <div className="summaryLengthNPrice">
                    <h3 className="summaryDetails">Cart({cart.length} items)</h3>
                    <h3 className="summaryDetails">Total: {totalPrice}.00</h3>
                </div>
                
                {cart.map(item => (
                    <div key={item.id} className="orderListItem">
                        <div className="imageNDetailsFlex">
                        <img src={item.coverImage} className="checkoutItemImage"/>
                        <div className="itemDetailsFlex">
                            <p className="orderItemDetails">Title: {item.title}</p>
                            <p  className="orderItemDetails">Author: {item.author}</p>
                            <p className="orderItemDetails">quantity: {item.quantity}</p>
                        </div>
                        </div>
                        <p className="orderItemDetails">{item.quantity * item.price}</p>

                    </div>
                ))}
                
            </div>
        </div>
        
        
        </div>
    )
}
export default Checkout;
