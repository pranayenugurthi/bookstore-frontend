import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"
const RelatedBooks=({books,currentBook})=>{
    
    const navigate=useNavigate();
   
    const [relatedBooks,setRelatedBooks]=useState([]);
    console.log("relatedBooks",relatedBooks)
    
    const viewRelatedBook=(book)=>{
        console.log("Viewing related book:", book);
        navigate(`/book/${book.id}`,{state: {book}});
       
    }
    useEffect(()=>{
       setRelatedBooks(books?.toSorted((a,b)=>Math.random()-Math.random()).slice(0,5));
    },[books])
    if(relatedBooks.length===0){
        return <p>Loading related books...</p>
    }
    const list=relatedBooks;
    return(
        <div className="relatedBooksFlex">
            {list.map(book=>(
                <div key={book.id} className="relatedBookItem" onClick={()=>viewRelatedBook(book)}>
                    <img src={book.coverImage} alt={book.title} className="relatedBookCover"/>
                </div>
            ))}
        </div>
        )
}
export default RelatedBooks;