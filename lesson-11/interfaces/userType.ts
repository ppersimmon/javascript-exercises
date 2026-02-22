export interface User {
  id: number;
  username: string;
}

export interface UserState {
  users: User[];
  singleUser: User | null;
  loadingAll: boolean;
  loadingSingle: boolean;
  errorAll: string | null;
  errorSingle: string | null;
}
