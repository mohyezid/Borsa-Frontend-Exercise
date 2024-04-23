import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useUsers = () => {
  const state = useSelector((state: RootState) => state.users);
  return state;
};
