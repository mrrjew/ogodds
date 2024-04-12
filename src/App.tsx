import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "@radix-ui/themes/styles.css";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
