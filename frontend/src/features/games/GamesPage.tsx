import { Container, Grid } from "@mui/material";
import { useAppSelector } from "../../store/store";

export default function GamesPage() {
  const { games } = useAppSelector((state) => state.games);
  return (
    <Container>
      <Grid container>
        {games &&
          games.map((game) => (
            <Grid
              key={game.gameId}
              xs={3}
              sx={{
                borderRadius: 2,
                margin: 2,
                padding: 2,
                minHeight: 50,
                minWidth: 50,
                backgroundImage:
                  "linear-gradient(98deg, rgb(64, 40, 222), rgb(13, 200, 220))",
              }}
            >
              <h4>{game.address ? game.address : "no name"}</h4>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
