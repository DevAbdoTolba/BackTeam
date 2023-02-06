import React, { useEffect, useState } from "react";
import TTable from "./TTable.jsx";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://abdotolba.pythonanywhere.com/users")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
        console.table(json);
      });
  }, []);
  return (
    <>
      <TTable data={[...data]} loading={loading} />
    </>
  );
}

export default App;
