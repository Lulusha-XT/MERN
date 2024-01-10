import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { IGame, IGameDocument } from "../../interfaces/Game";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createGame, deleteGame, getGameById, updateGame } from "./gameSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditGamePage = () => {
  const dispatch = useAppDispatch();
  const { singleGame } = useAppSelector((state) => state.games);
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    console.log(`Id is undefined ${id}`);
    return;
  }
  useEffect(() => {
    // if (!id) return;
    dispatch(getGameById(id));
  }, []);

  useEffect(() => {
    setGameInitialState();
  }, [singleGame]);

  const [game, setGame] = useState({
    name: "",
    address: "",
    numberOfPeople: 0,
    date: "",
    time: "",
    fieldNumber: 0,
  });

  const setGameInitialState = () => {
    if (!singleGame) return;
    setGame({
      name: singleGame?.name,
      address: singleGame?.address,
      numberOfPeople: singleGame?.numberOfPeople,
      date: singleGame?.date
        .toString()
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("-")
        .replace(/-/g, "/"),
      time: singleGame?.time,
      fieldNumber: singleGame?.fieldNumber,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!id) return;
    const data: IGameDocument = {
      gameId: id,
      name: game.name,
      address: game.address,
      numberOfPeople: game.numberOfPeople,
      time: game.time,
      date: new Date(game.date.split("/").reverse().join("-")),
      fieldNumber: game.fieldNumber,
    };
    dispatch(updateGame(data));
    // dispatch(createGame(data));
    // console.log("Form submitted:", game);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(deleteGame(id));
    navigate("/");
  };
  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid sx={{ margin: "0 auto" }}>
        <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
          {game.name} - {game.address} - {game.time} - {game.date}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setGame({ ...game, name: e.target.value })}
                value={game.name}
                fullWidth
                label="name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(e) => setGame({ ...game, address: e.target.value })}
                value={game.address}
                fullWidth
                label="address"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="number"
                onChange={(e) =>
                  setGame({ ...game, numberOfPeople: parseInt(e.target.value) })
                }
                value={game.numberOfPeople}
                fullWidth
                label="numberOfPeople"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                defaultValue={game.date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setGame({
                    ...game,
                    date: e.target.value,
                  })
                }
                type="date"
                value={game.date}
                fullWidth
                label={`${game.date}`}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(e) => setGame({ ...game, time: e.target.value })}
                value={game.time}
                fullWidth
                label="time"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="number"
                onChange={(e) =>
                  setGame({ ...game, fieldNumber: parseInt(e.target.value) })
                }
                value={game.fieldNumber}
                fullWidth
                label="fieldNumber"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
              >
                Update Game
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid item xs={12} marginTop={2}>
          <Button
            onClick={handleDelete}
            sx={{
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "darkred", // Dark red color on hover
              },
            }}
            fullWidth
            variant="contained"
            disableElevation
          >
            Delete Game
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditGamePage;
