import { useState } from "react";
import { FaUser,FaLock ,FaCheckCircle,FaKey} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ForgotPassword=({user,setUser,setData,checkUserExist,setLoginState,setSignupState,onBlurUser,errorMsg,setErrorMsg})=>{
    const [showResetPwd,setShowResetPwd]=useState(false);
    const navigate = useNavigate();

    const handleResetPassword=async()=>{
        console.log("in reset password")
        if(user.resetPwd==="" && user.username===""){
            setErrorMsg(prev => ({ ...prev, errorResetPwd: "Reset password key cannot be empty" , errorName: "Username required for password reset" }));
            return
        }
        else if(user.username===""){
            setErrorMsg(prev => ({ ...prev, errorName: "Username required for password reset" }));
            return
        }else if(user.username.length<3){
            setErrorMsg(prev => ({ ...prev, errorName: "Username must be at least 3 characters long" }));
            return
        }
        if(user.resetPwd===""){
            setErrorMsg(prev => ({ ...prev, errorResetPwd: "Reset password key cannot be empty" }));
            return
        }
        const userDetails=await checkUserExist("forgotPwd");
  
    
            if(showResetPwd && (user.confirmPassword===user.password)){
                const updateUserDetails= await axios.put(`https://bookstore-backend-du2z.onrender.com/updateUser/${userDetails.id}`, {
                    password: user.password
                });
                console.log("Password updated successfully:", updateUserDetails);
                if(updateUserDetails.status===200){
                    console.log("user",user)
                    setData(prev=>({...prev,userDetails:{username:user.username,role:user.role,password:user.password}}))
                    navigate("/");
                }

            }
            else if(userDetails?.resetPwd === user.resetPwd){
                setErrorMsg(prev => ({ ...prev, errorResetPwd: "" }));
                setShowResetPwd(true);
            }else if(userDetails?.resetPwd !== user.resetPwd){
                setErrorMsg(prev => ({ ...prev, errorResetPwd: "Invalid reset password key" }));
                setUser({...user, resetPwd: ""})
            }
        
    }


    return(
        <>
        <h2 className="loginTitle">Reset Password</h2>
        <div className="inputContainer">
            <FaUser className="userIcon"/>
            <input 
                type="text"
                id="username"
                className="inputField"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                onBlur={()=>onBlurUser("username")}
                placeholder="Enter your username"
            />
        </div>
        {errorMsg.errorName && <p className="errorMessage">{errorMsg.errorName}</p>}
        {showResetPwd ?(
            <>
                <div className="inputContainer">
            <FaLock className="userIcon"/>
            <input 
                type="text"
                id="resetNewPassword"
                className="inputField"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                onBlur={()=>onBlurUser("password")}
                placeholder="New password"
            />
        </div>
        {errorMsg.errorPassword && <p className="errorMessage">{errorMsg.errorPassword}</p>}
        <div className="inputContainer">
            <FaLock className="userIcon"/>
            <input 
                type="text"
                id="resetNewPassword"
                className="inputField"
                value={user.confirmPassword}
                onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
            />
                {user.confirmPassword.length>=8 &&(user.password === user.confirmPassword ? <FaCheckCircle className="tickIcon"/> : <MdCancel className="cancelIcon"/>)}
        </div>
            </>
        ): (<>
        <p className="pwdRestQuestion">Reset password key :</p>
        <div className="inputContainer">
            <FaLock className="userIcon"/>
            <input 
                type="text"
                id="resetNewPassword"
                className="inputField"
                value={user.resetPwd}
                onChange={(e) => setUser({...user, resetPwd: e.target.value})}
                placeholder="What do you like more ?"
            />
            
        </div>
        {errorMsg.errorResetPwd && <p className="errorMessage">{errorMsg.errorResetPwd}</p>}
        </>)}
        <button className="loginBtn" onClick={() => handleResetPassword()}>Submit</button>
        <div className="flexBack">
            <p className="linkPage" onClick={() => setLoginState()}>Login Page</p>
            <p className="linkPage" onClick={() => setSignupState()}>Signup Page</p>
        </div>
        </>
    )
}
export default ForgotPassword;