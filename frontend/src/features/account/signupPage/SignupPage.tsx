import { Button, Container, Grid, Input, Typography } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import { IUser } from "../../../interfaces/User";
import { useAppDispatch } from "../../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../accountSlice";
import "../signupPage/signUpPage.css";

const SignupPage = () => {
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signUpUser(user));
    navigate("/login");
  };

  return (
    <div className="signup-body">
      <Container
        sx={{
          py: 10,
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          className="signup-container"
          container
          spacing={3}
          sx={{ margin: "0 auto", backgroundColor: "white", pr: 8, pl: 5 }}
        >
          <Typography
            className="title"
            sx={{ m: "80px auto 0 auto", fontWeight: 600 }}
            variant="h3"
          >
            SignUp
          </Typography>
          <Grid item xs={12}>
            <Input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="userName"
              className="signup-input"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
              type="email"
              className="signup-input"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
              type="password"
              className="signup-input"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} fullWidth className="green-btn">
              SignUp
            </Button>

            <Grid item sx={{ my: 3 }}>
              <Link to="/login">Already Have an Account</Link>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SignupPage;
