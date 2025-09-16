import { useEffect, useState } from "react";
import { FaStar,FaRupeeSign } from "react-icons/fa";
import "./index.css"
const Rating=({handleAddRating,username,rating,book,userRating})=>{
    
    const myRating = rating.data.find(each=>each.username===username && book.id===each.bookId)?.rating||0;
    // console.log("myRating:",myRating);

    const [currentUserRating,setCurrentUserRating]=useState(null);
    const [oldRating,setOldRating]=useState(null);
    const [errorRating,setErrorRating]=useState("");
    useEffect(()=>{
        console.log("in UseEffect")
        setCurrentUserRating(0);
        setOldRating(userRating);

    },[userRating,book])
    const ratingValue=currentUserRating||oldRating;
    const submitRating=()=>{
        if(currentUserRating===oldRating || currentUserRating===null){
            setErrorRating("Please select a different rating before submitting.");
            return;
        }
        setErrorRating("")
        handleAddRating(currentUserRating);
    }
    return(
        
        <div className="ratingCard">
            <h1 className="ratingHead">Rating</h1>
            <p className="ratingText">Pick a star, make your opinion count.</p>
            <div className="starsContainer">
                <FaStar className={ratingValue >= 1 ? "filled" : "unFilled"} onClick={()=>setCurrentUserRating(1)}/>
                <FaStar className={ratingValue >= 2 ? "filled" : "unFilled"} onClick={()=>setCurrentUserRating(2)}/>
                <FaStar className={ratingValue >= 3 ? "filled" : "unFilled"} onClick={()=>setCurrentUserRating(3)}/>
                <FaStar className={ratingValue >= 4 ? "filled" : "unFilled"} onClick={()=>setCurrentUserRating(4)}/>
                <FaStar className={ratingValue >= 5 ? "filled" : "unFilled"} onClick={()=>setCurrentUserRating(5)}/>
            </div>
            <p className="ratingValue">Your Rating: {ratingValue}</p>
            
            <button className="ratingButton" onClick={()=>submitRating()}>Submit Rating</button>
            <p className="errorRating">{errorRating}</p>
        </div>
    )
}
export default Rating;