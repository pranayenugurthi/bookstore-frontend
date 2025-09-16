import { FaUser,FaLock ,FaCheckCircle,FaKey} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
const SignUp=({user,setUser,errorMsg,setLoginState,handleSignup,onBlurUser})=>{
      

    return(
                <><h1 className="loginTitle">Register user</h1>
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
                        <div className="inputContainer">
                            <FaLock className="userIcon"/>
                            <input 
                                type="password"
                                id="password"
                            className="inputField"
                            value={user.confirmPassword}
                            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                            onBlur={() => onBlurUser("password")}
                            placeholder="Confirm your password"
                            />
                            {user.confirmPassword.length>=8 &&(user.password === user.confirmPassword ? <FaCheckCircle className="tickIcon"/> : <MdCancel className="cancelIcon"/>)}
                        </div>
                        {errorMsg.errorPassword && <p className="errorMessage">{errorMsg.errorPassword}</p>}
                   
                    
                    <p className="pwdRestQuestion">Set reset password key:</p>
                    <div className="inputContainer">
                        <FaKey className="userIcon"/>
                        <input className="inputField" type="text" placeholder="What do you like more ?" value={user.resetPwd} onChange={(e) => setUser({...user, resetPwd: e.target.value})} />
                    </div>
                     <button className="loginBtn" onClick={() => handleSignup()}>Signup</button>
    
                    <p className="signupPrompt">Have an account ?<span onClick={() => setLoginState()} className="signupLink">Login</span></p>
    
            </>)

}
export default SignUp;