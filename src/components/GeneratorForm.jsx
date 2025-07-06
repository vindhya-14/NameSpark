import React, { useState, useEffect } from "react";
import { fetchTeamNames } from "../api/teamApi";
import {
  SparklesIcon,
  UserGroupIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
  HeartIcon,
  FunnelIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const styles = [
  "Funny",
  "Cool",
  "Classic",
  "Futuristic",
  "Sporty",
  "Quirky",
  "Powerful",
  "Mystical",
  "Techy",
  "Nature",
  "Punny",
  "Professional",
];

const themes = [
  "Sports",
  "Tech",
  "Gaming",
  "Business",
  "Education",
  "Space",
  "Fantasy",
  "Music",
];

const teamEmojis = [
  "🚀",
  "⚡",
  "🔥",
  "🌟",
  "🦄",
  "🎮",
  "🏆",
  "🐉",
  "🤖",
  "🕹️",
  "👑",
  "🎯",
  "🌈",
  "🦁",
  "🐺",
  "🦅",
];

const GeneratorForm = ({ onGenerated }) => {
  const [theme, setTheme] = useState("");
  const [keywords, setKeywords] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showThemeSuggestions, setShowThemeSuggestions] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("teamNameFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem("teamNameFavorites", JSON.stringify(items));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const prompt = `
        Generate 30 creative team names based on these parameters:
        - Theme: ${theme || "general"}
        - Style: ${style}
        - Keywords: ${keywords || "none"}
        - Team Size: ${teamSize || "any"}
        
        Requirements:
        - Names should be unique and memorable
        - Incorporate the style and keywords when possible
        - Avoid offensive or inappropriate content
        - Return only a plain-text list with one name per line
        - Include emoji in some names if appropriate
      `;
      const result = await fetchTeamNames(prompt);
      const names = result
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((name) => name.replace(/^\d+\.\s*/, "").trim());
      onGenerated(names);
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate names. Please try again.");
    }
    setLoading(false);
  };

  const addToFavorites = (name) => {
    if (!favorites.includes(name)) {
      const updated = [...favorites, name];
      saveFavorites(updated);
    }
  };

  const removeFromFavorites = (name) => {
    const updated = favorites.filter((fav) => fav !== name);
    saveFavorites(updated);
  };

  const generateFromFavorites = () => {
    if (favorites.length > 0) {
      const shuffled = [...favorites].sort(() => 0.5 - Math.random());
      onGenerated(shuffled.slice(0, Math.min(12, favorites.length)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            <SparklesIcon className="w-10 h-10 inline-block mr-2" />
            Team Name Genius
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Craft the perfect identity for your team with our AI-powered name
            generator
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Theme */}
                <div className="relative">
                  <label className="block text-sm font-medium text-cyan-100 mb-1">
                    <TagIcon className="w-5 h-5 inline-block mr-1" />
                    Team Theme or Purpose
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Space Exploration, Coding Competition"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      onFocus={() => setShowThemeSuggestions(true)}
                      onBlur={() =>
                        setTimeout(() => setShowThemeSuggestions(false), 200)
                      }
                      className="w-full bg-white/20 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 rounded-xl py-3 px-4 text-white placeholder-purple-200 transition-all duration-200 outline-none"
                      required
                    />
                    <AnimatePresence>
                      {showThemeSuggestions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute z-10 mt-1 w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
                        >
                          {themes.map((suggestion) => (
                            <div
                              key={suggestion}
                              className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-purple-800"
                              onMouseDown={() => {
                                setTheme(suggestion);
                                setShowThemeSuggestions(false);
                              }}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-purple-100 mb-1">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 inline-block mr-1" />
                    Keywords to Include
                    <span className="text-xs text-purple-300 ml-2">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., lightning, unity, dragons"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full bg-white/20 border border-purple-300/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 rounded-xl py-3 px-4 text-white placeholder-purple-200 transition-all duration-200 outline-none"
                  />
                  <p className="mt-1 text-xs text-purple-300">
                    Separate multiple keywords with commas
                  </p>
                </div>

                {/* Style & Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-pink-100 mb-1">
                      <SparklesIcon className="w-5 h-5 inline-block mr-1" />
                      Naming Style
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="w-full bg-white/20 border border-pink-300/30 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 rounded-xl py-3 px-4 text-white transition-all duration-200 outline-none appearance-none"
                    >
                      {styles.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-purple-900 text-white"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-100 mb-1">
                      <UserGroupIcon className="w-5 h-5 inline-block mr-1" />
                      Team Size
                      <span className="text-xs text-green-300 ml-2">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="e.g., 5 members"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-white/20 border border-green-300/30 focus:border-green-400 focus:ring-2 focus:ring-green-500/30 rounded-xl py-3 px-4 text-white placeholder-purple-200 transition-all duration-200 outline-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-5 h-5" />
                        Generate Names
                      </>
                    )}
                  </motion.button>

                  {favorites.length > 0 && (
                    <motion.button
                      type="button"
                      onClick={generateFromFavorites}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <HeartIcon className="w-5 h-5" />
                      Favorites ({favorites.length})
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Tips Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5" />
              Pro Tips
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-cyan-500/20 rounded-full p-1.5">
                  <TagIcon className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Be Specific</h4>
                  <p className="text-sm text-purple-100">
                    Detailed themes yield better results. Instead of "Sports",
                    try "Underwater Hockey".
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-500/20 rounded-full p-1.5">
                  <AdjustmentsHorizontalIcon className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Keyword Combos</h4>
                  <p className="text-sm text-purple-100">
                    Mix contrasting words like "Ninja Koalas" or "Galactic
                    Pirates".
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-pink-500/20 rounded-full p-1.5">
                  <UserGroupIcon className="w-4 h-4 text-pink-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    Team Size Matters
                  </h4>
                  <p className="text-sm text-purple-100">
                    For small teams (2-4), try intimate names. For large groups,
                    go bold and inclusive.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-green-500/20 rounded-full p-1.5">
                  <HeartIcon className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Save Favorites</h4>
                  <p className="text-sm text-purple-100">
                    Click the heart icon to save names you love for future
                    reference.
                  </p>
                </div>
              </li>
            </ul>

            {favorites.length > 0 && (
              <div className="mt-8">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <HeartIcon className="w-5 h-5 text-pink-300" />
                  Your Favorites
                </h4>
                <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                  {favorites.map((fav, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white/10 rounded-lg p-2"
                    >
                      <span className="text-sm text-white truncate">{fav}</span>
                      <button
                        onClick={() => removeFromFavorites(fav)}
                        className="text-pink-300 hover:text-pink-500 text-sm"
                        title="Remove from favorites"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="text-center pt-6">
        <button
          type="button"
          onClick={() => {
            const resultsSection = document.getElementById("results");
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition duration-300"
        >
          <ArrowsPointingOutIcon className="w-5 h-5" />
          Scroll Down to View Generated Names
        </button>
      </div>
    </div>
  );
};

export default GeneratorForm;
