import { authReducer } from "./auth/auth.slice";
import { userReducer } from "./user/user.slice";

const rootReducers = {
  users: userReducer,
  auth: authReducer,
};

export default rootReducers;
