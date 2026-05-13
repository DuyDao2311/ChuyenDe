import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/"

    // =============================
    // Handle input change
    // =============================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError("")
        setSuccess("")
    }

    // =============================
    // Handle signup
    // =============================
    const handleSignup = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)
        console.log(formData);
        try {
            await axios.post(API_URL + "api/auth/signup", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })

            setSuccess("Signup successful! Please sign in.")
            setError("")
            setFormData({
                name: "",
                email: "",
                password: "",
            })
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <form onSubmit={handleSignup}>
                    <h2 className="signup-title">Create Account</h2>
                    <p className="signup-subtitle">Sign up to get started</p>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}

                    <label>
                        <b>Name</b> <span className="required">*</span>
                    </label>
                    <input
                        className="signup-textbox"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        <b>Email</b> <span className="required">*</span>
                    </label>
                    <input
                        className="signup-textbox"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        <b>Password</b> <span className="required">*</span>
                    </label>
                    <input
                        className="signup-textbox"
                        type="password"
                        name="password"
                        minLength="6"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        <b>Confirm Password</b> <span className="required">*</span>
                    </label>
                    <input
                        className="signup-textbox"
                        type="password"
                        name="confirmPassword"
                        minLength="6"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="signup-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <div className="signin-option">
                    <p>
                        Already have an account?{" "}
                        <Link to="/signin" className="signin-link">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
