import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import Accordion from "./Accordion";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [events, setEvents] = React.useState([]);
  useEffect(() => {
    // get data from localhose:5000/events
    fetch("https://abdotolba.pythonanywhere.com/events")
      .then((res) => res.json())
      .then((data) => {
        // set events to data
        setEvents(data);
      });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Header title="Events" />
      <br />
      <Paper
        sx={{
          height: "85vh",
        }}
      >
        <Accordion events={events} />
      </Paper>
    </ThemeProvider>
  );
}
