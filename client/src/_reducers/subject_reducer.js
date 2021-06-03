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

export default function (state = {}, action) {
  switch (action.type) {
    case GET_SUBJECT:
      return { ...state, subject: action.payload };
    case GET_MYSUBJECT:
      return { ...state, mySubject: action.payload };
    case DELETE_MYSUBJECT:
      return { ...state, deleteSuccess: action.payload };
    case APPLY_SUBJECT:
      return { ...state, applySuccess: action.payload };
    case ADD_EXCHANGE_SUBJECT:
      return { ...state, exchangeSuccess: action.payload };
    case SWITCH_EXCHANGE_SUBJECT:
      return { ...state, exchangeSuccess: action.payload };
    case GET_DRAW_SUBJECT:
      return { ...state, myDrawSubject: action.payload };
    case DELETE_DRAW_SUBJECT:
      return { ...state, deleteSuccess: action.payload };
    case APPLY_DRAW_SUBJECT:
      return { ...state, applySuccess: action.payload };
    default:
      return state;
  }
}
