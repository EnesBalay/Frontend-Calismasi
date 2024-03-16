import React from "react";

export default function TimeLeftForSelectAlert({ timeLeft }) {
  return (
    <p className="h3 alert alert-warning">
      Seçim yapmak için <b className="text-danger">{timeLeft - 20}</b> saniye
      bekle.
    </p>
  );
}
