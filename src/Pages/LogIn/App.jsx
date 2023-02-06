import React, { useContext } from "react";
import Form from "./Form";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { LogStateContext } from "../../context/LogState";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ setRegNum, nope }) {
  const { logState } = useContext(LogStateContext);

  return (
    <>
      <head className="Login_head">
        <title>BackTeam</title>
      </head>
      <body className="Login_body">
        <ThemeProvider theme={darkTheme}>
          {logState ? (
            <>
              {/* center the CircularProgress */}
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh",
                    width: "100vw",
                  }}
                >
                  <CircularProgress />
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Form setRegNum={setRegNum} nope={nope[0]} />
              <h1 className={nope[1]}>NOPE</h1>
            </>
          )}
        </ThemeProvider>
      </body>
    </>
  );
}
