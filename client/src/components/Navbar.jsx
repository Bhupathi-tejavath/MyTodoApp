import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar=()=>{
    const {user,logout}=useAuth();
    const navigate=useNavigate();
    const handleLogout=()=>{
        logout();
        navigate("/login");
    };
    return (
        <nav className="w-full bg-purple-400 flex justify-between px-6 py-2 items-center">
            <h2 className="text-2xl text-purple-800 font-bold">Todo App</h2>
            <div>
                <span className="w-full flex justify-between px-1  items-center text-white text-lg font-semibold ">
                    Welcome {user?.name}
                </span>
                <button onClick={handleLogout} className="text-center flex justify-center items-center w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-100">Logout</button>
            </div>
        </nav>
    );
};
export default Navbar;