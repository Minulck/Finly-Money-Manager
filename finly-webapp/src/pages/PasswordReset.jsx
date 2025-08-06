import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { ValidateEmail } from "../util/validation";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { LoaderCircle } from "lucide-react";
import Model from "../components/Model";
import VerificationPopup from "../components/VerificationPopup";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openVerificationPopup, setOpenVerificationPopup] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);
    
    if (email.length === 0) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const codeString = randomCode.toString();
    setVerificationCode(codeString);

    try{
        const response = await axiosConfig.post(API_ENDPOINTS.SEND_VERIFICATION_CODE, {
            email: email,
            code: codeString,
        });
    
        if (response.status === 200) {
            toast.success("Verification code sent to your email");
            setOpenVerificationPopup(true);
        } else {
            setError("Failed to send verification code. Please try again.");
        }
    }catch (error) {
        console.error("Error sending verification code:", error);
        if (error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("Failed to send verification code. Please try again.");
        }
        toast.error("Failed to send verification code");
    }finally {
        setLoading(false);
    }
};

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden ">
      <img
        src={assets.background}
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 p-8 backdrop-blur-sm rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto ">
          <div className="flex justify-center mb-6">
            <img src={assets.finlynobg} alt="Finly Logo" className="h-8" />
          </div>
          <h3 className="text-2xl font-semibold text-black text-center mb-2 text-emerald-600">
            Reset Your Password
          </h3>
          <p className="text-small text-slate-700 text-center mb-4">
            Enter your email to receive password reset instructions
          </p>

          <div className="space-y-4">
            {error && (
              <p className="text-red-800 text-center text-sm bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@finly.com"
              type="email"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              type="button"
              className="shadow-md w-full py-3 text-lg font-medium bg-emerald-800 text-white rounded-md hover:bg-emerald-500 transition-colors hover:shadow-lg mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin h-5 w-5 text-white" />
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-2">
              Log in to your account?{" "}
              <Link
                to="/login"
                className="text-primary underline font-medium hover:text-primary-dark transition-colors hover:text-blue-600"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Model
        isOpen={openVerificationPopup}
        onClose={() => setOpenVerificationPopup(false)}
        title="Password Reset Instructions">
            <VerificationPopup 
                isOpen={openVerificationPopup}
                onClose={() => setOpenVerificationPopup(false)}
                title="Verification Code"
                verificationCode={verificationCode}
                email={email}
            />
      </Model>
    </div>
  );
};

export default PasswordReset;
