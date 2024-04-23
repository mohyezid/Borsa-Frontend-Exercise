import { useState } from "react";
import Header from "../components/Header";
import { UserFormData } from "../type/interfaces";
import UserForm from "../components/UserForm";
import { useAuth } from "../hooks/useAuth";
import { update } from "../api/crud";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/auth/auth.slice";
import Toast from "../components/Toast";

export default function Profile() {
  const [sendingData, setSendingData] = useState(false);
  const [toastMsg, setToastMsg] = useState({ message: "", severity: "" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitData = (data: UserFormData) => {
    setSendingData(true);
    sendDataToAPI(data);
  };

  const sendDataToAPI = (data: UserFormData) => {
    if (!user) {
      navigate("/login");
      return;
    }

    update(`/profile?id=${user?._id}`, data)
      .then((res) => {
        setSendingData(false);
        dispatch(updateUser(res));
        setToastMsg({ message: "user profile updated", severity: "success" });
      })
      .catch((err) => {
        setSendingData(false);
        setToastMsg({
          message: err.response?.data?.message ?? "Couldn't signup user",
          severity: "error",
        });
      });
  };

  return (
    <>
      <Header />

      <div className="py-20">
        <UserForm
          title="Edit Profile"
          isEdit={true}
          initial_data={user as UserFormData}
          onSubmit={submitData}
          isLoading={sendingData}
        />

        <Toast
          key={Date.now()} // to make sure toast is displayed even if the message is the same as before's
          message={toastMsg.message}
          severity={toastMsg.severity}
          time={5000}
        />
      </div>
    </>
  );
}
