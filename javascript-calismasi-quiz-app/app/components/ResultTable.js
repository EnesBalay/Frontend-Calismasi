import React from "react";
import { Table } from "react-bootstrap";

export default function ResultTable({ answers }) {
  return (
    <div className="text-center">
      <h1 className="my-4">Quiz Sonuçları</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((question, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{question.question}</td>
              {question.answer ? (
                <td className="bg-primary text-white">
                  <b>{question.answer}</b>{" "}
                </td>
              ) : (
                <td className="bg-danger text-white">
                  <b>CEVAPLANMADI!</b>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
