import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAuth } from "./hooks/useAuth";

export default function Router() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
