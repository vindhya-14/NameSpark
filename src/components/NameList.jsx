import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import {
  FunnelIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const teamEmojis = [
  "🚀", "🧠", "🔥", "🌟", "🎯", "⚡", "💡", "🎮", "🏆", "💻"
];

const NameList = ({ names, theme, style, keywords, teamSize, onRegenerate }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [filter, setFilter] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
  const handleAddFavorite = (e) => {
    const name = e.detail;
    const favorites = JSON.parse(localStorage.getItem("teamNameFavorites") || "[]");
    if (!favorites.includes(name)) {
      const updated = [...favorites, name];
      localStorage.setItem("teamNameFavorites", JSON.stringify(updated));
    }
  };

  window.addEventListener("addToFavorites", handleAddFavorite);

  return () => {
    window.removeEventListener("addToFavorites", handleAddFavorite);
  };
}, []);
  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
              Generated Team Names
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {theme && (
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                  Theme: {theme}
                </span>
              )}
              {style && (
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  Style: {style}
                </span>
              )}
              {keywords && (
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm">
                  Keywords: {keywords}
                </span>
              )}
              {teamSize && (
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                  Team Size: {teamSize}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FunnelIcon className="h-5 w-5 text-purple-300" />
              </div>
              <input
                type="text"
                placeholder="Filter names..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-white/20 border border-purple-300/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 rounded-xl py-2 pl-10 pr-4 text-white placeholder-purple-200 transition-all duration-200 outline-none w-full"
              />
            </div>
            <button
              onClick={onRegenerate}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2 px-4 rounded-xl shadow transition-all duration-200 flex items-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          </div>
        </div>

        {filteredNames.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-purple-200">
              No names match your filter. Try a different search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNames.map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 border ${
                  expandedIndex === index
                    ? "border-cyan-400/50"
                    : "border-white/10"
                } transition-all duration-200`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-1">
                      {teamEmojis[index % teamEmojis.length]}
                    </span>
                    <div>
                      <h3
                        className={`font-semibold ${
                          expandedIndex === index ? "text-cyan-300" : "text-white"
                        } cursor-pointer`}
                        onClick={() =>
                          setExpandedIndex(expandedIndex === index ? null : index)
                        }
                      >
                        {name.length > 30 && expandedIndex !== index
                          ? `${name.substring(0, 30)}...`
                          : name}
                      </h3>
                      {expandedIndex === index && (
                        <p className="text-sm text-purple-200 mt-1">
                          Great for {style?.toLowerCase()}{" "}
                          {theme ? theme.toLowerCase() : "teams"}!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => copyToClipboard(name, index)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/30 transition-colors duration-200"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400" />
                      ) : (
                        <ClipboardDocumentIcon className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        const event = new CustomEvent("addToFavorites", {
                          detail: name,
                        });
                        window.dispatchEvent(event);
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-pink-500/30 transition-colors duration-200"
                      title="Add to favorites"
                    >
                      <HeartIcon className="w-5 h-5 text-pink-400" />
                    </button>
                  </div>
                </div>

                {expandedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-purple-300">
                        {name.length} characters
                      </span>
                      <button
                        onClick={() => {
                          const event = new CustomEvent("analyzeName", {
                            detail: name,
                          });
                          window.dispatchEvent(event);
                        }}
                        className="text-xs bg-blue-600/50 hover:bg-blue-600 px-2 py-1 rounded"
                      >
                        Analyze Name
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NameList;
