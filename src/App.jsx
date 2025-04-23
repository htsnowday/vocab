import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, StarOff } from "lucide-react";

const originalVocabulary = [
  { word: "apogee", definition: "1. The point in orbit farthest from the earth. 2. The highest point; culmination; apex." },
  { word: "exhume", definition: "1. To dig out of the ground or from a grave; to disinter." },
  { word: "geocentric", definition: "1. Measured from the earth’s center. 2. Having the earth as a center." },
  { word: "humus", definition: "Rich, dark organic material formed by decay of vegetable matter, essential to soil's fertility." },
  { word: "inter", definition: "To bury; to place in a grave." },
  { word: "mountebank", definition: "A trickster or swindler; a charlatan." },
  { word: "paramount", definition: "Of chief importance; primary; foremost." },
  { word: "pastoral", definition: "1. Pertaining to a Christian minister. 2. Referring to life in the country. 3. Idealized rural life." },
  { word: "perigee", definition: "The point in orbit closest to the earth." },
  { word: "promontory", definition: "A high ridge of land or rock jutting into a body of water; a headland." },
  { word: "repast", definition: "A meal; food served at a meal." },
  { word: "rustic", definition: "1. Typical of country life and people; simple; rough. 2. A rural person." },
  { word: "rusticate", definition: "1. To go to the country. 2. To cause to become rustic." },
  { word: "terracotta", definition: "1. Ceramic clay used in pottery, statuary, and construction. 2. Reddish brown color of the clay." },
  { word: "terrestrial", definition: "1. Pertaining to the earth and its inhabitants. 2. Referring to land as distinct from water or air." },
  { word: "pusillanimous", definition: "Cowardly; fearful." },
  { word: "ether", definition: "1. Regions of space beyond earth’s atmosphere. 2. A flammable liquid anesthetic." },
  { word: "ethereal", definition: "1. Spiritlike in lightness and delicacy. 2. Heavenly; celestial." },
  { word: "diaphanous", definition: "Allowing light to show through; translucent; delicate." },
  { word: "aspiration", definition: "1. Strong desire for achievement. 2. Expulsion of breath in speaking." },
  { word: "dispirited", definition: "Dejected; discouraged; gloomy." },
  { word: "hyperbole", definition: "An exaggeration; a figure expressing excess." },
  { word: "hyperborean", definition: "1. Far north; Arctic. 2. Very cold; frigid." },
  { word: "hyperventilation", definition: "The condition of taking abnormally fast, deep breaths." },
  { word: "epiphany", definition: "1. A revelatory manifestation of a divine being. 2. A sudden insight or realization." },
  { word: "equanimity", definition: "Composure and calm in stressful conditions; equilibrium." },
  { word: "animus", definition: "A powerful feeling of hostility or antagonism; hatred." },
  { word: "phantasmic", definition: "Ghostly; illusory." },
  { word: "inspirit", definition: "To infuse with spirit or life." },
  { word: "aspire", definition: "To have a strong desire to get or do something; to seek." }
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FlashcardApp() {
  const [starred, setStarred] = useState(new Set());
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [vocabulary, setVocabulary] = useState(shuffleArray(originalVocabulary));
  const [index, setIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const displayedList = onlyStarred ? vocabulary.filter(word => starred.has(word.word)) : vocabulary;
  const current = displayedList[index % displayedList.length] || { word: '', definition: '' };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % displayedList.length);
    setShowDefinition(false);
  };

  const handleShuffle = () => {
    setVocabulary(shuffleArray(originalVocabulary));
    setIndex(0);
    setShowDefinition(false);
  };

  const handleCardClick = (e) => {
    if (!e.target.closest("button") && !e.target.closest("svg")) {
      setShowDefinition((prev) => !prev);
    }
  };

  const toggleStar = () => {
    const updated = new Set(starred);
    updated.has(current.word) ? updated.delete(current.word) : updated.add(current.word);
    setStarred(updated);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-64 sm:h-72 md:h-80 bg-white shadow-2xl rounded-2xl p-6 text-center cursor-pointer flex flex-col justify-center items-center"
        onClick={handleCardClick}
        initial={false}
        animate={{ rotateY: showDefinition ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-4 right-4" onClick={toggleStar}>
          {starred.has(current.word) ? <Star className="text-yellow-400" /> : <StarOff className="text-gray-400" />}
        </div>
        <div className="text-xl" style={{ backfaceVisibility: "hidden", transform: showDefinition ? "rotateY(180deg)" : "none" }}>
          <strong>{showDefinition ? current.definition : current.word}</strong>
        </div>
      </motion.div>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
            onClick={handleShuffle}
          >
            Shuffle
          </button>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={onlyStarred}
              onChange={(e) => setOnlyStarred(e.target.checked)}
            />
            Starred only
          </label>
        </div>
        <span className="text-gray-600">{displayedList.length > 0 ? `${(index % displayedList.length) + 1} of ${displayedList.length}` : "0 of 0"}</span>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
