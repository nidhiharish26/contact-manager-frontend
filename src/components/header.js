import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Contact Manager</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
