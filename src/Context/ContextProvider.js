import { useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./MyContext";

const ContextProvider = ({ children }) => {
  const [data,setData]=useState({cart:[],books:[],inBooksPage:false});
  useEffect(()=>{
    
    const fetchData=async()=>{
      try{
        //const request=await axios.post("http://localhost:3006/allBooks");
        const response=await axios.get("https://bookstore-ea3m.onrender.com/books");
        console.log("Fetched data:", response.data);
        const localCart=JSON.parse(localStorage.getItem("cart"));
        setData(prev=>({...prev,books:response.data,cart:localCart || []}));
      }catch(err){
        console.error("Error fetching data:",err);
      }
    };
    fetchData();
  },[]);
  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};
export default ContextProvider;