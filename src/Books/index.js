import "./index.css";
import { useContext,useEffect,useRef ,useState} from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../Context/MyContext";
import { MdKeyboardDoubleArrowUp,MdOutlineSearch } from "react-icons/md";
import { LiaFilterSolid } from "react-icons/lia";
import Cookies from "js-cookie";
import axios from "axios";
import BookItem from "../BookItem";
const apiStatusList={
    initial: "Initial",
    pending: "Pending",
    success: "Success",
    error: "Error"
}
const Books=()=>{
    const {data,setData}=useContext(MyContext)  
    const [input,setInput]=useState("");
    const [filter,setFilter]=useState({price:"",genre:"",published:""});
    const [smFilter,setSmFilter]=useState(false)
    const [apiStatus,setApiStatus]=useState(apiStatusList.initial);
    const count=useRef(0)

    // const [bookCover,setBookCover]=useState("");
    // const intervalIdRef=useRef(null);

    
    useEffect(()=>{

        setData(prev =>({...prev,displayCartItems:true,showFilters:false,pageType:"books"}));
        // setApiStatus(apiStatusList.pending);
    },[])
    const cookieValue=Cookies.get("userLogin");
     console.log("userDetails",data.userDetails,cookieValue)
    if(data.userDetails===null && cookieValue===undefined){
        console.log("in Books checking", data.userDetails);
         return <Navigate to="/login" />
    }
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
        let filteredBooks;
        if(data.books===null && apiStatus!==apiStatusList.error){
            setApiStatus(apiStatusList.error)
        }
        if(apiStatus!==apiStatusList.pending && data.books?.length === 0){
            setApiStatus(apiStatusList.pending);
        }
        if(input.trim() === ""){
            filteredBooks = data.books;
        }else{
            filteredBooks = data.books.filter(book => 
            book.title.toLowerCase().includes(input.toLowerCase()) ||
            book.author.toLowerCase().includes(input.toLowerCase())
            );
        }
        if(filter.published==="latest"){
            filteredBooks = [...filteredBooks].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
        }
        if(filter.published==="oldest"){
            filteredBooks=[...filteredBooks].sort((a,b)=> new Date(a.publishedDate)- new Date(b.publishedDate));
        }
        if(filter.price === "low to high"){
            filteredBooks = [...filteredBooks].sort((a, b) => a.price - b.price);
        }
        if(filter.price === "high to low"){
            filteredBooks = [...filteredBooks].sort((a, b) => b.price - a.price);
        }
        if(filter.genre){
            filteredBooks = filteredBooks.filter(book => book.genre === filter.genre);
        }
       // console.log("checking books data", data.books);
        if(apiStatus!==apiStatusList.success && filteredBooks?.length > 0){
            setApiStatus(apiStatusList.success);
        }
         
        return filteredBooks;
    }
    const saveBookChanges = (book) => {
        
        updateDB(book.id,book)
        
        // setBookCover("");
    }
    
    const updateDB = async (id, book) => {
        console.log("Updating database with:", book);
        try {
            // const response = await axios.put(`https://bookstore-o336.onrender.com/books/${id}`, book);
            const response = await axios.put(`http://localhost:3006/books/${id}`, book);
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
    let filteredBooks = filterBooks()

    const onChangePublished=(value)=>{
        // setFilter(prev=>({...prev,published:e.target.value}))
       console.log("value",value)
    }
    
    count.current++;
    // console.log("page render count", count.current);
    // console.log("Cart:", data.cart);
   // console.log("Filtered Books:", filteredBooks);
    const genreList=[];
    data.books?.map(each=>{
        if(!genreList.includes(each.genre)){
            genreList.push(each.genre);
        }
    });
    console.log("Genre List:", genreList);
    const successBooksPage=()=>{
        return(
            <div className="booksContent">
                <ul className="bookList">
                    {filteredBooks?.map(book => <BookItem key={book.id} book={book} onSave={saveBookChanges} setData={setData} cart={data.cart} user={data.userDetails||cookieValue}/>)}
                </ul>
                {filteredBooks.length === 0 && <p>No books found.</p>}
               
            </div>
        )
    }
    const renderBooksPage=()=>{
        switch (apiStatus) {
            case apiStatusList.pending:
                return <p>Loading...</p>;
            case apiStatusList.success:
                return successBooksPage();
            case apiStatusList.error:
                return <p>Error loading data.</p>;
            default:
                break;
        }
}
    return (
        <div className="booksContainer">
            {
            data.showFilters && 
            <div className="filterOptions largeScreenFilter" >
                <select className="filterButton" onChange={(e)=>(setFilter(prev=>({...prev,published:e.target.value,price:""})),onChangePublished(e.target.value))}>
                    <option value="">Default</option>
                    <option value="latest">Latest Published</option>
                    <option value="oldest">Oldest Published</option>
                </select>
                <select className="filterButton" onChange={(e)=>setFilter(prev=>({...prev,price:e.target.value,published:""}))} value={filter.price || ""}>
                    <option value="">Default</option>
                    <option value="low to high">Low to High</option>
                    <option value="high to low">High to Low</option>

                </select>
                <select className="filterButton" onChange={(e)=>setFilter(prev=>({...prev,genre:e.target.value}))} value={filter.genre || ""}>
                    <option value="">Default</option>
                    {genreList.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
                <div className="searchContainer">
                    <input id="searchInputEl" type="text" placeholder="Search title,author" className="searchInput" onChange={(e)=>setInput(e.target.value)} value={input}/>
                    <MdOutlineSearch className="searchIcon" />
                </div>
                <button onClick={()=>{setFilter({}); setInput("");}}>Clear Filters</button>
                <MdKeyboardDoubleArrowUp className="hideFilter" onClick={()=>{closingFilter()}}/>
            </div>
            }
            <div className="filterOptions smallScreenFilter">
                <div className="searchContainer">
                    <input id="searchInputEl" type="text" placeholder="Search title, author" className="searchInput" onChange={(e)=>setInput(e.target.value)} value={input}/>
                    <MdOutlineSearch className="searchIcon" />
                </div>
                <button className="moreFiltersBtn" onClick={()=>setSmFilter(!smFilter)}><LiaFilterSolid className="filterIcon"/> Filters</button>
                
            </div>
            {
                smFilter && (
                    <div className="filterOptions smallScreenFilter">
                        <select className="filterButton" onChange={(e)=>setFilter(prev=>({...prev,published:e.target.value,price:""}))} value={filter.published}>
                            <option value="">Published</option>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                        <select className="filterButton" onChange={(e)=>setFilter(prev=>({...prev,price:e.target.value,published:""}))} value={filter.price}>
                            <option value="">Price</option>
                            <option value="low to high">Low to High</option>
                            <option value="high to low">High to Low</option>

                        </select>
                        <select className="filterButton" onChange={(e)=>setFilter(prev=>({...prev,genre:e.target.value}))} value={filter.genre}>
                            <option value="">Genre</option>
                            {genreList.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                )
            }
            
            {renderBooksPage()}
        </div>
    )
}
export default Books;