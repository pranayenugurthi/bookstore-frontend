import { useContext, useEffect } from "react";
import MyContext from "../Context/MyContext";
import BannerCoverImgs from "../BannerCoverImgs";
import {useNavigate,} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css"
const Banner=()=>{
    const {data,setData}=useContext(MyContext);
    console.log("Banner data:", data);
    const navigate=useNavigate();
    
    useEffect(()=>{
        setData(prev => ({ ...prev, displayCartItems: false ,pageType:"banner"}));
    },[data.books])
    const cookieValue=Cookies.get("userLogin");
    console.log("cookieValue", cookieValue)
    if(!cookieValue){
        if(!data.userDetails){
            return <Navigate to="/login" />
        }
    }
    if(data.userDetails===null && cookieValue===undefined){
        console.log("User not logged in, redirecting to login page");
        
    }
    return(
        <div className="bannerContainer">
            
                <BannerCoverImgs data={data}/>
                <p className="bannerText"> 
                    Welcome to our bookstore—the perfect place to find your 
                    next great read! Here, every book offers a chance to explore 
                    new stories, learn something new, and dive into exciting adventures. 
                    Whether you love popular hits or hidden treasures, we have something 
                    special for every reader. Come in, browse, and let the magic of books 
                    inspire you!
                </p>
                <button className="bannerButton" onClick={() => {navigate("/books")}}>Shop Now</button>
          
        </div>
    )
}
export default Banner;