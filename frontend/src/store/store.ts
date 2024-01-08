import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import gameReducer from "../features/games/gameSlice";
export const store = configureStore({
  reducer: {
    games: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type addDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<addDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
