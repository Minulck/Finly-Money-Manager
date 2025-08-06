import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

const VerificationPopup = ({ isOpen, onClose, title, verificationCode ,email}) => {

    const [Code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerificationCodeChange = (e) => {
        setCode(e.target.value);
    }

    const handleSubmit = async() => {
        setLoading(true);

        // Check if verification code is correct first
        if (Code !== verificationCode) {
            toast.error("Verification code is incorrect");
            setLoading(false);
            return; // Exit early if code is incorrect
        }

        // Proceed with password reset if code is correct
        try{
            const response = await axiosConfig.post(`${API_ENDPOINTS.RESET_PASSWORD}`, {
                email: email
            });
            if (response.status === 200) {
                toast.success("Verification successful! Check your email for the temporary password.");
                onClose(); // Close the popup
                navigate("/login"); // Navigate to login page
            } else {
                toast.error("Verification failed. Please try again.");
            }

        }catch(error) {
            console.error("Error verifying code:", error);
            toast.error("Failed to verify code");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="p-5 md:p-6 text-gray-700">
      <div className="items-center justify-between mb-4">
        <p className="text-sm mb-4">
          Your verification code was sent to : <strong>{email}</strong>
        </p>
        <p>
            Enter the verification code below to reset your password.
        </p>
      </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
            </label>
            <input
            type="text"
            value={Code}
            onChange={handleVerificationCodeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex justify-center mt-6">
        <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Verifying..." : "Verify"}
        </button>
        </div>
    </div>
  );
};

export default VerificationPopup;
