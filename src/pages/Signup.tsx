import { useState } from "react";
import UserForm from "../components/UserForm";
import { UserFormData } from "../type/interfaces";
import { create } from "../api/crud";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [sendingData, setSendingData] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const submitData = (data: UserFormData) => {
    setSendingData(true);
    sendDataToAPI(data);
  };

  const sendDataToAPI = (data: UserFormData) => {
    create("/register/v2", data)
      .then((_) => {
        navigate("/home");
        setSendingData(false);
      })
      .catch((err) => {
        setSendingData(false);
        setApiError(err.response?.data?.message ?? "Couldn't signup user");
      });
  };

  return (
    <>
      <div>
        <UserForm
          title="Sign Up"
          onSubmit={submitData}
          isLoading={sendingData}
          apiError={apiError}
        />
      </div>
    </>
  );
}
