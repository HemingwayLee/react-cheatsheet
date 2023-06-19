import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { generateQuoteMap } from "./dnd/mockData";
import Board from "./dnd/board/Board";

export default function App() {
  const data = {
    medium: generateQuoteMap(100),
    large: generateQuoteMap(500)
  };

  return (
    <>
      <Board initial={data.medium} withScrollableColumns />
    </>
  );
}
