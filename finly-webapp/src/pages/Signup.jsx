import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";
import { ValidateEmail } from "../util/validation";
import { ValidatePassword } from "../util/validation";
import Input from "../components/Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }
    if (!ValidatePassword(password)) {
      setError(
        "password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
      );
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    setError(null);

    try{
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,{
        fullName,
        email,
        password
      })
      if(response.status === 201){
        toast.success("Account created successfully! Please check your email to activate your account.");
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      }
    }
    catch(err){
      toast.error("An error occurred while creating your account. Please try again.");
      setError(err.message);
    }
    finally{
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
            Create An Account
          </h3>
          <p className="text-small text-slate-700 text-center mb-4">
            Start managing your finances with Finly
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">{/* Logo */}</div>

            {error && (
              <p className="text-red-800 text-center text-sm bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jhon Doe"
                type="text"
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@finly.com"
                type="email"
              />
              <div className="col-span-2">
                <Input
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*********"
                  type="password"
                />
              </div>
              <div className="col-span-2">
                <Input
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="*********"
                  type="password"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="shadow-md w-full py-3 text-lg font-medium bg-emerald-800 text-white rounded-md hover:bg-emerald-500 transition-colors hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin h-5 w-5 text-white" />
                  Creating...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary underline font-medium hover:text-primary-dark transition-colors hover:text-blue-600"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
