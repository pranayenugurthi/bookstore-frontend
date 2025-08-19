import { useContext, useEffect } from "react";
import MyContext from "../Context/MyContext";
import BannerCoverImgs from "../BannerCoverImgs";
import {useNavigate} from "react-router-dom";

import "./index.css"
const Banner=()=>{
    const {data,setData}=useContext(MyContext);
    console.log("Banner data:", data);
    const navigate=useNavigate();
    useEffect(()=>{
        setData(prev => ({ ...prev, displayCartItems: false ,inBooksPage:false}));
    },[data.books])

    return(
        <div className="bannerContainer">
            <div className="bannerContent">
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
        </div>
    )
}
export default Banner;