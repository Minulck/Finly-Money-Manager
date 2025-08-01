import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden ">
      <img
        src={assets.background}
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 p-8 backdrop-blur-sm rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto ">
          <div className="flex justify-center mb-6"><img src={assets.finlynobg} alt="Finly Logo" className="h-8" /></div>
          <h3 className="text-2xl font-semibold text-black text-center mb-2 text-emerald-600">
            Create An Account
          </h3>
          <p className="text-small text-slate-700 text-center mb-4">
            Start managing your finances with Finly
          </p>

          <form className="space-y-4">
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
              type="submit"
              className="shadow-md w-full py-3 text-lg font-medium bg-emerald-800 text-white rounded-md hover:bg-emerald-500 transition-colors hover:shadow-lg"
            >
              {loading ? "Creating..." : "Sign Up"}
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
