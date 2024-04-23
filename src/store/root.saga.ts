import { all, fork } from "redux-saga/effects";
import watchUsersFetch from "./user/user.saga";
import watchLogin from "./auth/auth.saga";

export default function* rootSaga() {
  yield all([fork(watchUsersFetch), fork(watchLogin)]);
}
