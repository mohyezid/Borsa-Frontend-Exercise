import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USERS_ERROR,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
} from "./user.types";
import { get } from "../../api/crud";

function* workUsersFetch({
  payload,
}: {
  payload: { page: number; limit: number };
}): any {
  try {
    const response = yield call(() => get("/fetch/dummy/user-v2", payload));
    yield put({ type: FETCH_USERS_SUCCESS, payload: response });
  } catch (e: any) {
    yield put({
      type: FETCH_USERS_ERROR,
      payload: e.response?.data?.message ?? "Couldn't fetch users",
    });
  }
}

function* watchUsersFetch() {
  yield takeLatest<any>(FETCH_USERS_START, workUsersFetch);
}

export default watchUsersFetch;
