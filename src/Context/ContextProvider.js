import { useEffect, useState } from "react";
import axios from "axios";
import MyContext from "./MyContext";
import Cookies from "js-cookie";

const ContextProvider = ({ children }) => {
  const [data,setData]=useState({cart:[],books:[],pageType:"login",userDetails:{}});

  useEffect(()=>{
    
    const fetchData=async()=>{
      try{
        const response=await axios.get("http://localhost:3006/books");
        // const response=await axios.get("https://bookstore-o336.onrender.com/books");
        
          console.log("Fetched data:", response.data);
      
        const cookieValue = Cookies.get("userLogin");
        const cookieUserDetails=cookieValue?JSON.parse(cookieValue):null
        //console.log("Cookie value in ContextProvider:", cookieValue);
     
        const getCart=cookieUserDetails?.username+"Cart"
     
        const localCart=JSON.parse(localStorage.getItem(getCart));
       
        setData(prev=>({...prev,books:response.data,cart:localCart || [],
          userDetails: cookieUserDetails
        }));
      }catch(err){
        setData(prev=>({...prev,books:null,cart:[],userDetails:null}));
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