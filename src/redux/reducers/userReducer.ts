import { IUsers } from "../../interface";
import { userTypes } from "../actionTypes";

const initialState = [];
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.ADD_USER:
            return [...state, action.payload];
        case userTypes.REMOVE_USER:
            return state.filter((user:IUsers) => user.email !== action.payload);
        case userTypes.EDIT_USER:
            return state.map((user:IUsers) => user.email === action.payload.email ? action.payload : user);
    }
}

export default userReducer;