import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getGameById } from "./gameSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SingleGamePage() {
  const dispatch = useAppDispatch();
  const { singleGame } = useAppSelector((state) => state.games);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      alert("null id");
      return;
    }

    dispatch(getGameById(id));
  }, []);

  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography sx={{ my: 3 }} variant="h2">
        Welcome to this Game
      </Typography>
      <Typography sx={{ color: "gray" }} variant="h4" fontWeight={600}>
        {`${singleGame?.address} | ${singleGame?.date
          .toString()
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("-")
          .replace(/-/g, "/")}`}
      </Typography>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="h6">{singleGame?.name}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">
            NO. Player: {singleGame?.numberOfPeople}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">{singleGame?.time}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to={`/editGame/${id}`}>
            <Button className="green-btn">Edit</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
