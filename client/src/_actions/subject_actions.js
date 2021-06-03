import {
  GET_MYSUBJECT,
  GET_SUBJECT,
  DELETE_MYSUBJECT,
  APPLY_SUBJECT,
  ADD_EXCHANGE_SUBJECT,
  SWITCH_EXCHANGE_SUBJECT,
  GET_DRAW_SUBJECT,
  DELETE_DRAW_SUBJECT,
  APPLY_DRAW_SUBJECT,
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

export function addExchangeSubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/addExchangeSubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: ADD_EXCHANGE_SUBJECT,
    payload: request,
  };
}

export function switchExchangeSubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/switchExchangeSubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: SWITCH_EXCHANGE_SUBJECT,
    payload: request,
  };
}

export function getDrawSubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/getDrawSubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: GET_DRAW_SUBJECT,
    payload: request,
  };
}

export function applyDrawSubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/applyDrawSubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: APPLY_DRAW_SUBJECT,
    payload: request,
  };
}

export function deleteDrawSubject(dataToSubmit) {
  const request = axios
    .post(`${SUBJECT_SERVER}/deleteDrawSubject`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_DRAW_SUBJECT,
    payload: request,
  };
}
