import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <header className="bg-blue-500 py-4 text-white text-center">
      <h1 className="text-3xl text-center font-bold">10-Second Brain Blast</h1>
      <p className="text-lg">Answer Every Question in Just 10 Seconds!</p>
      <button
        className="text-center text-white-500 px-3 py-1 rounded"
        onClick={openModal}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </button>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              <span className="buttonheader">X</span>
            </button>
            <div className="modal-content">
              <h1 className="text-xl font-bold mt-4">
                Welcome to the 10-Second Brain Blast Challenge!
              </h1>
              <p>
                Get ready for a fast-paced challenge! In the "10-Second Brain
                Blast," you'll have just 10 seconds to answer each question on
                various topics like Angular, React, TypeScript, and JavaScript.
                It's all about thinking on your feet.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
