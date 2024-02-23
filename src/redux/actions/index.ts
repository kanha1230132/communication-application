import { IUsers } from "../../interface";
import { userTypes } from "../actionTypes";

// Users actions  
export function addUser(user: IUsers) {
  return {
    type: userTypes.ADD_USER,
    payload: user,
  };
}
export function removeUser(email: string) {
  return {
    type: userTypes.REMOVE_USER,
    payload: email,
  };
}
export function editUser(user: IUsers) {
  return {
    type: userTypes.EDIT_USER,
    payload: user,
  };
}
