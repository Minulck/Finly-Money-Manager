import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { ValidateEmail } from "../util/validation";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { AppContext } from "../context/AppContext";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          setUser(user);
          toast.success("Login successful!");
          navigate("/dashboard");
        }
        else{
          setError("Login failed.Please try again.");
          setLoading(false);
        }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
      else {
        setError("An error occurred. Please try again later.");
        console.error("Login error:", err);
      }
      setLoading(false);
      return;
    } finally {
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
            Login to Your Account
          </h3>
          <p className="text-small text-slate-700 text-center mb-4">
            welcome back to Finly - your personal finance manager
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Input
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
              type="password"
            />

            <button
              disabled={loading}
              type="submit"
              className="shadow-md w-full py-3 text-lg font-medium bg-emerald-800 text-white rounded-md hover:bg-emerald-500 transition-colors hover:shadow-lg mt-4"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin h-5 w-5 text-white" />
                  Logging In...
                </span>
              ) : (
                "Log In"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary underline font-medium hover:text-primary-dark transition-colors hover:text-blue-600"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
