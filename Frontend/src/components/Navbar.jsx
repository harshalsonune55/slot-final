import logo from "/S.png";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-12 py-6 bg-white">

      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Slot Logo" className="w-8 h-8" />
        <span className="text-2xl font-bold text-green-500">
          Slot
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-8 text-gray-600">
        <a href="#" className="hover:text-green-500">Product</a>
        <a href="#" className="hover:text-green-500">Developers</a>
        <a href="#" className="hover:text-green-500">Solutions</a>
        <a href="#" className="hover:text-green-500">Pricing</a>
        <a href="#" className="hover:text-green-500">Docs</a>
        <a href="#" className="hover:text-green-500">Blog</a>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <button
          onClick={() => navigate("/login")}
          className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Sign in
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
        >
          Start your project
        </button>

      </div>

    </nav>
  );
}