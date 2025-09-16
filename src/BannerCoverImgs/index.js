import { useEffect, useState } from "react"
import "./index.css"


const BannerCoverImgs=({data})=>{
    
    const [sampleBooks,setSampleBooks]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
  

     useEffect(()=>{
        if(!data?.books?.length) return;
        
        const getRandomBooks=()=>{
            const randomBooks=[];
            while(randomBooks.length<12){
                const index=Math.floor(Math.random()*data.books.length);
                if(!randomBooks.some(each=>each.isbn===data.books[index].isbn)){
                    randomBooks.push(data.books[index]);
                }
            }
            console.log("checking when interval is started",randomBooks)
            setSampleBooks(randomBooks);
            setIsLoading(false)
        }

        const timeOut=setTimeout(()=>{
            getRandomBooks();
        },10)
        
        const intervalId=setInterval(()=>{
            getRandomBooks();
        },5000)
        return () => {
            clearInterval(intervalId);
        }
   },[data.books])
    console.log("sampleBooks:", sampleBooks);
    if(isLoading){
        return <h1>loading...</h1>
    }
    return (
        <ul className="coverImgList">
        {sampleBooks.map((book)=>{
            
            return(
            
            <li key={book.isbn}>
                <img src={book.coverImage} alt="cover Img" className="coverImages"/>
            </li>
            )
        })}
        </ul>
    )
}
export default BannerCoverImgs