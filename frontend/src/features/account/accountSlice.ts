import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser, IUserDocument } from "../../interfaces/User";
import axios from "axios";
import { toast } from "react-toastify";

interface AccountState {
  loading: boolean;
  user: IUserDocument | null;
  isLoggedIn: boolean;
  error: Error[] | any;
}

const initialState: AccountState = {
  loading: false,
  user: null,
  isLoggedIn: false,
  error: [],
};

export const signUpUser = createAsyncThunk<IUserDocument, IUser>(
  "account/signUpUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signUp",
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk<IUserDocument, Object>(
  "account/logInUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signIn",
        data
      );
      const { token } = response.data.data;
      console.log(response.data);
      localStorage.setItem("jwt_youtube_soccer", JSON.stringify(token));
      toast.success("Successfully Logged In");
      thunkAPI.dispatch(setLoggedIn(true));
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk<void>(
  "accout/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt_youtube_soccer")!);
      if (!token) {
        thunkAPI.dispatch(setLoggedIn(false));
        console.log("No Token");
        return;
      }

      const response = await axios.get(
        "http://localhost:8000/api/auth/currentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data) {
        thunkAPI.dispatch(setLoggedIn(true));
      } else {
        thunkAPI.dispatch(setLoggedIn(false));
        return;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk<void>(
  "account/logOutUser",
  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("jwt_youtube_soccer");
      thunkAPI.dispatch(setLoggedIn(false));
      toast.info("Succesfully Logged Out");
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export const { setLoggedIn } = accountSlice.actions;
export default accountSlice.reducer;
