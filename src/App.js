import ContextProvider from './Context/ContextProvider';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'; 
import './App.css';

import Home from './Home';
import Books from './Books';
import Banner from './Banner';
import Cart from './Cart';
import Login from './Login';
import BookDetails from './BookDetails';
import Checkout from "./Checkout";
import Profile from './Profile';

function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    
      <Route path="/" element={<Home />} >
        <Route path="" element={<Banner />} />
        <Route path="books" element={<Books />} />
        <Route exact path="book/:id" element={<BookDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile/>}/>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
     
  
  ));
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
