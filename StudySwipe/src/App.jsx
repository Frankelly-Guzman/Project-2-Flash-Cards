import React, { useState, useEffect, useRef } from "react";
import flashcardsData from "./flashcardsData";

function App() {
  const [cards, setCards] = useState(flashcardsData);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);
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
    setFeedback(""); // Clear feedback for the next card
    setUserGuess(""); // Clear user guess for the next card
  };

  const handleFlipCard = () => {
    setShowQuestion(!showQuestion);
  };

  const handleBackCard = () => {
    let newIndex = currentCardIndex - 1;
    if (newIndex < 0) {
      newIndex = cards.length - 1; // Wrap back to the last card
    }
    setCurrentCardIndex(newIndex);
    setFeedback(""); // Clear feedback for the previous card
    setUserGuess(""); // Clear user guess for the previous card
  };

  const handleSubmit = () => {
    const targetAnswer = currentCard.answer.toLowerCase().trim();
    const userAnswer = userGuess.toLowerCase().trim();

    if (userAnswer === targetAnswer) {
      setFeedback("Correct!");
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
    } else {
      setFeedback("Incorrect. Try again!");
      setCurrentStreak(0);
    }
  };

  const handleShuffle = () => {
    const shuffledCards = [...cards];
    shuffledCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleMarkMastered = () => {
    const updatedMasteredCards = [...masteredCards, currentCard];
    setMasteredCards(updatedMasteredCards);
    setCards(cards.filter((card) => card !== currentCard));
    handleNextCard(); // Move to the next card after marking as mastered
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
      <p className="text-lg mb-2 text-white">{`How well do you know about the great Akira Toriyama?`}</p>
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
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={handleBackCard}
            >
              Back
            </button>
          </div>

          {showQuestion && (
            <div className="mt-4 flex justify-center">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter your guess"
                className="border rounded mr-2 px-2"
              />
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}

          {feedback && <div className="mt-2 text-white">{feedback}</div>}
        </div>
      )}

      <div className="mt-6">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleShuffle}
        >
          Shuffle Cards
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleMarkMastered}
        >
          Mark as Mastered
        </button>
      </div>

      <div className="mt-4 text-white">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>
    </div>
  );
}

export default App;
