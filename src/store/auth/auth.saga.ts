import { call, put, takeLatest } from "redux-saga/effects";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
} from "./auth.types";
import { create } from "../../api/crud";
import { LoginData } from "../../type/interfaces";

function* workLogin({ payload }: { payload: LoginData }): any {
  try {
    const response = yield call(() => create("/login", payload));
    yield put({ type: USER_LOGIN_SUCCESS, payload: response });
  } catch (e: any) {
    yield put({
      type: USER_LOGIN_ERROR,
      payload: e.response?.data?.message ?? "Login Failed",
    });
  }
}

function* watchLogin() {
  yield takeLatest<any>(USER_LOGIN_START, workLogin);
}

export default watchLogin;
