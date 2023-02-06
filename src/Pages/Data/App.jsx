import React, { useState, useEffect, useContext } from "react";
import Data from "./Data";
import Login from "./../LogIn/App";
import Header from "../../components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdminContext } from "../../context/Admin";
import { LogStateContext } from "../../context/LogState";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const { logState } = React.useContext(LogStateContext);
  const { admin } = useContext(AdminContext);
  const [nope, setNope] = useState(["", ""]);

  const [regnum, setRegNum] = useState(0);

  useEffect(() => {
    if (logState) {
      console.log("REDIRECTING");

      setNope(["login", "nope"]);
    }
    console.log(regnum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logState]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Header title="Data" />
      <br />

      {logState && admin && regnum === "211013214" ? (
        <Login className="login" setRegNum={setRegNum} nope={nope} />
      ) : (
        <Data />
      )}
    </ThemeProvider>
  );
}
