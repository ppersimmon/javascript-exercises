export interface User {
  id: number;
  username: string;
}

export interface UserState {
  users: User[];
  singleUser: User | null;
  authState: UserStateType;
  loadingAll: boolean;
  loadingSingle: boolean;
  errorAll: string | null;
  errorSingle: string | null;
}

export enum UserStateType {
  LOGGED_OUT = "LOGGED_OUT",
  LOGGED_IN = "LOGGED_IN",
  TRY_2_LOGIN = "TRY_2_LOGIN",
}
