import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser as loginUserApi, getUserData } from "../../api/userActions";
import { User, UserState } from "../../interfaces/userType";

interface LoginData {
  username?: string;
  password?: string;
}

const initialState: UserState = {
  users: [],
  singleUser: null,
  loadingAll: false,
  loadingSingle: false,
  errorAll: null,
  errorSingle: null,
};

export const loginUserThunk = createAsyncThunk<
  User,
  LoginData,
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const data: any = await loginUserApi(credentials);
    const token = data.access_token || data.token;

    if (token) {
      Cookies.set("token", token, { path: "/" });
      const userProfile = await getUserData();

      if (userProfile && userProfile.id) {
        Cookies.set("userId", String(userProfile.id), { path: "/" });

        return {
          id: userProfile.id,
          username: userProfile.username || "User",
        };
      }
    }
    throw new Error("Failed to get user profile");
  } catch (error: any) {
    return rejectWithValue(error.message || "Login failed");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.singleUser = null;
      state.errorSingle = null;
      Cookies.remove("token", { path: "/" });
      Cookies.remove("userId", { path: "/" });
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.singleUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loadingSingle = true;
        state.errorSingle = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.singleUser = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loadingSingle = false;
        state.errorSingle = action.payload || "An error occurred";
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
