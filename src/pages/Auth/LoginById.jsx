import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, getUserRole } from "../../store/actions/auth"; // Ensure getUserRole is imported
import { toast } from "react-toastify"; // Correctly import toast
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing


function LoginById() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Initialize error state

  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  // Select the user role and loading state from the Redux store
  const { role } = useSelector((state) => state.user);

  const handlePress = async () => {
    if (phone.length !== 10) {
      toast.error("Invalid Phone Number"); // Use toast.error directly
      return; // Exit the function if the phone number is invalid
    } else if (id.length !== 8) {
      toast.error("UniqueID must have 8 Characters."); // Use toast.error directly
      return; // Exit the function if the UniqueID is invalid
    }

    setIsLoading(true);
    try {
      // Attempt to login
      await dispatch(login({ phone: phone, code: id })); 
      
      // Fetch the user role after successful login
      dispatch(getUserRole()); 
    } catch (err) {
      console.error(err);
      setError(err.message); // Handle error appropriately
      toast.error("Login failed. Please try again."); // Use toast.error directly
    } finally {
      setIsLoading(false);
    }
  };



  // Navigate based on user role after it has been updated
  useEffect(() => {
    dispatch(getUserRole()); 
    if (role) {
      if (role === "Vendor") {
        navigate("/vendor"); // Navigate to the vendor section
      } else if (role === "Hotel") {
        navigate("/hotel"); // Navigate to the hotel section
      } else {
        navigate("/"); // Handle unexpected user roles
      }
    }
  }, [role, navigate]); // Re-run the effect when userRole changes

  return (
    <section className="flex">
      <div className="w-[45vw] flex justify-center items-center">
      <img src="/assets/basket.png" alt="" className="h-[95vh] rounded-lg" />
      </div>
      <div className="flex justify-center items-center w-[50vw] ">
        <div className="bg-gradient-to-r from-orange-200 to-orange-100 h-[75vh] w-fit p-8 rounded-lg flex flex-col items-center justify-center align-middle">
          <img src="/assets/logo_1.png" alt="" className="h-24" />
          <p className="font-semibold">
            Your ultimate freshness fix to experience purest flavor
          </p>
          <div className="flex flex-col my-6 w-[70%]">
            <label htmlFor="">Phone Number</label>
            <div className="flex justify-center items-center text-center">
              <p className="bg-white h-[72%] p-1 pt-2 border rounded-l border-gray-500 border-r-gray-400">
                +91
              </p>
              <input
                type="number"
                placeholder="Enter your phone number"
                className="my-2 border-l-white rounded-r w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Use direct setter
              />
            </div>
            <label htmlFor="">Unique Id</label>
            <input
              type="text"
              placeholder="Enter your Unique ID"
              className="my-2 rounded-md w-full"
              value={id}
              onChange={(e) => setId(e.target.value)} // Use direct setter
            />
            <button
              className="bg-[#619524] rounded-full text-white my-3 px-3 py-2"
              onClick={handlePress}
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? "Logging In..." : "Login"} {/* Update button text based on loading */}
            </button>
          </div>
          <p>
            New User?{" "}
            <span className="text-orange-800 font-semibold">
              Login by your phone number
            </span>
          </p>
          <p>
            By Continuing, you agree to the{" "}
            <span className="text-orange-800 font-semibold">Terms of use</span>{" "}
            &{" "}
            <span className="text-orange-800 font-semibold">
              Privacy policies
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginById;
