/**
 * Created by Andy on 3/21/2017.
 */

import isLoggedIn from "./reducer/login";
import profile from "./reducer/profile";
import loginToken from "./reducer/login-token";
import role from "./reducer/role";
import user from "./reducer/user";
import {combineReducers} from "redux";

export default combineReducers({
    isLoggedIn,
    loginToken,
    profile,
    role,
    user
});
