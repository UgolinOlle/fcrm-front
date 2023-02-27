import { createSelector } from "reselect";
import { AuthState } from "./reducers";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export const selectUser = createSelector(
  (state: { auth: AuthState }) => state.auth.user,
  (user) => user
);

export const selectIsAuthenticated = createSelector(
  (state: { auth: AuthState }) => state.auth.isAuthenticated,
  (isAuthenticated) => isAuthenticated
);

export const selectAccessToken = createSelector(
  (state: { auth: AuthState }) => state.auth.accessToken,
  (accessToken) => accessToken
);

export const selectError = createSelector(
  (state: { auth: AuthState }) => state.auth.error,
  (error) => error
);
