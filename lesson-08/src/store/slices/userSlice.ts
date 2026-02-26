import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser as loginUserApi, getUserData } from "../../api/userActions";
import { User, UserState, UserStateType } from "../../interfaces/userType";

interface LoginData {
  username?: string;
  password?: string;
}

const loadToken = () => localStorage.getItem("token");
const removeToken = () => localStorage.removeItem("token");
const saveToken = (token: string) => localStorage.setItem("token", token);

const getInitialState = async (): Promise<UserState> => {
  const token = loadToken();
  let singleUser = null;
  let authState = UserStateType.LOGGED_OUT;
  let errorSingle = null;

  if (token) {
    try {
      singleUser = await getUserData();
      authState = UserStateType.LOGGED_IN;
    } catch (error: any) {
      removeToken();
      errorSingle = error.message || "Failed to restore session";
    }
  }

  return {
    users: [],
    singleUser,
    authState,
    loadingAll: false,
    loadingSingle: false,
    errorAll: null,
    errorSingle,
  };
};

const initialState = await getInitialState();

export const loginUserThunk = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const data: any = await loginUserApi(credentials);
    const token = data.access_token || data.token;

    if (token) {
      saveToken(token);
    }

    const userData = data.user || data;

    return {
      id: userData.id,
      username: userData.username || "User",
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.singleUser = null;
      state.authState = UserStateType.LOGGED_OUT;
      state.errorSingle = null;
      removeToken();
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.singleUser = action.payload;
      state.authState = UserStateType.LOGGED_IN;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loadingSingle = true;
        state.errorSingle = null;
        state.authState = UserStateType.TRY_2_LOGIN;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.singleUser = action.payload;
        state.authState = UserStateType.LOGGED_IN;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loadingSingle = false;
        state.authState = UserStateType.LOGGED_OUT;
        state.errorSingle = action.payload || "An error occurred";
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
