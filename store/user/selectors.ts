import {createSelector} from "reselect";
import {UserState} from "./reducers";

export const selectUsers = createSelector(
    (state: { user: UserState }) => state.user.users,
    (users) => users
)