import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Login from "./../LogIn/App";
import Header from "../../components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LogStateContext } from "../../context/LogState";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const { logState } = React.useContext(LogStateContext);
  const [regnum, setRegNum] = useState(0);
  // check for regnum in cookies
  useEffect(() => {
    if (!logState) return;
    const regnum = document.cookie
      .split("; ")
      .find((row) => row.startsWith("regnum="))
      .split("=")[1];
    if (regnum) {
      setRegNum(regnum);
      console.log("Cookies\t" + regnum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Header title="Dashboard" />
      <br />

      {!logState ? (
        <Login setRegNum={setRegNum} nope={[" ", " "]} />
      ) : (
        <Dashboard regnum={regnum} />
      )}
    </ThemeProvider>
  );
}
