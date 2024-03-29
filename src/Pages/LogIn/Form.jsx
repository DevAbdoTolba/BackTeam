import React, { useState } from "react";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { AdminContext } from "../../context/Admin";
import { LogStateContext } from "../../context/LogState";

export default function App({ setRegNum, nope }) {
  const { setLogState } = React.useContext(LogStateContext);
  const { setAdmin } = React.useContext(AdminContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line no-unused-vars
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [backError, setBackError] = useState("");
  const [spam_counter, setSpamCounter] = useState(2);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // add class body to body and class head to head and class html to html

  return (
    // align items center and justify content center

    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
      onSubmit={handleSubmit((data) => {
        setTimeout(() => setLoading(!loading), 2000);
        setRegNum(data.regnum);
        setTimeout(() => {
          fetch(
            "https://abdotolba.pythonanywhere.com/exist?regnum=" +
              data.regnum +
              "&password=" +
              data.password
          )
            .then((res) => {
              setTimeout(() => {
                setLoading(false);
              }, 1000);
              if (res.ok) {
                return res.text();
              } else {
                console.log("not ok");
                throw new Error("Something went wrong");
              }
            })
            .then((txtRes) => {
              if (txtRes === "True") {
                if (document.cookie.split("=")[1] !== data.regnum) {
                  console.log("new cookie");
                  document.cookie = "regnum=" + data.regnum;
                }
                setTimeout(() => {
                  if (data.regnum === "211013214") setAdmin(true);
                  setLogState(true);
                }, 1000);
              } else if (txtRes === "False") {
                console.error("WrongRegNum");
                setBackError("WrongRegNum");
              } else {
                console.error("WrongPassword");
                setBackError("WrongPassword");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 2000);
      })}
    >
      <Paper className={nope} elevation={3} sx={{ p: "2rem" }}>
        <Typography
          id="secret_slide"
          variant="h4"
          component="h2"
          onClick={() => {
            if (spam_counter % 11 === 0) {
              setTimeout(() => {
                document.getElementById("secret_slide").style.animation =
                  "slide 5s";
              }, 5000);
              document.getElementById("secret_slide").style.animation = "none";
            }
            setSpamCounter(spam_counter + 1);
          }}
        >
          Slide in
        </Typography>
        <TextField
          sx={{ marginTop: "1.5rem" }}
          {...register("regnum", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Min length is 8 digits.",
            },
            maxLength: {
              value: 10,
              message: "Max length is 10 digits.",
            },
          })}
          label="RegNum"
          type="number"
          min="0"
          max="9999999999"
          fullWidth
          helperText={
            errors.password?.message || backError === "WrongRegNum"
              ? "Wrong RegNum"
              : ""
          }
          error={errors.regnum ? true : false || backError === "WrongRegNum"}
        />

        <br />

        <FormControl variant="outlined" margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            {...register("password", { required: "This field is required" })}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            error={
              errors.password
                ? true
                : false || backError === "WrongPassword"
                ? true
                : false
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          <Typography variant="caption" sx={{ color: "red" }}>
            &nbsp;
            {errors.password?.message || backError === "WrongPassword"
              ? "WrongPassword"
              : ""}
          </Typography>
        </FormControl>
        {/* button centerd to slide */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingButton type="submit" loading={loading} variant="contained">
            Log In
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
}
