import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import {  useState } from "react";

export const Login = ({onLogin}) => {
  const [loginError, setLoginError] = useState({ email: "", password: "" });
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  return (
    <Paper elevation={3}>
      <Stack width={"500px"} height={"400px"} gap={"24px"} padding={"20px"}>
        <Stack spacing={"8px"}>
          <Typography variant="h1">Login</Typography>
          <Typography variant="b1">
            The Rick and Morty API is a REST.
          </Typography>
        </Stack>

        <Stack gap={"8px"}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onBlur={(event) => {
              if (
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                  event.target.value
                )
              ) {
                setLoginError((prev) => {
                  return { ...prev, email: "" };
                });
              } else {
                setLoginError((prev) => {
                  return { ...prev, email: "please enter a valid email" };
                });
              }
            }}
            onChange={(event) => {
              setUserInput((prev) => {
                return { ...prev, email: event.target.value };
              });
            }}
            error={loginError.email ? true : false}
            helperText={loginError.email}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(event) => {
                setUserInput((prev) => {
                  return { ...prev, password: event.target.value };
                });
              }}
            error={loginError.password ? true : false}
            helperText={loginError.password}
          />
        </Stack>

        <Button
          variant="contained"
          size="large"
          onClick={() => {
            if (userInput.email && userInput.password) {
              console.log("success");
              onLogin()
            } else {
              setLoginError({
                email: userInput.email ? "" : "please enter a valid email",
                password: userInput.password
                  ? ""
                  : "please enter a valid password",
              });
            }
          }}
          fullWidth
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
};
