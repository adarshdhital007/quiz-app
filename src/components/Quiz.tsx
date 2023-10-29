import { useState, useCallback, useEffect } from "react";
import Questions from "./Questions";
import QuestionTimer from "./Timer";
import WelcomeModal from "./WelcomeModal";

const Quiz = () => {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([...Questions]);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const totalQuestions = Questions.length;
  const [isQuizStarted, setIsQuizStarted] = useState(false); // Add state for tracking if the quiz has started

  // Shuffle the questions initially
  useEffect(() => {
    const shuffled = [...Questions];
    shuffled.sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Quiz over or not?
  const isComplete = activeQuestionIndex >= Questions.length;

  useEffect(() => {
    if (!isComplete) {
      // Shuffle answers when a new question is displayed
      const currentQuestion = shuffledQuestions[activeQuestionIndex];
      const answers = [...currentQuestion.answers];
      answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [activeQuestionIndex, shuffledQuestions, isComplete]);

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer: string) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      setTimeout(() => {
        if (
          activeQuestionIndex < shuffledQuestions.length &&
          selectedAnswer === shuffledQuestions[activeQuestionIndex].answers[0]
        ) {
          setScore(score + 1);
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
          setActiveQuestionIndex(activeQuestionIndex + 1);
        }, 400);
      }, 100);
    },
    [activeQuestionIndex, shuffledQuestions, score]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(""),
    [handleSelectAnswer]
  );

  const checkAnswer = (selectedAnswer: string) => {
    const correctAnswer = shuffledQuestions[activeQuestionIndex].answers[0];
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      setAnswerState("correct");
    } else {
      setAnswerState("wrong");
    }

    // Move to the next question after a delay
    setTimeout(() => {
      setAnswerState("");
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }, 400);
  };

  if (!isQuizStarted) {
    return <WelcomeModal onStartQuiz={() => setIsQuizStarted(true)} />;
  }
  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-green-500">
            Quiz is completed!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Thank you for completing the quiz. Your score: {score}/
            {Questions.length}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-lg p-10 mt-10 rounded-lg shadow-2xl bg-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold mb-2 text-indigo-600">
            <span className="text-black">Question No : </span>{" "}
            <span className="text-green-400">{activeQuestionIndex + 1}</span>{" "}
            <span className="text-gray-700">/</span>{" "}
            <span className="text-red-500">{totalQuestions}</span>
          </h1>
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={10000}
            onTimeOut={handleSkipAnswer}
          />
        </div>

        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            {shuffledQuestions[activeQuestionIndex].text}
          </h2>
        </div>

        <ul>
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClasses = "";
            if (answerState === "answered" && isSelected) {
              cssClasses = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClasses = answerState;
            }
            return (
              <li key={answer} className="mb-2 sm:mb-3 md:mb-4 lg:mb-5 ">
                <button
                  className={`demo w-full py-3 px-4 rounded-lg border border-gray-300 bg-blue-100  focus:outline-none ${
                    cssClasses ? cssClasses : ""
                  }`}
                  onClick={() => handleSelectAnswer(answer)}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
