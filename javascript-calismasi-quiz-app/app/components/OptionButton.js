import React from "react";
import { Button } from "react-bootstrap";
const optionNames = ["A", "B", "C", "D"];
export default function OptionButton({ onClick, option, selectedOption,index }) {
  return (
    <Button
      className={
        selectedOption === option ? "btn btn-primary" : "btn btn-secondary"
      }
      onClick={onClick}
    >
      <span className="h5">{optionNames[index] + ") "}</span> {option}
    </Button>
  );
}
