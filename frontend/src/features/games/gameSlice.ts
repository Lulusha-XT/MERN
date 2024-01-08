import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Game } from "../../interfaces/Game";
import axios from "axios";

interface GameState {
  games: Game[] | null;
  loading: boolean;
  singleGame: Game | null;
  errors: any;
}

const initialState: GameState = {
  games: [],
  singleGame: null,
  loading: false,
  errors: [],
};

// actions are processes that get data from backend
export const getGames = createAsyncThunk<Game[]>(
  "games/getGames",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8000/api/games");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createGame = createAsyncThunk<Object, Game>(
  "games/createGame",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/games",
        data
      );
      thunkAPI.dispatch(getGames());

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// reducer => reduce to a specific state => change state

export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGames.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGames.fulfilled, (state, action) => {
      state.games = action.payload;
      state.loading = false;
    });
    builder.addCase(getGames.rejected, (sate, action) => {
      sate.loading = false;
      sate.errors = action.payload;
    });
  },
});

export default gameSlice.reducer;
export const { setGames } = gameSlice.actions;
