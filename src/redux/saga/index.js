import { all, fork, spawn } from "redux-saga/effects";
import authSaga from "./auth";
import webSaga from "./web";
import userSaga from "./user";
import chefSaga from "./chef";

export default function* rootSaga() {
  yield all([spawn(authSaga), spawn(webSaga), spawn(userSaga), spawn(chefSaga)]);
}
