import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamesPage from "./features/games/GamesPage";
import { getGames } from "./features/games/gameSlice";
import { useAppDispatch, useAppSelector } from "./store/store";
import NavBar from "./components/layout/NavBar";
import SingleGamePage from "./features/games/SingleGamePage";
import CreateGamePage from "./features/games/CreateGamePage";
import EditGamePage from "./features/games/EditGamePage";
import LoginPage from "./features/account/loginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./features/account/accountSlice";
import AuthGuard from "./components/guards/AuthGuard";
import SignupPage from "./features/account/signupPage/SignupPage";
function App() {
  const dispatch = useAppDispatch();
  const { games } = useAppSelector((state) => state.games);
  const initApp = useCallback(async () => {
    await dispatch(getCurrentUser());
    await dispatch(getGames());
  }, [games]);

  useEffect(() => {
    initApp();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/game/:id" element={<SingleGamePage />} />
        <Route element={<AuthGuard />}>
          <Route path="/createGame" element={<CreateGamePage />} />
          <Route path="/editGame/:id" element={<EditGamePage />} />
        </Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
