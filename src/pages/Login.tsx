import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginStart } from "../store/auth/auth.slice";
import { PASSWORD_LENGTH } from "../constants/user-form";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { isLoading, error, isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (emailTouched) validateEmail();
  }, [email]);

  useEffect(() => {
    if (passwordTouched) validatePassword();
  }, [password]);

  useEffect(() => {
    if (isLoggedIn && formSubmitted) navigate("/home");
  }, [isLoggedIn]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      sendAuthRequest(email, password);
    }
  };

  const validateEmail = (): boolean => {
    if (email.length === 0) {
      setEmailError("email is required");
      return false;
    }

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(email)) {
      setEmailError("invalid email pattern");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePassword = (): boolean => {
    if (password.length === 0) {
      setPasswordError("password is required");
      return false;
    }

    if (password.length < PASSWORD_LENGTH) {
      setPasswordError("password length is too short");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
    setEmailTouched(true);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordTouched(true);
  };

  const sendAuthRequest = (email: string, password: string) => {
    dispatch(loginStart({ email, password }));
    setFormSubmitted(true);
  };

  return (
    <>
      <section className="min-h-[100vh] w-full flex flex-col items-center justify-center py-4">
        <div className="row justify-center">
          <div className="w-[350px] !max-w-[80vw] flex flex-col items-center justify-center border border-gray-300 rounded-lg px-4 py-6 shadow-xl">
            <div className="pt-4 pb-2 w-full">
              <h5 className="text-center pb-0 text-xl font-semibold mb-1 tracking-wider">
                Login to Your Account
              </h5>
              {!error && (
                <p className="text-center mb-0 text-xs">
                  Enter your email & password to login
                </p>
              )}
              {error && (
                <p className="text-center text-red-700 font-bold text-xs bg-red-200 py-3 mt-2">
                  {error}
                </p>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 mt-3 w-full"
            >
              <FormInput
                label="Email"
                value={email}
                error={emailError}
                touched={emailTouched}
                onChange={handleEmailChange}
              />

              <FormInput
                label="Password"
                value={password}
                error={passwordError}
                touched={passwordTouched}
                onChange={handlePasswordChange}
                isPassword={true}
              />

              <div className="mt-2">
                <button
                  className="bg-blue-600 text-white text-sm py-3 rounded w-full disabled:bg-blue-400 flex justify-center items-center"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="!border-t-transparent" />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="mt-2 text-sm">
                  <span>Don't have an account?</span>
                  &nbsp;
                  <Link to={"/signup"} className="text-blue-600 underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
