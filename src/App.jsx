import { useState, useEffect } from "react";
import GeneratorForm from "./components/GeneratorForm";
import NameList from "./components/NameList";

const styles = ["Funny", "Cool", "Techie", "Classic", "One Word"];

const App = () => {
  const [generatedNames, setGeneratedNames] = useState([]);
  const [formData, setFormData] = useState({
    theme: "",
    keywords: "",
    teamSize: "",
    style: styles[0],
  });
  const [showResults, setShowResults] = useState(false);

  const handleGenerated = (names) => {
    setGeneratedNames(names);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRegenerate = () => {
    const event = new CustomEvent("regenerateNames");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const handleAddFavorite = (e) => {
      const name = e.detail;
      const favorites = JSON.parse(localStorage.getItem("teamNameFavorites") || "[]");
      if (!favorites.includes(name)) {
        const updated = [...favorites, name];
        localStorage.setItem("teamNameFavorites", JSON.stringify(updated));
      }
    };

    const handleRegenerateEvent = () => {
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }
    };

    window.addEventListener("addToFavorites", handleAddFavorite);
    window.addEventListener("regenerateNames", handleRegenerateEvent);

    return () => {
      window.removeEventListener("addToFavorites", handleAddFavorite);
      window.removeEventListener("regenerateNames", handleRegenerateEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <GeneratorForm onGenerated={handleGenerated} onFormDataChange={setFormData} />
      {showResults && generatedNames.length > 0 && (
  <div id="results">
    <NameList 
      names={generatedNames} 
      theme={formData.theme}
      style={formData.style}
      keywords={formData.keywords}
      teamSize={formData.teamSize}
      onRegenerate={handleRegenerate}
    />
  </div>
)}
    </div>
  );
};

export default App;
