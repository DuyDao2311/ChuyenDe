import React, { useContext, useState } from 'react'
import './Signin.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
import { useHistory } from 'react-router-dom' // Import useHistory cho Router v5

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)
    
    const history = useHistory(); // Khởi tạo history

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"
    
    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(API_URL + "api/auth/login", userCredential);
            
            // Lấy thông tin user (đảm bảo lấy đúng object)
            let userInfo = res.data.user || res.data; 
            
            // Đảm bảo user object có đầy đủ thông tin
            if (!userInfo) {
                throw new Error("Không nhận được thông tin user từ server");
            }

            // Đảm bảo user có _id (nếu có id thì chuyển thành _id)
            if (userInfo.id && !userInfo._id) {
                userInfo._id = userInfo.id;
            }

            // Chuẩn hóa roles về dạng mảng và ưu tiên admin nếu có các field khác
            const normalizedRoles = (() => {
                const roles = [];
                if (userInfo.roles) {
                    roles.push(...(Array.isArray(userInfo.roles) ? userInfo.roles : [userInfo.roles]));
                }
                if (userInfo.role) {
                    roles.push(userInfo.role);
                }
                if (userInfo.isAdmin) {
                    roles.push('admin');
                }
                const uniq = Array.from(new Set(roles.filter(Boolean)));
                return uniq.length ? uniq : ['customer'];
            })();
            userInfo.roles = normalizedRoles;

            // Debug: In ra toàn bộ thông tin user để kiểm tra
            console.log("🔍 Full User Info:", userInfo);
            console.log("🔍 User Roles:", userInfo.roles);
            console.log("🔍 Is Admin?", userInfo.roles.includes("admin"));

            dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });

            // Kiểm tra admin và redirect
            const isAdminUser = userInfo.roles.includes("admin");
            console.log("🔍 Redirecting to:", isAdminUser ? "/dashboard@admin" : "/dashboard@member");
            
            // Đợi một chút để state update trong context trước khi redirect
            setTimeout(() => {
                if (isAdminUser) {
                    history.push('/dashboard@admin');
                } else {
                    history.push('/dashboard@member');
                }
            }, 50);
        }
        catch (err) {
            console.error("Login error:", err);
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Sai email hoặc mật khẩu")
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        loginCall({ email, password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor="email"> <b>Email</b></label>
                        <input className='signin-textbox' type="email" placeholder="Enter Email" name="email" required onChange={(e) => { setEmail(e.target.value) }}/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signin-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button className="signin-button">Log In</button>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">Don't have an account?</p>
                    <button 
                        type="button"
                        className="signup-button-link"
                        onClick={() => history.push('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signin