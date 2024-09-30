import React, { useState } from "react";
import FlashCard from "./components/FlashCard";
import qaArray from "../flashCards";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(true); // State to manage question/answer visibility

  const getRandomIndex = () => {
    return Math.floor(Math.random() * qaArray.length);
  };

  const goToPreviousCard = () => {
    setCurrentIndex(getRandomIndex());
    setIsHidden(true); // Reset to show the question first
  };

  const goToNextCard = () => {
    setCurrentIndex(getRandomIndex());
    setIsHidden(true); // Reset to show the question first
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white bg-gradient-anim bg-400 animate-gradient">
      <h1 className="text-3xl font-bold mb-4">Flashcard App</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Are you smarter than a fifth grader?!
      </h2>
      <h3 className="text-lg font-semibold mb-4">
        Total Cards: {qaArray.length}
      </h3>
      {/* Display current flashcard */}
      <div className="flashCardList mb-8">
        <FlashCard
          question={qaArray[currentIndex].question}
          answer={qaArray[currentIndex].answer}
          image={qaArray[currentIndex].image}
          isHidden={isHidden}
          setIsHidden={setIsHidden} // Pass function to toggle visibility
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex space-x-4">
        {/* Back Button */}
        <button
          onClick={goToPreviousCard}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full bg-slate-500 hover:bg-slate-400 disabled:bg-slate-600 disabled:cursor-not-allowed`}
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Forward Button */}
        <button
          onClick={goToNextCard}
          disabled={currentIndex === qaArray.length - 1}
          className={`p-3 rounded-full bg-slate-500 hover:bg-slate-400 disabled:bg-slate-600 disabled:cursor-not-allowed`}
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
