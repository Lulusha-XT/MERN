import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { IGame } from "../../interfaces/Game";
// import { Form } from "react-router-dom";
import { createGame } from "./gameSlice";
import { useAppDispatch } from "../../store/store";

const CreateGamePage = () => {
  const dispatch = useAppDispatch();
  const [game, setGame] = useState({
    name: "",
    address: "",
    numberOfPeople: "",
    date: "",
    time: "",
    fieldNumber: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data: IGame = {
      name: game.name,
      address: game.address,
      numberOfPeople: parseInt(game.numberOfPeople),
      time: game.time,
      date: new Date(game.date.split("/").reverse().join("-")),
      fieldNumber: parseInt(game.fieldNumber),
    };
    dispatch(createGame(data));
    console.log("Form submitted:", game);
    setGame({
      name: "",
      address: "",
      numberOfPeople: "",
      date: "",
      time: "",
      fieldNumber: "",
    });
  };
  return (
    <Container sx={{ marginTop: 10 }}>
      <Grid sx={{ margin: "0 auto" }}>
        <Typography sx={{ marginBottom: 2 }} variant="h4" fontWeight={600}>
          Create Games
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
                  setGame({ ...game, numberOfPeople: e.target.value })
                }
                value={game.numberOfPeople}
                fullWidth
                label="numberOfPeople"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setGame({ ...game, date: e.target.value })}
                type="date"
                value={game.date}
                fullWidth
                label="date"
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
                  setGame({ ...game, fieldNumber: e.target.value })
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
                Create Game
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default CreateGamePage;
