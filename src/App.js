import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Navigate } from "react-router-dom";
import Header from "./components/header";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from "./components/publicRoute";
import { useAuth } from "./context/authContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          /> */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <Navigate to="/login" />
              </PublicRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
