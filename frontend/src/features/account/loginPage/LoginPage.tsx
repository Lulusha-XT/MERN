import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import Input from "@mui/joy/Input";
import { Link, useNavigate } from "react-router-dom";
import "../loginPage/LoginPage.css";
import { useAppDispatch } from "../../../store/store";
import { logInUser } from "../accountSlice";
const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logInUser(user));
    navigate("/");
  };
  return (
    <div className="login-body">
      <Container
        sx={{
          py: 10,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          className="login-container"
          container
          spacing={3}
          sx={{ margin: "0 auto", backgroundColor: "white", pr: 8, pl: 5 }}
        >
          <Typography
            className="title"
            sx={{ m: "80px auto 0 auto", fontWeight: 600 }}
            variant="h3"
          >
            LogIn
          </Typography>
          <Grid item xs={12}>
            <Input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
              type="email"
              className="login-input"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              type="password"
              className="login-input"
            />
          </Grid>

          <Grid item xs={12}>
            <Button onClick={handleSubmit} fullWidth className="green-btn">
              LogIn
            </Button>

            <Grid item sx={{ my: 3 }}>
              <Link to="/signup">Create Account</Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
