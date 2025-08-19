import ContextProvider from './Context/ContextProvider';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'; 
import './App.css';

import Home from './Home';
import Books from './Books';
import Banner from './Banner';
import Cart from './Cart';

function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    
      <Route path="/" element={<Home />} >
        <Route path="" element={<Banner />} />
        <Route path="books" element={<Books />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<div>Login Page</div>} />
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
