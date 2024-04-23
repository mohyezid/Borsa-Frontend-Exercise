export interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  address: string;
  profilePic?: string;
  isBuyer: boolean;
}

export type IUserState = {
  data: UserState[];
  total: number;
  isLoading: boolean;
  page: number;
  limit: number;
  error: any;
};

// action types
const user = "users";
export const FETCH_USERS_START = `${user}/usersFetchStart`;
export const FETCH_USERS_SUCCESS = `${user}/usersFetchSuccess`;
export const FETCH_USERS_ERROR = `${user}/usersFetchError`;
