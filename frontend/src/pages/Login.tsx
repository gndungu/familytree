import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl border border-white/10">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative">

          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-80 h-80 bg-white rounded-full -top-20 -left-20 blur-3xl"></div>
            <div className="absolute w-80 h-80 bg-pink-400 rounded-full bottom-0 right-0 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold leading-tight">
              Family Tree <br /> Genealogy System
            </h1>

            <p className="mt-6 text-indigo-100 text-lg">
              Preserve generations, explore ancestry, and build your family legacy.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 sm:p-10 lg:p-14 flex items-center justify-center">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md space-y-6"
          >

            <div>
              <h2 className="text-4xl font-black text-slate-900">
                Welcome Back
              </h2>
              <p className="text-slate-500 mt-2">
                Sign in to continue
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full h-14 px-4 rounded-2xl border border-slate-300 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full h-14 px-4 rounded-2xl border border-slate-300 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* FOOTER */}
            <p className="text-center text-sm text-slate-500">
              Don’t have an account?{" "}
              <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Create one
            </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}