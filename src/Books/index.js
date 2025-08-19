import "./index.css";
import { useContext,useEffect,useRef ,useState} from "react";
import MyContext from "../Context/MyContext";
import { MdKeyboardDoubleArrowUp,MdOutlineSearch } from "react-icons/md";
import axios from "axios";
import BookItem from "../BookItem";

const Books=()=>{
    const {data,setData}=useContext(MyContext)  
    const [input,setInput]=useState("");

    // const [bookCover,setBookCover]=useState("");
    // const intervalIdRef=useRef(null);

    useEffect(()=>{
        setData(prev =>({...prev,displayCartItems:true,showFilters:false,inBooksPage:true}));
    },[])


    const closingFilter=()=>{
        setData(prev => ({ ...prev, showFilters: false }));
        // if(intervalIdRef.current) return;
        // intervalIdRef.current=setInterval(()=>{
        //     setTop(prevTop=>{
              
        //         if(prevTop<=-50){
        //             setData(prev=>({...prev,showFilters:false}))
                     
        //             clearInterval(intervalIdRef.current)
        //             intervalIdRef.current=null;
        //             return 0;
                    
        //         }else{
        //             // setTop(prevTop=>(prevTop-1))
        //             return prevTop-1;
        //         }
                
        //     })
           
        // },5)
    }
    const filterBooks=()=>{
        if(input.trim() === ""){
            return data.books;
        } 
        const filteredBooks = data.books.filter(book => 
            book.title.toLowerCase().includes(input.toLowerCase()) ||
            book.author.toLowerCase().includes(input.toLowerCase()) ||
            book.genre.toLowerCase().includes(input.toLowerCase())
        );
        return filteredBooks;
    }
    const saveBookChanges = (book) => {
        
        updateDB(book.id,book)
        
        // setBookCover("");
    }
    
    const updateDB = async (id, book) => {
        console.log("Updating database with:", book);
        try {
            const response = await axios.put(`https://bookstore-7-w0k1.onrender.com/books/${id}`, book);
            if(response.status===200){
                setData(prevData => ({
                    ...prevData,
                    books: prevData.books.map(each => (each.id === id ? { ...each, ...book } : each))
                }));
            }
            console.log("Database updated:", response.data);
        } catch (error) {
            console.error("Error updating database:", error);
        }
    };
    const filteredBooks = filterBooks()
    const count=useRef(0)
    count.current++;
    console.log("page render count", count.current);
    console.log("Cart:", data.cart);
    return (
        <div className="booksContainer">
            {
            data.showFilters && 
            <div className="filterOptions" >
                <p className="filterText">Filters</p>
                <div className="searchContainer">
                    <input id="searchInputEl" type="text" placeholder="Search books..." className="searchInput" onChange={(e)=>setInput(e.target.value)} value={input}/>
                    <MdOutlineSearch className="searchIcon" />
                </div>
                
                <MdKeyboardDoubleArrowUp className="hideFilter" onClick={()=>{closingFilter()}}/>
            </div>
            }
            <div className="booksContent">
                <ul className="bookList">
                    {filteredBooks?.map(book => <BookItem key={book.id} book={book} onSave={saveBookChanges} setData={setData} cart={data.cart}/>)}
                </ul>
                <button onClick={()=>{updateDB()}}>save All books</button>
            </div>
           
        </div>
    )
}
export default Books;