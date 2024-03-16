"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getQuestions } from "./services/Question";
import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import ResultTable from "./components/ResultTable";
import TimeLeftForSolvingAlert from "./components/TimeLeftForSolvingAlert";
import TimeLeftForSelectAlert from "./components/TimeLeftForSelectAlert";
import OptionButton from "./components/OptionButton";


function Page() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (questions.length === 0) {
      const config = getQuestions();
      axios
        .request(config)
        .then((response) => {
          const data = response.data.slice(0, 10);
          setQuestions(data);
          setCurrentQuestion(0);
        })
        .catch((error) => {
          setErrorMessage(error.response);
        });
    }
  }, [questions]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    if (timeLeft <= 20) {
      setSelectedOption(selectedOption === option ? "" : option);
    }
  };

  const handleNextQuestion = () => {
    if (questions.length > currentQuestion) {
      setAnswers([
        ...answers,
        { question: questions[currentQuestion].title, answer: selectedOption },
      ]);
      setTimeLeft(30);
      setSelectedOption("");
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Container className="mt-5">
      {currentQuestion < questions.length ? (
        <>
          <h1>Soru {currentQuestion + 1}</h1>
          {timeLeft > 20 && <TimeLeftForSelectAlert timeLeft={timeLeft} />}
          <h2>{questions[currentQuestion].title}</h2>
          <Row>
            {questions[currentQuestion].body
              .split("\n")
              .map((option, index) => (
                <Col key={index} xs={12} sm={12} className="mb-2">
                  <OptionButton
                    onClick={() => handleOptionClick(option)}
                    option={option}
                    selectedOption={selectedOption}
                    index={index}
                  />
                </Col>
              ))}
          </Row>
          {timeLeft < 20 && (
            <>
              <Button
                className="mt-3"
                disabled={!selectedOption}
                onClick={handleNextQuestion}
              >
                İleri
              </Button>
              <TimeLeftForSolvingAlert timeLeft={timeLeft} />
            </>
          )}
        </>
      ) : (
        <ResultTable answers={answers} />
      )}
    </Container>
  );
}

export default Page;
