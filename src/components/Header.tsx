import { useDispatch } from "react-redux";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/auth.slice";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  // show default profile pic if the given source doesn't contain an image
  const showDefaultPic = (event: any) => {
    event.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfGlbINljpthk3guHXef2xpdFPnFfaHPHYQ&usqp=CAU";
  };

  return (
    <>
      <div className="w-full fixed z-[99999] left-0 bg-cyan-700 px-10 flex justify-between">
        <ul className="flex text-white">
          <li
            className="py-4 px-4 underline-animation"
            onClick={() => navigate("/home")}
          >
            Home
          </li>
          <li
            className="py-4 px-4 underline-animation"
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>
        </ul>
        <ul className="text-white flex gap-2 justify-center items-center">
          <li className="border-r border-green-200 pr-3">
            <img
              src={user?.profilePic ?? ""}
              onError={showDefaultPic}
              alt=""
              className="w-12 h-12 bg-yellow-300 rounded-[50%] border-2 border-green-200 object-cover"
            />
          </li>
          <li
            className="py-4 px-4 self-end hover:text-yellow-500 cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            Sign out
          </li>
        </ul>
      </div>
    </>
  );
}
