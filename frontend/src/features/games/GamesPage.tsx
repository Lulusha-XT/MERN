import { Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";
import GameCard from "../../components/general/GameCard";

export default function GamesPage() {
  const { games } = useAppSelector((state) => state.games);

  return (
    <Container>
      <Typography variant="h2" fontWeight={"bold"} sx={{ mt: 5 }}>
        Games
      </Typography>
      <Grid spacing={3} container sx={{ margin: 5 }}>
        {games &&
          games.map((game) => (
            <Grid item key={game.gameId} xs={4}>
              <Link to={`/game/${game.gameId}`}>
                <GameCard game={game} />
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
