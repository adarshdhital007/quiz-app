import React, { FunctionComponent } from "react";

interface WelcomeModalProps {
  onStartQuiz: () => void;
}

const WelcomeModal: FunctionComponent<WelcomeModalProps> = ({
  onStartQuiz,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1>Welcome to the 10-Second Brain Blast!</h1>
        <p>
          Get ready for a fast-paced challenge! In the "10-Second Brain Blast,"
          you'll face quick questions on various topics like Angular, React,
          TypeScript, and JavaScript. It's all about thinking on your feet.
          Click "Start Quiz" to begin!
        </p>
        <button onClick={onStartQuiz}>Start Quiz</button>
      </div>
    </div>
  );
};

export default WelcomeModal;
