import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGame, IGameDocument } from "../../interfaces/Game";
import axios from "axios";

interface GameState {
  games: IGameDocument[] | null;
  loading: boolean;
  singleGame: IGameDocument | null;
  errors: any;
}

const initialState: GameState = {
  games: [],
  singleGame: null,
  loading: false,
  errors: [],
};

// actions are processes that get data from backend
export const getGames = createAsyncThunk<IGameDocument[]>(
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

export const getGameById = createAsyncThunk<IGameDocument, string>(
  "games/getGamesById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/games/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createGame = createAsyncThunk<Object, IGame>(
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

export const updateGame = createAsyncThunk<IGameDocument, IGameDocument>(
  "games/updateGame",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/games/${data.gameId}`,
        data
      );
      console.log(response.data.data);
      thunkAPI.dispatch(getGames());
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteGame = createAsyncThunk<IGameDocument, string>(
  "games/deleteGames",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/games/${id}`
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
    setGames: (state, action: PayloadAction<IGameDocument[]>) => {
      state.games = action.payload;
    },
    // filterGame: (state, action) => {
    //   state.games = state.games?.filter(game => game.gameId != action.payload)!
    // }
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
    builder.addCase(getGameById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGameById.fulfilled, (state, action) => {
      state.singleGame = action.payload;
      state.loading = false;
    });
    builder.addCase(getGameById.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.singleGame = action.payload;
      state.loading = false;
    });
    builder.addCase(updateGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateGame.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteGame.fulfilled, (state, action) => {
      state.singleGame = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteGame.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteGame.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
  },
});

export default gameSlice.reducer;
export const { setGames } = gameSlice.actions;
