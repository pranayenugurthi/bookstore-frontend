import { use, useContext, useEffect,useState } from "react";
import "./index.css";
import { useLocation,Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyContext from "../Context/MyContext";
import axios from "axios";
import Cookies from "js-cookie";
import Comment from "../Comment";
import { FaStar,FaRupeeSign } from "react-icons/fa";
import Rating from "../Rating";
import RelatedBooks from "../RelatedBooks";

const BookDetails = () => {
    const location = useLocation();
    const {data,setData}=useContext(MyContext)
    const [ratingsCount,setRatingsCount]=useState(0);
    const [bookComments,setBookComments]=useState([])
    const [rating,setRating]=useState({data:[]});
    const { id } = useParams();
    console.log("bookId:", id);
    // console.log("Location:", location.state);
     
     let { book } = location?.state||{};
     
    if(!book){
        const foundBook=data.books.find(each=>each.id===parseInt(id));
        if(foundBook){
            //console.log("Found book from context:", foundBook);
            book=foundBook;
        }else{
            console.log("Book not found in context for id:", id);
           
        }
    }
    let cookieData = Cookies.get("userLogin");
    if (cookieData) {
        cookieData = JSON.parse(cookieData);
    }
  //  console.log("Cookie Data:", cookieData);
    const username=data.userDetails?.username||cookieData?.username;

   const getRating=async()=>{
       const ratingResponse=await axios(`https://bookstore-backend-du2z.onrender.com/book/${book.id}/rating`)
       const ratings=await ratingResponse.data;
      // console.log("Ratings in fetching:", ratings);
    setRating({data:ratings});
   }
   const getComments=async()=>{
       const commentResponse=await axios(`https://bookstore-backend-du2z.onrender.com/book/${book.id}/comments`);
       const comments=await commentResponse.data;
      // console.log("Comments in fetching:", comments);
        setBookComments(comments);

   }
    const getRatingAndComments=async()=>{
       await Promise.all([getRating(), getComments()]);
   }
    useEffect(()=>{
        setData(prev=>({...prev,pageType:"bookDetails"}))
    },[])
    useEffect(()=>{
        if(book){
            console.log("BookDetails useEffect")
            const notSameBooks=data.books.filter(each=>each.id!==book.id);
            getRatingAndComments();
        } 
    },[])
    
    // console.log(user)
   if(!cookieValue){
        if(!data.userDetails){
            console.log("in Books checking", data.userDetails);
            return <Navigate to="/login" />
        }
    }
    if(!book){
        return
    }
    
    const handleAddComment=async (comment)=>{
       // console.log("add Comment",comment);
        const response=await axios.post(`https://bookstore-backend-du2z.onrender.com/book/${book.id}/addComments`, {
            username:data.userDetails.username,
            comment,
            
        });
        const result=await response.data;
       // console.log("Comment added:", result);
        getComments();

    }


    const handleAddRating=async (userRating)=>{
        // console.log("add Rating",userRating);
       
      //  console.log("Username:", username);
        if(!username){
            return;
        }
        const checkRatingExist=rating.data.find(each=>each.bookId===book.id && each.username===username);
        if(checkRatingExist){
            const response=await axios.put(`https://bookstore-backend-du2z.onrender.com/book/${book.id}/updateRating`, {
                username,
                rating:userRating
            });
            const result=await response.data;
        }else{
            const response=await axios.post(`https://bookstore-backend-du2z.onrender.com/book/${book.id}/addRating`, {
            username,
            rating:userRating
            });
            const result=await response.data;
        }
        
        getRating();
    }
    const bookInCart = data.cart.some(eachBook=> eachBook.id === book.id);
    const handleAddToCart=()=>{
        
        let updatedCart=[];
        if(bookInCart){
            updatedCart=data.cart.filter(eachBook => eachBook.id !== book.id);
            
        }else{
            updatedCart=[...data.cart,{...book,quantity:1}];
        }
        setData(prev=>({...prev,cart:updatedCart}))
    }
     const averageRating=rating.data.length === 0 ? 0 : rating.data.reduce((acc,each)=>(acc+each.rating),0)/rating.data.length;
     const userRating=rating.data.length===0? 0:rating.data.find(each=>each.username===username && each.bookId===book.id)?.rating||0;
    return (
        <div className="bookDetailsPage">
            <div className="detailsNReleatedBooks">
                <div className="bookDetailsContainer">
                    <img src={book.coverImage} alt={book.title} className="bookDetailCoverImg"/>
                    <div className="bookInfo">
                        <h2 className="bookDetailsType"><span className="bookDetailsLabel">Title:</span>{book.title}</h2>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Author:</span>{book.author}</p>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Genre:</span>{book.genre}</p>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Page Count:</span>{book.pageCount}</p>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Language:</span>{book.language}</p>
                        <p className="bookDetailsType ratingFlex"><span className="bookDetailsLabel">Rating:</span>{averageRating}<FaStar className="greenStar"/> (users: {rating.data.length})</p>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Price:</span><FaRupeeSign className="rupeeIcon"/>{book.price}</p>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Published Date:</span>{new Date(book.publishedDate).toLocaleDateString()}</p>
                        <p className="bookDetailsType"><span className="bookDetailsLabel">Description:</span>{book.description}</p>
                        
                        <div className="bookDetailsButtonsFlex">
                            <button className="bookDetailsButton">Buy</button>
                            <button className="bookDetailsButton" onClick={handleAddToCart}>{bookInCart ? "Remove from Cart" : "Add to Cart"}</button>
                            <button className="bookDetailsButton">Wishlist</button>
                        </div>
                    </div>
                </div>
                <div className="relatedBooks lgRelatedBooks">
                    <h3 className="relatedBooksTitle">Related Books</h3>
                    <RelatedBooks books={data.books} currentBook={book}/>
                </div>
            </div>
            <div className="bookCommentsRating">
             <Rating handleAddRating={handleAddRating} username={username} rating={rating} book={book} userRating={userRating}/>
            <Comment handleAddComment={handleAddComment} comments={bookComments}/>
             </div>
            <div className="relatedBooks smRelatedBooks">
                    <h3 className="relatedBooksTitle">Related Books</h3>
                    <RelatedBooks books={data.books} currentBook={book}/>
                </div>

        </div>
    );
};

export default BookDetails;