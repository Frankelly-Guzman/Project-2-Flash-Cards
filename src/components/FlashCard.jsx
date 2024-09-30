import React from "react";
import { motion } from "framer-motion";

const FlashCard = ({ question, answer, image, isHidden, setIsHidden }) => {
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <motion.div
      className="flashCard p-6 bg-slate-800 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 hover:bg-slate-700 min-w-[300px] min-h-[200px] flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 2 }}
      onClick={toggleVisibility}
      style={{ cursor: "pointer" }}
    >
      {isHidden ? (
        <motion.div
          key="question"
          className="questionSection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {question}
        </motion.div>
      ) : (
        <motion.div
          key="answer"
          className="answerSection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {answer}
          <img
            src={image}
            alt="image"
            className="w-20 h-20 mx-auto mt-4 rounded-lg"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default FlashCard;
