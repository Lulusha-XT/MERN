import { Container, Grid } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";

export default function GamesPage() {
  const { games } = useAppSelector((state) => state.games);
  return (
    <Container>
      <Grid container>
        {games &&
          games.map((game) => (
            <Grid item key={game.gameId} xs={4}>
              <Link to={`/game/${game.gameId}`}>
                <Grid
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
                  {game.address ? game.address : "no name"}
                </Grid>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
