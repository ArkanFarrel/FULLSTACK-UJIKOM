import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rumah from "../img/rumah.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldpassword, setoldPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !oldpassword) {
      alert("Tolong isi email dan password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put("http://localhost:3008/api/auth/login", {
        email,
        oldpassword,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Ganti Password berhasil!");
      navigate("/login");
    } catch (error) {
      console.error("Ganti Password gagal:", error.response?.data?.msg || error.message);
      alert("Ganti Password gagal! Periksa email atau password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={rumah} alt="Rumah" />
      </div>

      <div className="bg-orange-600 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl text-white font-semibold text-center">FORGOT PASSWORD</h2>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label>Old Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={oldpassword}
              onChange={(e) => setoldPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col text-gray-400 py-2">
            <label>New Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
