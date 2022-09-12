import React from "react";
import { Routes } from "./Routes";
import { initializeFirebase } from "./config/api/firebase";

initializeFirebase();

function App() {
  return <Routes />;
}

export default App;
