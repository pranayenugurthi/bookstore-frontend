import axios from "axios";
import "./index.css";
import MyContext from "../Context/MyContext";
import { useContext, useState } from "react";
import { useNavigate ,Navigate} from "react-router-dom";
import { FaUser,FaLock ,FaCheckCircle,FaKey} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Cookies from "js-cookie";
import ForgotPassword from "../ForgotPassword";
import SignUp from "../SignUp";

const Login=()=>{
    const {data,setData}=useContext(MyContext);
    const [user,setUser]=useState({username:"",password:"",role:"user",confirmPassword:"",resetPwd:"",error:""});
    const [errorMsg, setErrorMsg] = useState({errorName:"",errorPassword:"",errorResetPwd:""});
    const [displayForm,setDisplayForm]=useState({isLogin:true,isSignup:false,isForgotPwd:false});
   
    const navigate=useNavigate();
    
    const cookieValue=Cookies.get("userLogin");

    if(data.userDetails!==null && cookieValue!==undefined){
        console.log("navigating to banner",data.userDetails)
        return <Navigate to="/" />
    }
    const checkUserDetails=()=>{
       
        if(user.username && user.password){
            if(user.username.length < 3 && user.password.length < 8){
               
                return({...errorMsg, errorName: "Username must be at least 3 characters long", errorPassword: "Password must be at least 8 characters long"});
            } else if (user.username.length < 3) {
                
                return({...errorMsg, errorName: "Username must be at least 3 characters long"});
            } else if (user.password.length < 8) {
                
                return({...errorMsg, errorPassword: "Password must be at least 8 characters long"});
            } else {
                
                return({...errorMsg, errorName: "", errorPassword: ""});
            }
        }
        if(!user.username) {
           
            return({...errorMsg, errorName: "Username cannot be empty"});
        }
        if(!user.password){
           
            return({...errorMsg, errorPassword: "Password cannot be empty"});
        }
    }
    const checkUserExist=async (checkingType)=>{
        const response=await axios.get("https://bookstore-backend-du2z.onrender.com/users");
        if(response.status === 200 && response?.data.length>0){
            let userExist;
            if(checkingType === "login"){
                userExist = response.data.find(eachUser => (eachUser.username === user.username && eachUser.password === user.password));
                return userExist;
            }else {
                userExist = response.data.find(eachUser => (eachUser.username === user.username));
                return userExist;
            }
        }
    }
    const addUserToDB=async ()=>{
     
        const newUser={
            username: user.username,
            password: user.password,
            role: "user",
            resetPwd: user.resetPwd
        };
        const response=await axios.post("https://bookstore-backend-du2z.onrender.com/addUser", newUser);
       
        if(response.status === 201){
            console.log("User added successfully:", response.data);
        }
    }
    const handleSignup=async ()=>{
        const msg = checkUserDetails();
        
      
        if(!msg.errorName && !msg.errorPassword){
           
            const userExist=await checkUserExist("signup");
            if(userExist){
                console.log("User already exists");
                setUser({...user, error: "User already exists"});
            }else{
                addUserToDB();
                setUser({...user, error: ""});
                Cookies.set("userLogin",JSON.stringify({username:user.username,role:user.role,password:user.password}),{expires:1});
                setData(prev => ({ ...prev, userDetails: {username:user.username,role:user.role,password:user.password} }));
                navigate("/");
            }
        }else{
            setErrorMsg(msg);
        }
    }
    const handleLogin=async ()=>{
       
        const msg = checkUserDetails();
        if(!msg.errorName && !msg.errorPassword){
            const userExist=await checkUserExist("login");
            if(userExist){
                Cookies.set("userLogin",JSON.stringify({username:userExist.username,role:userExist.role,password:userExist.password}),{expires:1});
                setUser({...user, error: ""});
                setErrorMsg({errorName:"",errorPassword:""});
                setData(prev => ({ ...prev, userDetails: {username:userExist.username,role:userExist.role,password:userExist.password} }));
                navigate("/");
            }else{
                setUser({...user, error: "User does not exist"});
            }
        }else{
            setErrorMsg(msg);
        }
    }



    const handleForgotPassword=()=>{
      
        setDisplayForm({isLogin:false,isSignup:false,isForgotPwd:true});
        setUser({username:"",password:"",role:"user",confirmPassword:"",resetPwd:"",error:""})
        setErrorMsg({errorName:"",errorPassword:"",errorResetPwd:""});
        
    }

   
        const setSignupState=()=>{
        setDisplayForm({isLogin:false,isSignup:true,isForgotPwd:false});
        setUser({username:"",password:"",role:"user",confirmPassword:"",resetPwd:"",error:""});
    }
   
    const setLoginState=()=>{
        setDisplayForm({isLogin:true,isSignup:false,isForgotPwd:false});
        setUser({username:"",password:"",role:"user",confirmPassword:"",resetPwd:"",error:""});
    }

        const onBlurUser=(type)=>{
        if(type === "username"){
            if(user.username.length===0){
                setErrorMsg(prev => ({ ...prev, errorName: "Username cannot be empty" }));
            }else if(user.username.length<3){
                setErrorMsg(prev => ({ ...prev, errorName: "Username must be at least 3 characters long" }));
            }else{
                setErrorMsg(prev => ({ ...prev, errorName: "" }));
            }
        }else if(type === "password"){
            if(user.password.length===0){
                setErrorMsg(prev => ({ ...prev, errorPassword: "Password cannot be empty" }));
            }else if(user.password.length<6){
                setErrorMsg(prev => ({ ...prev, errorPassword: "Password must be at least 6 characters long" }));
            }else{
                setErrorMsg(prev => ({ ...prev, errorPassword: "" }));
            }
        }
    }
    const loginContent=()=>{
        return(
            <>
                <h1 className="loginTitle">User Login</h1>

                {user.error && <p className="errorMessage">{user.error}</p>}
                    
                    <div className="inputContainer">
                        <FaUser className="userIcon"/>
                        <input 
                            type="text"
                            id="username"
                            className="inputField"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        onBlur={() => onBlurUser("username")} 
                        placeholder="Enter your username"
                        />
                    </div>
                    {errorMsg.errorName && <p className="errorMessage">{errorMsg.errorName}</p>}

                    <div className="inputContainer">
                        <FaLock className="userIcon"/>
                        <input 
                            type="password"
                            id="password"
                        className="inputField"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        onBlur={() => onBlurUser("password")}
                        placeholder="Enter your password"
                        />
                    </div>
                    {errorMsg.errorPassword && <p className="errorMessage">{errorMsg.errorPassword}</p>}

                 <p className="forgotPassword" onClick={() => handleForgotPassword()}>forgot password ?</p>
                 <button className="loginBtn" onClick={() => handleLogin()}>Login</button>
                <p className="signupPrompt">New user ?<span onClick={() => setDisplayForm({isLogin:false,isSignup:true,isForgotPwd:false})} className="signupLink">Signup</span></p>
            </>
        )
    }
    return(
        <div className="loginContainer">
            <div className="loginContent">
                {/* <h1 className="loginTitle">Welcome to BookStore</h1> */}
                {displayForm.isForgotPwd && <ForgotPassword user={user} setUser={setUser} setData={setData} errorMsg={errorMsg} setErrorMsg={setErrorMsg} setLoginState={setLoginState} setSignupState={setSignupState} checkUserExist={checkUserExist} onBlurUser={onBlurUser}/>}
                {displayForm.isSignup && <SignUp user={user} setUser={setUser} errorMsg={errorMsg} setLoginState={setLoginState} setSignupState={setSignupState} checkUserExist={checkUserExist} onBlurUser={onBlurUser} handleSignup={handleSignup}/>}
                {displayForm.isLogin && loginContent()}
                
            </div>
        </div>
    )
}
export default Login