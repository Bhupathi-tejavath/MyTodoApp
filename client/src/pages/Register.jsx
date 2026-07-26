import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api.js";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", email: "", password: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            alert("registration successful");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "registration failed");
        }
    };
    return (
         <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-300 flex items-center justify-center px-4">
        <div className=" bg-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                <h1 className="text-2xl font-bold text-center text-purple-800">Register</h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                                        className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-600 rounded-lg"

                />

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
                <button type="submit" className="text-center w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-100">Register</button>
                <p className="text-center text-gray-600">
                    Already have an account? {" "}
                    <Link to="/login" className="text-purple-500 hover:text-purple-700 font-semibold">Login</Link>
                </p>
            </form>
        </div>
        </div>
    );
};
export default Register;