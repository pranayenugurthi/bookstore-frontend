import "./index.css"
import { useEffect, useState } from "react";
const BookItem = ({ book, onSave, setData, cart }) => {
    const bookInCart = cart.some(eachBook=> eachBook.id === book.id)
    const [bookValues,setBookValues]=useState({});
    const checkForChanges=()=>{
         if(JSON.stringify(book)===JSON.stringify(bookValues)){
            console.log("book details not changed");
            setBookValues({});
            return;
        }
        // onSave(bookValues);
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
        localStorage.setItem("cart", JSON.stringify(cart));
    },[cart])
    // const randomPrice = Math.floor(Math.random()*800)+150;
        return(
        <li key={book.id} className="bookItem">
            <img src={book.coverImage} alt={book.title} className="bookCoverImg"/>
            <div className="bookDetails">
                {bookValues.id === book.id ? (
                    <>
                    <input type="text" value={bookValues.title} onChange={(e)=>setBookValues({...bookValues,title:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.author} onChange={(e)=>setBookValues({...bookValues,author:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.genre} onChange={(e)=>setBookValues({...bookValues,genre:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.pageCount} onChange={(e)=>setBookValues({...bookValues,pageCount:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.language} onChange={(e)=>setBookValues({...bookValues,language:e.target.value})} className="detailInput"/>
                    <input type="text" value={bookValues.description} onChange={(e)=>setBookValues({...bookValues,description:e.target.value})} className="detailInput"/>  
                    <input type="text" value={bookValues.price} onChange={(e)=>setBookValues({...bookValues,price:e.target.value})} className="detailInput"/>  
                    </>
                ):(
                <>
                <h1 className="bookTitle"><span className="detailType">Title       :</span> {book.title}</h1>
                    <p className="bookDetailsText"><span className="detailType">Author      :</span> {book.author}</p>
                    <p className="bookDetailsText"><span className="detailType">Genre       :</span> {book.genre}</p>
                    <p className="bookDetailsText"><span className="detailType">Page Count  :</span> {book.pageCount}</p>
                    <p className="bookDetailsText"><span className="detailType">Language    :</span> {book.language}</p>
                    <p className="bookDetailsText"><span className="detailType">Description :</span> {book.description}</p>
                    <p className="bookPrice"><span className="detailType ">Price       :</span>{book?.price}Rs/-</p>
                </>
                )}
            
                <div className="btnContainer">
                    {bookValues.id !== book.id && <button className="bookBtn" onClick={()=>setBookValues({...book})}>Edit</button>}
                    {bookValues.id === book.id && <button className="bookBtn" onClick={()=>setBookValues({})}>Cancel</button>}
                    {bookValues.id === book.id && <button className="bookBtn" onClick={()=>checkForChanges(book)}>Save</button>}
                    <button className="bookBtn" onClick={()=>{cartUpdate(book)}}>{cartBtnText}</button>
                </div>
            </div>
            
        </li>
    )
}
export default BookItem;