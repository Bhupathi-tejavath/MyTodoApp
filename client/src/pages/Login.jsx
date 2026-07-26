import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api.js";
import {useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const {login} =useAuth();
    const [form, setForm] = useState({
        email: "", password: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res=await API.post("/auth/login", form);
            login(res.data);
            alert("login successful");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "login failed");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-300 flex items-center justify-center px-4">
        <div className=" bg-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                <h1 className="text-2xl font-bold text-center text-purple-800">Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-600 rounded-lg"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-600 rounded-lg"
                />
                <button type="submit" className="text-center w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-100">Login</button>
                <p className="text-center text-gray-600">
                     don't have an account ? {" "}
                    <Link to="/register" className="text-purple-500 hover:text-purple-700 font-semibold">Register</Link>
                </p>
            </form>
        </div>
        </div>
    );
};
export default Login;