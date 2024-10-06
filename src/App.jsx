import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion for animation
import FlashCard from "./components/FlashCard";
import qaArray from "../flashCards";
import { FaArrowLeft, FaArrowRight, FaRandom } from "react-icons/fa"; // Added shuffle icon

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(true);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [inputStyle, setInputStyle] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0); // Track total correct answers
  const [streak, setStreak] = useState(0); // Track current streak
  const [longestStreak, setLongestStreak] = useState(0); // Track longest streak
  const [masteredCards, setMasteredCards] = useState([]); // Track mastered cards
  const [shuffledCards, setShuffledCards] = useState([...qaArray]); // Copy of the original array for shuffling

  // Sequential navigation logic
  const goToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(shuffledCards.length - 1); // Loop to last card if at the start
    }
    resetCardState();
  };

  const goToNextCard = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop to the first card if at the end
    }
    resetCardState();
  };

  // Reset card state when navigating
  const resetCardState = () => {
    setIsHidden(true);
    setFeedback(null);
    setUserGuess("");
    setInputStyle("");
    setIsCorrect(false);
  };

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...shuffledCards].sort(() => 0.5 - Math.random());
    setShuffledCards(shuffled);
    setCurrentIndex(0); // Reset to the first card after shuffling
    resetCardState();
  };

  // Handle the user guessing an answer
  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  // Check answer correctness and update score/streak
  const checkAnswer = () => {
    const correctAnswer = shuffledCards[currentIndex].answer.toLowerCase();
    const guess = userGuess.toLowerCase().trim();

    if (correctAnswer === guess) {
      setFeedback("Correct! 🎉");
      setInputStyle("correct");
      setIsCorrect(true);
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > longestStreak) {
        setLongestStreak(streak + 1);
      }
    } else if (correctAnswer.includes(guess) && guess !== "") {
      setFeedback("Close enough! 👍");
      setInputStyle("close");
      setIsCorrect(false);
    } else {
      setFeedback("Incorrect, try again! ❌");
      setInputStyle("incorrect");
      setStreak(0); // Reset streak on incorrect answer
      setIsCorrect(false);
    }
  };

  // Mark card as mastered
  const markAsMastered = () => {
    const currentCard = shuffledCards[currentIndex];
    setMasteredCards([...masteredCards, currentCard]);
    setShuffledCards(
      shuffledCards.filter((card, index) => index !== currentIndex)
    );
    if (shuffledCards.length > 1) {
      goToNextCard();
    } else {
      setFeedback("All cards mastered!");
    }
  };

  // Get the input box styling based on feedback
  const getInputClassName = () => {
    let baseStyle = "p-2 rounded border text-black ";
    switch (inputStyle) {
      case "correct":
        return `${baseStyle} bg-green-200 border-green-500`;
      case "close":
        return `${baseStyle} bg-yellow-200 border-yellow-500`;
      case "incorrect":
        return `${baseStyle} bg-red-200 border-red-500`;
      default:
        return `${baseStyle} bg-white border-gray-300`;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white bg-gradient-anim bg-400 animate-gradient">
      <h1 className="text-3xl font-bold mb-4">Flashcard App</h1>
      <h2 className="text-2xl font-semibold mb-4">
        Are you smarter than a fifth grader?!
      </h2>
      <h3 className="text-lg font-semibold mb-4">
        Total Cards: {shuffledCards.length}
      </h3>

      {/* Score and Streak */}
      <div className="mb-4">
        <p className="text-lg">Score: {score}</p>
        <p className="text-lg">Streak: {streak}</p>
        <p className="text-lg">Longest Streak: {longestStreak}</p>
      </div>

      {/* Flashcard */}
      <div className="flashCardList mb-8">
        <FlashCard
          question={shuffledCards[currentIndex].question}
          answer={shuffledCards[currentIndex].answer}
          image={shuffledCards[currentIndex].image}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
        />
      </div>

      {/* User input form */}
      <div className="mb-4">
        <motion.input
          type="text"
          value={userGuess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
          className={`${getInputClassName()}`}
          animate={isCorrect ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <button
          onClick={checkAnswer}
          className="ml-2 p-2 bg-blue-500 hover:bg-blue-400 text-white rounded"
        >
          Submit
        </button>
      </div>

      {/* Feedback */}
      {feedback && <p className="mb-4 text-lg font-semibold">{feedback}</p>}

      {/* Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={goToPreviousCard}
          className="p-3 rounded-full bg-slate-500 hover:bg-slate-400"
        >
          <FaArrowLeft size={24} />
        </button>

        <button
          onClick={goToNextCard}
          className="p-3 rounded-full bg-slate-500 hover:bg-slate-400"
        >
          <FaArrowRight size={24} />
        </button>

        <button
          onClick={shuffleCards}
          className="p-3 rounded-full bg-slate-500 hover:bg-slate-400"
        >
          <FaRandom size={24} />
        </button>
      </div>

      {/* Mark as Mastered */}
      <button
        onClick={markAsMastered}
        className="p-2 bg-green-500 hover:bg-green-400 text-white rounded"
      >
        Mark as Mastered
      </button>
    </div>
  );
};

export default App;
