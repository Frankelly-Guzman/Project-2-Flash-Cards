import React, { useState, useEffect, useRef } from "react";
import flashcardsData from "./flashcardsData";

function App() {
  const [cards, setCards] = useState(flashcardsData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const isFirstRender = useRef(true);

  const currentCard = cards[currentCardIndex];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setShowQuestion(false); // Initially don't show any question
    } else {
      setShowQuestion(true); // Show question on subsequent renders
    }
  }, [currentCardIndex]);

  const handleNextCard = () => {
    let newIndex = currentCardIndex + 1;
    if (newIndex >= cards.length) {
      newIndex = 0; // Wrap back to the first card
    }
    setCurrentCardIndex(newIndex);
  };

  const handleFlipCard = () => {
    setShowQuestion(!showQuestion);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Bio":
        return "bg-blue-200";
      case "Anime":
        return "bg-green-200";
      case "Manga":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <h1 className="text-3xl font-bold mb-4 text-white">StudySwipe</h1>
      <h2 className="text-2xl font-semibold mb-2 text-white">{`Card Set: Akira Toriyama`}</h2>
      <p className="text-lg mb-2 text-white">{`How good do you know about the great Akira Toriyama?`}</p>
      <p className="text-lg mb-4 text-white">{`Total Cards: ${cards.length}`}</p>

      {isFirstRender.current && (
        <div className={`p-6 rounded-lg shadow-lg bg-white`}>
          <div className="text-xl font-semibold">Start</div>
          <div className="mt-4">Click "Next Card" to begin.</div>
          <div className="mt-4 flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextCard}
            >
              Next Card
            </button>
          </div>
        </div>
      )}

      {!isFirstRender.current && (
        <div
          className={`p-6 rounded-lg shadow-lg ${getCategoryColor(
            currentCard.category
          )}`}
        >
          {showQuestion ? (
            <div className="text-xl font-semibold">{currentCard.question}</div>
          ) : (
            <div className="text-xl font-semibold">{currentCard.answer}</div>
          )}
          <div className="mt-4 flex justify-center">
            <button
              className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFlipCard}
            >
              Flip
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextCard}
            >
              Next Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
