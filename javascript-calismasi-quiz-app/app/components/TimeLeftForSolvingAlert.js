import React from "react";

export default function TimeLeftForSolvingAlert({ timeLeft }) {
  return (
    <p className="h3 alert alert-danger my-4">
      Bu soruyu çözmek için <b className="text-danger h1">{timeLeft}</b>{" "}
      saniyeniz kaldı.
    </p>
  );
}
