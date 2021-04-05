import {
  GET_MYSUBJECT,
  GET_SUBJECT,
  DELETE_MYSUBJECT,
  APPLY_SUBJECT,
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
    default:
      return state;
  }
}
