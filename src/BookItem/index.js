import BookDetails from "../BookDetails";
import "./index.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
const BookItem = ({ book, onSave, setData, cart,user }) => {
    // console.log(cart)
    const bookInCart = cart?.some(eachBook=> eachBook.id === book.id)
    const [bookValues,setBookValues]=useState({});
    const navigate = useNavigate();
    const checkForChanges=()=>{
         if(JSON.stringify(book)===JSON.stringify(bookValues)){
            console.log("book details not changed");
            setBookValues({});
            return;
        }
        if(isNaN(bookValues.price) || bookValues.price <= 0){
            console.log("Invalid price");
            return;
        }
         onSave(bookValues);
        setBookValues({});
    }
    const cartUpdate=(book)=>{

        if(bookInCart){
            console.log("removing book from cart bookId :",book.id);
            setData(prev=>({...prev,cart:prev.cart.filter(eachBook => eachBook.id !== book.id)}))
        }else{
            book.quantity = 1;
            console.log("adding book to cart bookId :",book.id);
            setData(prev=>({...prev,cart:[...prev.cart,book]}));
        }
        
    }
    
    const cartBtnText = bookInCart ? "Remove from Cart" : "Add to Cart";
    useEffect(()=>{
        localStorage.setItem(`${user?.username}Cart`, JSON.stringify(cart));
    },[cart])
     const randomPrice = Math.floor(Math.random()*800)+150;
    
    const viewBookDetails=(book)=>{
       navigate(`/book/${book.id}`, { state: { book } });
    }
    const date = new Date(book.publishedDate);
    // console.log("userRole",user?.role)
    const publishedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        return(
        <li key={book.id} className="bookItem">
            <img src={book.coverImage} alt={book.title} className="bookCoverImg"/>
            <div className="bookDetails">
                {bookValues.id === book.id ? (
                    <>
                    <input type="text" value={bookValues.title} onChange={(e)=>setBookValues({...bookValues,title:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.author} onChange={(e)=>setBookValues({...bookValues,author:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.genre} onChange={(e)=>setBookValues({...bookValues,genre:e.target.value})} className="detailInput"/>
                    {/* <input type="text" value={bookValues.pageCount} onChange={(e)=>setBookValues({...bookValues,pageCount:e.target.value})} className="detailInput"/> */}
                    {/* <input type="text" value={bookValues.language} onChange={(e)=>setBookValues({...bookValues,language:e.target.value})} className="detailInput"/> */}
                    <input type="text largeScreen" value={bookValues.description} onChange={(e)=>setBookValues({...bookValues,description:e.target.value})} className="detailInput"/>  
                    <input type="text" value={bookValues.price} onChange={(e)=>setBookValues({...bookValues,price:e.target.value})} className="detailInput"/>  
                    <input type="text" value={bookValues.coverImage} onChange={(e)=>setBookValues({...bookValues,coverImage:e.target.value})} className="detailInput"/>  
                    </>
                ):(
                <>
                <h1 className="bookTitle"><span className="detailType">Title       :</span> {book.title}</h1>
                    <p className="bookDetailsText"><span className="detailType">Author      :</span> {book.author}</p>
                    <p className="bookDetailsText"><span className="detailType">Genre       :</span> {book.genre}</p>
                    {/* <p className="bookDetailsText"><span className="detailType">Page Count  :</span> {book.pageCount}</p> */}
                    {/* <p className="bookDetailsText"><span className="detailType">Language    :</span> {book.language}</p> */}
                    <p className="bookDetailsText largeScreen"><span className="detailType">Description :</span> {book.description}</p>
                    {/* <p className="bookDetailsText"><span className="detailType">Published    :</span> {publishedDate}</p> */}
                    <p className="bookPrice"><span className="detailType ">Price       :</span><FaRupeeSign className="rupeeIcon"/>{book?.price}<span className="priceTag"></span></p>
                </>
                )}
            
                <div className="btnContainer largeScreen">
                    {(bookValues.id !== book.id && user?.role!=="user") && <button className="bookBtn" onClick={()=>setBookValues({...book,price:randomPrice})}>Edit</button>}
                    {bookValues.id === book.id && <button className="bookBtn" onClick={()=>setBookValues({})}>Cancel</button>}
                    {bookValues.id === book.id && <button className="bookBtn" onClick={()=>checkForChanges(book)}>Save</button>}
                    <button className="bookBtn" onClick={()=>{cartUpdate(book)}}>{cartBtnText}</button>
                    <button className="bookBtn" onClick={()=>{viewBookDetails(book)}}>View</button>
                </div>
            </div>
            <div className="bookDetails smallScreen">
                 {bookValues.id === book.id ? <input type="text" value={bookValues.description} onChange={(e)=>setBookValues({...bookValues,description:e.target.value})} className="detailInput smInputText"/>
                 :(
                     <p className="bookDetailsText"><span className="detailType">Description :</span> {book.description}</p>
                 )}
                 <div className="btnContainer">
                    {(bookValues.id !== book.id && user?.role!=="user") && <button className="bookBtn" onClick={()=>setBookValues({...book,price:randomPrice})}>Edit</button>}
                    {bookValues.id === book.id && <button className="bookBtn" onClick={()=>setBookValues({})}>Cancel</button>}
                    {bookValues.id === book.id && <button className="bookBtn" onClick={()=>checkForChanges(book)}>Save</button>}
                    <button className="bookBtn" onClick={()=>{cartUpdate(book)}}>{cartBtnText}</button>
                    <button className="bookBtn" onClick={()=>{viewBookDetails(book)}}>View</button>
                </div>
            </div>

        </li>
    )
}
export default BookItem;