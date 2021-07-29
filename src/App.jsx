import React, { useState } from "react";

import "./App.css";
import Weather_Main from "./components/weather_content";

function App() {
  return (
    <>
      <div className="Page-Content-Container">
        <Weather_Main />
      </div>
    </>
  );
}

export default App;
