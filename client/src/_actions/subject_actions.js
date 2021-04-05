import {
  GET_MYSUBJECT,
  GET_SUBJECT,
  DELETE_MYSUBJECT,
  APPLY_SUBJECT,
} from "../_actions/types";

import { SUBJECT_SERVER } from "../components/Config.js";
import axios from "axios";

export function getSubject() {
  const request = axios
    .post(`${SUBJECT_SERVER}/getSubject`)
    .then((response) => response.data);

  return {
    type: GET_SUBJECT,
    payload: request,
  };
}

export function getMySubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/getMySubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_MYSUBJECT,
    payload: request,
  };
}

export function applySubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/applySubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: APPLY_SUBJECT,
    payload: request,
  };
}

export function deleteMySubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/deleteMySubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_MYSUBJECT,
    payload: request,
  };
}
