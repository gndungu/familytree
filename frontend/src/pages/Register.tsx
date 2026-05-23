import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-black">Create Account</h2>
        <p className="text-slate-500 mt-2">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">

          {/* FIRST NAME */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border"
            required
          />

          {/* LAST NAME */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border"
            required
          />

          {/* PHONE NUMBER */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 px-4 rounded-2xl border"
            required
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-bold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}